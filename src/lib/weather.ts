export interface Location {
  id: number | string
  name: string
  latitude: number
  longitude: number
  country: string
  countryCode?: string
  region?: string
}

export type Unit = 'celsius' | 'fahrenheit'
export type WeatherKind =
  | 'clear'
  | 'partly-cloudy'
  | 'cloudy'
  | 'fog'
  | 'drizzle'
  | 'rain'
  | 'snow'
  | 'storm'
  | 'unknown'

export interface HourForecast {
  time: number
  temperature: number | null
  rain: number | null
  probability: number | null
  code: number | null
}

export interface DayForecast {
  date: string
  time: number
  min: number | null
  max: number | null
  rain: number | null
  probability: number | null
  code: number | null
  sunrise: number | null
  sunset: number | null
  uv: number | null
}

export interface Forecast {
  timezone: string
  fetchedAt: number
  current: {
    time: number
    temperature: number | null
    apparent: number | null
    humidity: number | null
    wind: number | null
    code: number | null
    isDay: boolean
  }
  hours: HourForecast[]
  days: DayForecast[]
}

export const DEFAULT_LOCATION: Location = {
  id: 3448439,
  name: 'São Paulo',
  latitude: -23.5505,
  longitude: -46.6333,
  country: 'Brasil',
  countryCode: 'BR',
  region: 'São Paulo',
}

export function locationKey(location: Location) {
  return `${location.latitude.toFixed(4)},${location.longitude.toFixed(4)}`
}

export function isLocation(value: unknown): value is Location {
  if (!value || typeof value !== 'object') return false
  const item = value as Record<string, unknown>
  return (
    (typeof item.id === 'string' || typeof item.id === 'number') &&
    typeof item.name === 'string' &&
    !!item.name.trim() &&
    typeof item.country === 'string' &&
    typeof item.latitude === 'number' &&
    Number.isFinite(item.latitude) &&
    Math.abs(item.latitude) <= 90 &&
    typeof item.longitude === 'number' &&
    Number.isFinite(item.longitude) &&
    Math.abs(item.longitude) <= 180
  )
}

export function dateKey(timestamp: number, timezone: string) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date(timestamp * 1000))
  const part = (name: string) => parts.find((item) => item.type === name)!.value
  return `${part('year')}-${part('month')}-${part('day')}`
}

export function localTime(timestamp: number, timezone: string) {
  return new Intl.DateTimeFormat('pt-BR', {
    timeZone: timezone,
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).format(new Date(timestamp * 1000))
}

export function dayLabel(day: DayForecast, timezone: string, index?: number) {
  if (index === 0) return 'Hoje'
  if (index === 1) return 'Amanhã'
  const label = new Intl.DateTimeFormat('pt-BR', {
    timeZone: timezone,
    weekday: 'short',
  })
    .format(new Date(day.time * 1000))
    .replace('.', '')
  return label.charAt(0).toUpperCase() + label.slice(1)
}

export function temperature(
  value: number | null,
  unit: Unit,
  includeUnit = false,
) {
  if (value === null || !Number.isFinite(value)) return '—'
  const converted = unit === 'fahrenheit' ? (value * 9) / 5 + 32 : value
  return `${Math.round(converted)}°${includeUnit ? (unit === 'fahrenheit' ? 'F' : 'C') : ''}`
}

export function decimal(value: number | null, suffix = '') {
  if (value === null || !Number.isFinite(value)) return '—'
  return `${new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 1 }).format(value)}${suffix}`
}

export function weatherDescription(code: number | null): {
  label: string
  kind: WeatherKind
} {
  if (code === 0) return { label: 'Céu limpo', kind: 'clear' }
  if (code === 1)
    return { label: 'Predominantemente limpo', kind: 'partly-cloudy' }
  if (code === 2)
    return { label: 'Parcialmente nublado', kind: 'partly-cloudy' }
  if (code === 3) return { label: 'Nublado', kind: 'cloudy' }
  if (code === 45 || code === 48) return { label: 'Nevoeiro', kind: 'fog' }
  if ([51, 53, 55, 56, 57].includes(code ?? -1))
    return { label: 'Garoa', kind: 'drizzle' }
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code ?? -1))
    return { label: 'Chuva', kind: 'rain' }
  if ([71, 73, 75, 77, 85, 86].includes(code ?? -1))
    return { label: 'Neve', kind: 'snow' }
  if ([95, 96, 99].includes(code ?? -1))
    return { label: 'Trovoadas', kind: 'storm' }
  return { label: 'Condição indisponível', kind: 'unknown' }
}

export function hoursForDay(forecast: Forecast, date: string) {
  return forecast.hours.filter(
    (hour) => dateKey(hour.time, forecast.timezone) === date,
  )
}

type JsonObject = Record<string, unknown>
function object(value: unknown): JsonObject {
  if (!value || typeof value !== 'object' || Array.isArray(value))
    throw new Error('O serviço retornou dados em um formato inesperado.')
  return value as JsonObject
}
function finite(value: unknown): number | null {
  return typeof value === 'number' && Number.isFinite(value) ? value : null
}
function sum(first: unknown, second: unknown): number | null {
  const a = finite(first),
    b = finite(second)
  return a === null || b === null ? null : a + b
}
function series(group: JsonObject, name: string, length: number) {
  const values = group[name]
  if (!Array.isArray(values) || values.length !== length)
    throw new Error(
      'A previsão recebida está incompleta. Tente atualizar os dados.',
    )
  return values
}

