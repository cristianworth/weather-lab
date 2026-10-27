import { useId } from 'react'
import { weatherDescription } from '../lib/weather'

export default function SkyArt({
  code,
  isDay,
}: {
  code: number | null
  isDay: boolean
}) {
  const id = useId().replaceAll(':', '')
  const kind = weatherDescription(code).kind
  const wet = ['rain', 'drizzle', 'storm', 'snow'].includes(kind)
  const cloudy = kind !== 'clear' && kind !== 'unknown'
  const showOrb = kind === 'clear' || kind === 'partly-cloudy'
  return (
    <svg
      className={`sky-art ${wet ? 'wet' : ''}`}
      viewBox="0 0 460 300"
      aria-hidden="true"
    >
      <defs>
        <clipPath id={`${id}-sky`}>
          <path d="M0 0h460v300H0z" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id}-sky)`}>
        <g
          className="atmosphere-lines"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M-60 143C60 43 120 46 248 139s174 88 280 20" />
          <path d="M-60 169C60 69 120 72 248 165s174 88 280 20" />
          <path d="M-60 195C60 95 120 98 248 191s174 88 280 20" />
          <path d="M-60 221C60 121 120 124 248 217s174 88 280 20" />
          <path d="M-60 247C60 147 120 150 248 243s174 88 280 20" />
        </g>
        {showOrb &&
          (isDay ? (
            <circle className="sky-orb" cx="295" cy="103" r="56" />
          ) : (
            <path
              className="sky-moon"
              d="M315 43a61 61 0 1 0 50 95 60 60 0 0 1-50-95Z"
            />
          ))}
        {cloudy && (
          <path
            className="sky-cloud-shape"
            d="M223 148a25 25 0 0 1 12-47 42 42 0 0 1 79-14 33 33 0 1 1 35 61Z"
          />
        )}
        {wet &&
          (kind === 'snow' ? (
            <g
              className="sky-precipitation"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
            >
              <path d="m260 169 0 10m-5-5h10m31-5v10m-5-5h10m31-5v10m-5-5h10" />
            </g>
          ) : (
            <g
              className="sky-precipitation"
              stroke="currentColor"
              strokeWidth="5"
              strokeLinecap="round"
            >
              <path d="m260 167-8 17m41-17-8 17m41-17-8 17" />
            </g>
          ))}
        {kind === 'storm' && (
          <path
            d="m300 147-17 30h15l-12 26 35-41h-17l12-15Z"
            className="sky-lightning"
          />
        )}
        {kind === 'fog' && (
          <g
            className="sky-precipitation"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
          >
            <path d="M227 166h120M240 181h95" />
          </g>
        )}
      </g>
    </svg>
  )
}
