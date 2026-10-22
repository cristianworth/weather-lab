export function makeApiForecast() {
  const start = Date.parse('2026-10-22T03:00:00Z') / 1000
  const times = Array.from({ length: 168 }, (_, i) => start + i * 3600)
  const dailyTimes = Array.from({ length: 7 }, (_, i) => start + i * 86_400)
  return {
    timezone: 'America/Sao_Paulo',
    utc_offset_seconds: -10_800,
    current: {
      time: start + 12 * 3600,
      temperature_2m: 24,
      apparent_temperature: 25,
      relative_humidity_2m: 65,
      wind_speed_10m: 12,
      weather_code: 2,
      is_day: 1,
    },
    hourly: {
      time: times,
      temperature_2m: times.map(
        (_, i) => 19 + Math.sin((i / 24) * Math.PI * 2) * 5,
      ),
      rain: times.map((_, i) => (i % 24 === 15 ? 1.2 : 0)),
      showers: times.map((_, i) => (i % 24 === 15 ? 0.8 : 0)),
      precipitation_probability: times.map((_, i) => (i % 24 === 15 ? 65 : 10)),
      weather_code: times.map(() => 2),
    },
    daily: {
      time: dailyTimes,
      weather_code: [2, 61, 3, 0, 2, 61, 1],
      temperature_2m_min: [17, 18, 16, 17, 18, 16, 19],
      temperature_2m_max: [27, 25, 26, 28, 29, 24, 30],
      rain_sum: [2, 3, 0, 0, 1, 4, 0],
      showers_sum: [1, 1, 0, 0, 0, 1, 0],
      precipitation_probability_max: [65, 70, 10, 0, 40, 90, 5],
      sunrise: dailyTimes.map((time) => time + 6 * 3600),
      sunset: dailyTimes.map((time) => time + 18 * 3600),
      uv_index_max: [5, 6, 8, 9, 8, 4, 7],
    },
  }
}
