import { useEffect, useId, useRef, useState } from 'react'
import { Droplets, Thermometer } from 'lucide-react'
import {
  decimal,
  localTime,
  temperature,
  type HourForecast,
  type Unit,
} from '../lib/weather'

export type Metric = 'temperature' | 'rain'

export default function ForecastChart({
  hours,
  timezone,
  unit,
  metric,
  onMetricChange,
}: {
  hours: HourForecast[]
  timezone: string
  unit: Unit
  metric: Metric
  onMetricChange: (metric: Metric) => void
}) {
  const [active, setActive] = useState<number | null>(null)
  const [width, setWidth] = useState(960)
  const container = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!container.current || typeof ResizeObserver === 'undefined') return
    const observer = new ResizeObserver((entries) => {
      const measured = entries[0]?.contentRect.width
      if (measured) setWidth(Math.max(280, measured))
    })
    observer.observe(container.current)
    return () => observer.disconnect()
  }, [])
  const id = useId().replaceAll(':', '')
  const height = 224,
    left = 36,
    right = 22,
    top = 20,
    bottom = 34
  const graphWidth = width - left - right,
    graphHeight = height - top - bottom
  const getValue = (hour: HourForecast) =>
    metric === 'rain'
      ? hour.rain
      : hour.temperature === null
        ? null
        : unit === 'fahrenheit'
          ? (hour.temperature * 9) / 5 + 32
          : hour.temperature
  const values = hours
    .map(getValue)
    .filter((value): value is number => value !== null)
  const low =
    metric === 'rain'
      ? 0
      : values.length
        ? Math.floor((Math.min(...values) - 3) / 5) * 5
        : 0
  const high =
    metric === 'rain'
      ? Math.max(1, Math.ceil(Math.max(...values, 0) * 1.2))
      : values.length
        ? Math.ceil((Math.max(...values) + 3) / 5) * 5
        : 30
  const x = (index: number) =>
    left + (index / Math.max(hours.length - 1, 1)) * graphWidth
  const y = (value: number) =>
    top + (1 - (value - low) / (high - low)) * graphHeight
  const segments: { x: number; y: number }[][] = []
  hours.forEach((hour, index) => {
    const value = getValue(hour)
    if (value === null) {
      if (segments.at(-1)?.length) segments.push([])
      return
    }
    if (!segments.length) segments.push([])
    segments.at(-1)!.push({ x: x(index), y: y(value) })
  })
  const selected = active !== null ? hours[active] : null
  const selectedValue = selected ? getValue(selected) : null
  const describe = (hour: HourForecast) =>
    `${localTime(hour.time, timezone)}: ${metric === 'temperature' ? temperature(hour.temperature, unit, true) : decimal(hour.rain, ' mm')}`

  return (
    <section className="panel chart-panel" aria-label="Previsão por hora">
      <div className="panel-heading chart-heading">
        <div>
          <h2>Hora a hora</h2>
        </div>
        <div className="segmented-control" aria-label="Variável do gráfico">
          <button
            aria-pressed={metric === 'temperature'}
            onClick={() => {
              setActive(null)
              onMetricChange('temperature')
            }}
          >
            <Thermometer size={15} /> Temperatura
          </button>
          <button
            aria-pressed={metric === 'rain'}
            onClick={() => {
              setActive(null)
              onMetricChange('rain')
            }}
          >
            <Droplets size={15} /> Chuva
          </button>
        </div>
      </div>
      <div className="chart-caption">
        <span>
          <i className={`legend-dot ${metric}`} />
          {metric === 'temperature'
            ? `Temperatura em °${unit === 'celsius' ? 'C' : 'F'}`
            : 'Chuva acumulada na hora anterior (mm)'}
        </span>
        <span className="chart-instruction">
          Passe sobre o gráfico para explorar
        </span>
      </div>
      <div className="chart-wrap" ref={container}>
        <svg
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          tabIndex={0}
          aria-label={`${metric === 'temperature' ? 'Temperatura' : 'Chuva'} ao longo do dia. Use as setas para explorar os horários; os valores também estão na tabela abaixo.`}
          onFocus={() => setActive(0)}
          onBlur={() => setActive(null)}
          onKeyDown={(event) => {
            if (
              ['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)
            ) {
              event.preventDefault()
              setActive((index) =>
                event.key === 'Home'
                  ? 0
                  : event.key === 'End'
                    ? hours.length - 1
                    : Math.max(
                        0,
                        Math.min(
                          hours.length - 1,
                          (index ?? 0) + (event.key === 'ArrowRight' ? 1 : -1),
                        ),
                      ),
              )
            }
          }}
          onPointerMove={(event) => {
            const bounds = event.currentTarget.getBoundingClientRect()
            const position =
              ((event.clientX - bounds.left) / bounds.width) * width
            setActive(
              Math.max(
                0,
                Math.min(
                  hours.length - 1,
                  Math.round(
                    ((position - left) / graphWidth) * (hours.length - 1),
                  ),
                ),
              ),
            )
          }}
          onPointerLeave={() => setActive(null)}
        >
          <defs>
            <linearGradient id={`${id}-fill`} x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor="var(--temperature)"
                stopOpacity=".24"
              />
              <stop
                offset="100%"
                stopColor="var(--temperature)"
                stopOpacity=".015"
              />
            </linearGradient>
          </defs>
          {[0, 1, 2, 3].map((index) => {
            const value = low + ((high - low) * index) / 3
            return (
              <g key={index}>
                <line
                  x1={left}
                  x2={width - right}
                  y1={y(value)}
                  y2={y(value)}
                  className="chart-grid"
                />
                <text
                  x={left - 14}
                  y={y(value) + 4}
                  textAnchor="end"
                  className="chart-label"
                >
                  {metric === 'temperature'
                    ? `${Math.round(value)}°`
                    : decimal(value)}
                </text>
              </g>
            )
          })}
          {metric === 'temperature'
            ? segments
                .filter((segment) => segment.length)
                .map((segment, index) => {
                  const path = segment
                    .map((point, i) => `${i ? 'L' : 'M'}${point.x},${point.y}`)
                    .join(' ')
                  return (
                    <g key={index}>
                      <path
                        d={`${path} L${segment.at(-1)!.x},${y(low)} L${segment[0].x},${y(low)} Z`}
                        fill={`url(#${id}-fill)`}
                      />
                      <path d={path} className="temperature-line" />
                    </g>
                  )
                })
            : hours.map((hour, index) =>
                hour.rain === null ? null : (
                  <rect
                    key={hour.time}
                    x={
                      x(index) - (graphWidth / Math.max(hours.length, 1)) * 0.29
                    }
                    y={y(hour.rain)}
                    width={(graphWidth / Math.max(hours.length, 1)) * 0.58}
                    height={Math.max(0, y(0) - y(hour.rain))}
                    rx="3"
                    className="rain-bar"
                  />
                ),
              )}
          {hours.map((hour, index) =>
            index % (width < 480 ? 6 : 3) === 0 ||
            index === hours.length - 1 ? (
              <text
                key={hour.time}
                x={x(index)}
                y={height - 6}
                textAnchor="middle"
                className="chart-label"
              >
                {localTime(hour.time, timezone)}
              </text>
            ) : null,
          )}
          {active !== null && selected && (
            <g>
              <line
                x1={x(active)}
                x2={x(active)}
                y1={top}
                y2={y(low)}
                className="chart-cursor"
              />
              {selectedValue !== null && (
                <circle
                  cx={x(active)}
                  cy={y(selectedValue)}
                  r="5"
                  className={`chart-point ${metric}`}
                />
              )}
            </g>
          )}
        </svg>
        {selected && active !== null && (
          <div
            className="chart-tooltip"
            style={{
              left: `${Math.max(12, Math.min(88, (x(active) / width) * 100))}%`,
            }}
            role="status"
          >
            <span>{localTime(selected.time, timezone)}</span>
            <strong>
              {metric === 'temperature'
                ? temperature(selected.temperature, unit, true)
                : decimal(selected.rain, ' mm')}
            </strong>
            <small>
              Precipitação: {decimal(selected.probability, '%')} de
              probabilidade
            </small>
          </div>
        )}
      </div>
      {!values.length && (
        <p className="muted chart-empty">
          Sem dados disponíveis para esta variável.
        </p>
      )}
      <span className="sr-only" aria-live="polite">
        {selected ? describe(selected) : ''}
      </span>
      <details className="data-details">
        <summary>Ver dados e entender as medidas</summary>
        <p>
          Chuva é a soma de chuva e pancadas, em milímetros, no intervalo
          anterior a cada horário. Probabilidade se refere à precipitação, que
          também pode incluir neve. Horários em {timezone}. “—” indica dado
          indisponível.
        </p>
        <div
          className="table-scroll"
          role="region"
          aria-label="Tabela horária com rolagem"
          tabIndex={0}
        >
          <table>
            <caption className="sr-only">
              Previsão horária do dia selecionado
            </caption>
            <thead>
              <tr>
                <th scope="col">Horário</th>
                <th scope="col">Temperatura</th>
                <th scope="col">Chuva</th>
                <th scope="col">Probabilidade</th>
              </tr>
            </thead>
            <tbody>
              {hours.map((hour) => (
                <tr key={hour.time}>
                  <th scope="row">{localTime(hour.time, timezone)}</th>
                  <td>{temperature(hour.temperature, unit, true)}</td>
                  <td>{decimal(hour.rain, ' mm')}</td>
                  <td>{decimal(hour.probability, '%')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </section>
  )
}
