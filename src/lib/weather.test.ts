import { describe, expect, it, vi } from 'vitest'
import { makeApiForecast } from '../test/fixtures'
import {
  dateKey,
  DEFAULT_LOCATION,
  getForecast,
  hoursForDay,
  isLocation,
  localTime,
  parseForecast,
  searchLocations,
  temperature,
  weatherDescription,
} from './weather'

describe('forecast contract', () => {
  it('keeps rain volume separate from precipitation probability and uses the city timezone', () => {
    const forecast = parseForecast(makeApiForecast())
    expect(forecast.hours).toHaveLength(168)
    expect(forecast.days).toHaveLength(7)
    expect(forecast.days[0]).toMatchObject({
      date: '2026-10-22',
      rain: 3,
      probability: 65,
    })
    expect(forecast.hours[15]).toMatchObject({ rain: 2, probability: 65 })
    expect(localTime(forecast.hours[0].time, forecast.timezone)).toBe('00:00')
  })

  it('preserves zero while retaining missing values instead of inventing dry weather', () => {
    const raw = makeApiForecast()
    ;(raw.hourly.rain as (number | null)[])[0] = null
    ;(raw.current as { temperature_2m: number | null }).temperature_2m = null
    const forecast = parseForecast(raw)
    expect(forecast.hours[0].rain).toBeNull()
    expect(forecast.hours[1].rain).toBe(0)
    expect(forecast.current.temperature).toBeNull()
    expect(temperature(null, 'celsius')).toBe('—')
  })

  it('rejects incomplete series and invalid timezones', () => {
    const raw = makeApiForecast()
    raw.hourly.rain.pop()
    expect(() => parseForecast(raw)).toThrow('incompleta')
    expect(() =>
      parseForecast({ ...makeApiForecast(), timezone: 'Invalid/Zone' }),
    ).toThrow('fuso horário')
  })

  it('groups a 23-hour daylight-saving day using the location timezone', () => {
    const start = Date.parse('2026-03-08T05:00:00Z') / 1000
    const forecast = parseForecast(makeApiForecast())
    forecast.timezone = 'America/New_York'
    forecast.hours = Array.from({ length: 48 }, (_, index) => ({
      time: start + index * 3600,
      temperature: 20,
      rain: 0,
      probability: 0,
      code: 0,
    }))
    expect(hoursForDay(forecast, '2026-03-08')).toHaveLength(23)
    expect(
      dateKey(Date.parse('2026-10-22T01:00:00Z') / 1000, 'America/Sao_Paulo'),
    ).toBe('2026-10-21')
  })

  it('converts units without changing the stored Celsius values', () => {
    expect(temperature(0, 'fahrenheit', true)).toBe('32°F')
    expect(temperature(-10, 'celsius', true)).toBe('-10°C')
    expect(weatherDescription(99).kind).toBe('storm')
    expect(weatherDescription(999).label).toBe('Condição indisponível')
  })

  it('rejects corrupted or out-of-range persisted locations', () => {
    expect(isLocation({ ...DEFAULT_LOCATION, latitude: 120 })).toBe(false)
    expect(isLocation({ ...DEFAULT_LOCATION, longitude: NaN })).toBe(false)
    expect(isLocation(DEFAULT_LOCATION)).toBe(true)
  })
})

describe('weather requests', () => {
  it('handles an omitted results property as an empty search', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ generationtime_ms: 1 }),
      }),
    )
    expect(await searchLocations('notfound')).toEqual([])
  })

  it('distinguishes rate limiting from an empty forecast', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: false, status: 429 }),
    )
    await expect(getForecast(DEFAULT_LOCATION)).rejects.toThrow(
      'muitas consultas',
    )
  })

  it('requests explicit units and Unix timestamps without an API key', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue({ ok: true, json: async () => makeApiForecast() })
    vi.stubGlobal('fetch', fetchMock)
    await getForecast(DEFAULT_LOCATION)
    const url = new URL(fetchMock.mock.calls[0][0])
    expect(url.searchParams.get('timeformat')).toBe('unixtime')
    expect(url.searchParams.get('temperature_unit')).toBe('celsius')
    expect(url.searchParams.get('forecast_days')).toBe('7')
    expect(url.searchParams.has('apikey')).toBe(false)
  })
})
