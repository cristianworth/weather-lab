import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudMoon,
  CloudRain,
  CloudSnow,
  CloudSun,
  Moon,
  Sun,
} from 'lucide-react'
import { weatherDescription } from '../lib/weather'

export default function WeatherIcon({
  code,
  isDay = true,
  size = 28,
  className = '',
}: {
  code: number | null
  isDay?: boolean
  size?: number
  className?: string
}) {
  const { kind } = weatherDescription(code)
  const Icon = {
    clear: isDay ? Sun : Moon,
    'partly-cloudy': isDay ? CloudSun : CloudMoon,
    cloudy: Cloud,
    fog: CloudFog,
    drizzle: CloudDrizzle,
    rain: CloudRain,
    snow: CloudSnow,
    storm: CloudLightning,
    unknown: Cloud,
  }[kind]
  return (
    <Icon
      size={size}
      strokeWidth={1.6}
      aria-hidden="true"
      className={`weather-icon ${kind} ${className}`}
    />
  )
}