export function parseForecast(raw: unknown): Forecast {
  const data = object(raw)
  if (typeof data.timezone !== 'string')
    throw new Error('O serviço não informou o fuso horário da localidade.')
  const timezone = data.timezone
  try {
    new Intl.DateTimeFormat('pt-BR', { timeZone: timezone })
  } catch {
    throw new Error('O fuso horário recebido não é válido.')
  }
  const current = object(data.current),
    hourly = object(data.hourly),
    daily = object(data.daily)
  if (
    !Array.isArray(hourly.time) ||
    !hourly.time.length ||
    !hourly.time.every((time) => finite(time) !== null) ||
    !Array.isArray(daily.time) ||
    !daily.time.length ||
    !daily.time.every((time) => finite(time) !== null) ||
    finite(current.time) === null
  ) {
    throw new Error('A previsão recebida não contém horários válidos.')
  }
  const h = Object.fromEntries(
    [
      'temperature_2m',
      'precipitation_probability',
      'rain',
      'showers',
      'weather_code',
    ].map((name) => [
      name,
      series(hourly, name, (hourly.time as unknown[]).length),
    ]),
  )
  const d = Object.fromEntries(
    [
      'temperature_2m_min',
      'temperature_2m_max',
      'rain_sum',
      'showers_sum',
      'precipitation_probability_max',
      'weather_code',
      'sunrise',
      'sunset',
      'uv_index_max',
    ].map((name) => [
      name,
      series(daily, name, (daily.time as unknown[]).length),
    ]),
  )
  return {
    timezone,
    fetchedAt: Date.now(),
    current: {
      time: current.time as number,
      temperature: finite(current.temperature_2m),
      apparent: finite(current.apparent_temperature),
      humidity: finite(current.relative_humidity_2m),
      wind: finite(current.wind_speed_10m),
      code: finite(current.weather_code),
      isDay: current.is_day === 1,
    },
    hours: (hourly.time as number[]).map((time, i) => ({
      time,
      temperature: finite(h.temperature_2m[i]),
      probability: finite(h.precipitation_probability[i]),
      rain: sum(h.rain[i], h.showers[i]),
      code: finite(h.weather_code[i]),
    })),
    days: (daily.time as number[]).map((time, i) => ({
      time,
      date: dateKey(time, timezone),
      min: finite(d.temperature_2m_min[i]),
      max: finite(d.temperature_2m_max[i]),
      rain: sum(d.rain_sum[i], d.showers_sum[i]),
      probability: finite(d.precipitation_probability_max[i]),
      code: finite(d.weather_code[i]),
      sunrise: finite(d.sunrise[i]),
      sunset: finite(d.sunset[i]),
      uv: finite(d.uv_index_max[i]),
    })),
  }
}

async function fetchJson(url: string, signal?: AbortSignal): Promise<unknown> {
  const controller = new AbortController()
  const abort = () => controller.abort()
  if (signal?.aborted) controller.abort()
  signal?.addEventListener('abort', abort, { once: true })
  let timedOut = false
  const timer = setTimeout(() => {
    timedOut = true
    controller.abort()
  }, 15_000)
  try {
    const response = await fetch(url, { signal: controller.signal })
    if (!response.ok) {
      if (response.status === 429)
        throw new Error(
          'O serviço recebeu muitas consultas. Aguarde um momento e tente novamente.',
        )
      throw new Error(
        'Não foi possível consultar o serviço de previsão. Tente novamente em instantes.',
      )
    }
    return await response.json()
  } catch (error) {
    if (timedOut)
      throw new Error(
        'A consulta demorou mais que o esperado. Verifique sua conexão e tente novamente.',
      )
    if (signal?.aborted) throw error
    if (error instanceof TypeError)
      throw new Error(
        'Não foi possível conectar ao serviço. Verifique sua conexão com a internet.',
      )
    throw error
  } finally {
    clearTimeout(timer)
    signal?.removeEventListener('abort', abort)
  }
}

export async function searchLocations(
  query: string,
  signal?: AbortSignal,
): Promise<Location[]> {
  const params = new URLSearchParams({
    name: query.trim(),
    count: '6',
    language: 'pt',
    format: 'json',
  })
  const data = object(
    await fetchJson(
      `https://geocoding-api.open-meteo.com/v1/search?${params}`,
      signal,
    ),
  )
  if (data.results === undefined) return []
  if (!Array.isArray(data.results))
    throw new Error('A busca retornou um formato inesperado. Tente novamente.')
  return data.results.flatMap((raw) => {
    const item = object(raw)
    const location: Location = {
      id: typeof item.id === 'number' ? item.id : '',
      name: typeof item.name === 'string' ? item.name : '',
      latitude: item.latitude as number,
      longitude: item.longitude as number,
      country:
        typeof item.country === 'string'
          ? item.country
          : typeof item.country_code === 'string'
            ? item.country_code
            : '',
      countryCode:
        typeof item.country_code === 'string' ? item.country_code : undefined,
      region: typeof item.admin1 === 'string' ? item.admin1 : undefined,
    }
    return isLocation(location) ? [location] : []
  })
}

export async function getForecast(
  location: Location,
  signal?: AbortSignal,
): Promise<Forecast> {
  const params = new URLSearchParams({
    latitude: String(location.latitude),
    longitude: String(location.longitude),
    current:
      'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m',
    hourly:
      'temperature_2m,precipitation_probability,rain,showers,weather_code',
    daily:
      'weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,rain_sum,showers_sum,precipitation_probability_max',
    timezone: 'auto',
    timeformat: 'unixtime',
    forecast_days: '7',
    temperature_unit: 'celsius',
    wind_speed_unit: 'kmh',
    precipitation_unit: 'mm',
  })
  return parseForecast(
    await fetchJson(`https://api.open-meteo.com/v1/forecast?${params}`, signal),
  )
}
