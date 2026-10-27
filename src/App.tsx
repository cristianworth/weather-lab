import { useEffect, useRef, useState } from 'react'
import {
  ArrowDown,
  ArrowUp,
  Bookmark,
  Check,
  CircleHelp,
  CloudOff,
  Droplets,
  LoaderCircle,
  LocateFixed,
  MapPin,
  Moon,
  RefreshCw,
  Sun,
  Sunrise,
  Sunset,
  Wind,
  X,
} from 'lucide-react'
import BrandMark from './components/BrandMark'
import SkyArt from './components/SkyArt'
import ForecastChart, { type Metric } from './components/ForecastChart'
import LocationSearch from './components/LocationSearch'
import WeatherIcon from './components/WeatherIcon'
import { useStoredState } from './lib/storage'
import {
  dayLabel,
  decimal,
  DEFAULT_LOCATION,
  getForecast,
  hoursForDay,
  isLocation,
  localTime,
  locationKey,
  temperature,
  weatherDescription,
  type Forecast,
  type Location,
  type Unit,
} from './lib/weather'

const isUnit = (value: unknown): value is Unit =>
  value === 'celsius' || value === 'fahrenheit'
const isTheme = (value: unknown): value is 'light' | 'dark' =>
  value === 'light' || value === 'dark'
const isFavorites = (value: unknown): value is Location[] =>
  Array.isArray(value) && value.length <= 20 && value.every(isLocation)

function useForecast(location: Location, revision: number) {
  const key = locationKey(location)
  const [result, setResult] = useState<{
    key: string
    data: Forecast | null
    error: string
    loading: boolean
  }>({ key: '', data: null, error: '', loading: true })
  useEffect(() => {
    const controller = new AbortController()
    setResult({ key, data: null, error: '', loading: true })
    getForecast(location, controller.signal)
      .then((data) => {
        if (!controller.signal.aborted)
          setResult({ key, data, error: '', loading: false })
      })
      .catch((error) => {
        if (!controller.signal.aborted)
          setResult({
            key,
            data: null,
            error:
              error instanceof Error
                ? error.message
                : 'Não foi possível carregar a previsão.',
            loading: false,
          })
      })
    return () => controller.abort()
  }, [key, revision])
  return result.key === key
    ? result
    : { key, data: null, error: '', loading: true }
}

export default function App() {
  const [location, setLocation] = useStoredState(
    'weather-lab.location',
    DEFAULT_LOCATION,
    isLocation,
  )
  const [favorites, setFavorites] = useStoredState<Location[]>(
    'weather-lab.favorites',
    [],
    isFavorites,
  )
  const [unit, setUnit] = useStoredState<Unit>(
    'weather-lab.unit',
    'celsius',
    isUnit,
  )
  const [theme, setTheme] = useStoredState<'light' | 'dark'>(
    'weather-lab.theme',
    'light',
    isTheme,
  )
  const [view, setView] = useState<'overview' | 'favorites'>('overview')
  const [revision, setRevision] = useState(0)
  const [selectedDate, setSelectedDate] = useState('')
  const [metric, setMetric] = useState<Metric>('temperature')
  const [notice, setNotice] = useState('')
  const [locating, setLocating] = useState(false)
  const [about, setAbout] = useState(false)
  const aboutButton = useRef<HTMLButtonElement>(null)
  const aboutClose = useRef<HTMLButtonElement>(null)
  const geolocationRequest = useRef(0)
  const { data, error, loading } = useForecast(location, revision)
  const selectedDay =
    data?.days.find((day) => day.date === selectedDate) ?? data?.days[0]
  const selectedHours =
    data && selectedDay ? hoursForDay(data, selectedDay.date) : []
  const today = data?.days[0]
  const saved = favorites.some(
    (item) => locationKey(item) === locationKey(location),
  )

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])
  useEffect(() => {
    if (!notice) return
    const timeout = setTimeout(() => setNotice(''), 6500)
    return () => clearTimeout(timeout)
  }, [notice])
  useEffect(() => {
    if (!about) return
    aboutClose.current?.focus()
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setAbout(false)
    }
    document.addEventListener('keydown', close)
    return () => {
      document.removeEventListener('keydown', close)
      aboutButton.current?.focus()
    }
  }, [about])
  useEffect(
    () => () => {
      geolocationRequest.current++
    },
    [],
  )

  const selectLocation = (next: Location) => {
    geolocationRequest.current++
    setLocating(false)
    setLocation(next)
    setSelectedDate('')
    setView('overview')
  }
  const toggleFavorite = () => {
    if (saved) {
      setFavorites((items) =>
        items.filter((item) => locationKey(item) !== locationKey(location)),
      )
      setNotice(`${location.name} removida dos favoritos.`)
    } else if (favorites.length >= 20) {
      setNotice(
        'Você pode guardar até 20 localidades. Remova uma para adicionar outra.',
      )
    } else {
      setFavorites((items) => [...items, location])
      setNotice(`${location.name} adicionada aos favoritos.`)
    }
  }
  const locate = () => {
    if (!navigator.geolocation) {
      setNotice(
        'Seu navegador não oferece geolocalização. Use a busca de cidades.',
      )
      return
    }
    setLocating(true)
    const request = ++geolocationRequest.current
    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (request !== geolocationRequest.current) return
        selectLocation({
          id: `geo-${position.coords.latitude.toFixed(4)}-${position.coords.longitude.toFixed(4)}`,
          name: 'Minha localização',
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          country: '',
          region: `${position.coords.latitude.toFixed(2)}°, ${position.coords.longitude.toFixed(2)}°`,
        })
      },
      (failure) => {
        if (request !== geolocationRequest.current) return
        setLocating(false)
        setNotice(
          failure.code === 1
            ? 'A localização não foi permitida. Você pode buscar sua cidade pelo nome.'
            : 'Não foi possível obter sua localização. Tente buscar a cidade pelo nome.',
        )
      },
      { timeout: 12_000, maximumAge: 300_000, enableHighAccuracy: false },
    )
  }
  const currentDescription = data
    ? weatherDescription(data.current.code).label
    : ''
  const displayDate = data
    ? new Intl.DateTimeFormat('pt-BR', {
        timeZone: data.timezone,
        weekday: 'long',
        day: 'numeric',
        month: 'long',
      }).format(new Date(data.current.time * 1000))
    : 'Sua próxima previsão começa aqui'

  return (
    <>
      <a href="#main" className="skip-link">
        Ir para o conteúdo
      </a>
      <header className="masthead">
        <div className="masthead-inner">
          <a
            className="brand"
            href="#main"
            aria-label="Weather Lab, início"
            onClick={() => setView('overview')}
          >
            <BrandMark />
            <span>
              Weather Lab<small>Previsão para o seu dia</small>
            </span>
          </a>
          <nav aria-label="Navegação principal">
            <button
              className={view === 'overview' ? 'nav-item active' : 'nav-item'}
              aria-current={view === 'overview' ? 'page' : undefined}
              onClick={() => setView('overview')}
            >
              Previsão
            </button>
            <button
              className={view === 'favorites' ? 'nav-item active' : 'nav-item'}
              aria-current={view === 'favorites' ? 'page' : undefined}
              onClick={() => setView('favorites')}
            >
              <Bookmark size={17} />
              Favoritos<span className="nav-count">{favorites.length}</span>
            </button>
          </nav>
          <div className="masthead-tools">
            <div className="unit-toggle" aria-label="Unidade de temperatura">
              <button
                aria-pressed={unit === 'celsius'}
                onClick={() => setUnit('celsius')}
              >
                °C
              </button>
              <button
                aria-pressed={unit === 'fahrenheit'}
                onClick={() => setUnit('fahrenheit')}
              >
                °F
              </button>
            </div>
            <button
              className="icon-button theme-button"
              aria-label={theme === 'light' ? 'Modo escuro' : 'Modo claro'}
              title={theme === 'light' ? 'Modo escuro' : 'Modo claro'}
              onClick={() =>
                setTheme((value) => (value === 'light' ? 'dark' : 'light'))
              }
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button
              ref={aboutButton}
              className="icon-button"
              aria-label="Sobre o Weather Lab"
              title="Sobre o Weather Lab"
              onClick={() => setAbout(true)}
            >
              <CircleHelp size={20} />
            </button>
          </div>
        </div>
      </header>
      <main id="main" tabIndex={-1}>
        <div className="page-heading">
          <div>
            <h1>
              {view === 'overview'
                ? 'O tempo, de perto.'
                : 'Lugares para acompanhar.'}
            </h1>
            <p>
              {view === 'overview'
                ? 'Temperatura e chuva, de agora até os próximos sete dias.'
                : 'As cidades que você salvou, reunidas em um lugar.'}
            </p>
          </div>
          <span className="heading-date">{displayDate}</span>
        </div>
        <div className="search-row">
          <LocationSearch onSelect={selectLocation} />
          <button
            className="location-button"
            aria-label={locating ? 'Localizando…' : 'Usar minha localização'}
            disabled={locating}
            onClick={locate}
          >
            {locating ? (
              <LoaderCircle size={19} className="spin" />
            ) : (
              <LocateFixed size={19} />
            )}
            <span>{locating ? 'Localizando…' : 'Usar minha localização'}</span>
          </button>
        </div>
        {view === 'favorites' ? (
          <section
            className="favorites-section"
            aria-label="Localidades favoritas"
          >
            <div className="section-heading">
              <h2>
                Seus favoritos{' '}
                <span className="inline-count">{favorites.length}</span>
              </h2>
              <span>Salvos neste navegador</span>
            </div>
            {favorites.length ? (
              <div className="favorite-grid">
                {favorites.map((item) => (
                  <article className="favorite-card" key={locationKey(item)}>
                    <div className="favorite-card-top">
                      <MapPin size={25} />
                      <button
                        className="icon-button"
                        aria-label={`Remover ${item.name} dos favoritos`}
                        onClick={() => {
                          setFavorites((items) =>
                            items.filter(
                              (favorite) =>
                                locationKey(favorite) !== locationKey(item),
                            ),
                          )
                          setNotice(`${item.name} removida dos favoritos.`)
                        }}
                      >
                        <X size={19} />
                      </button>
                    </div>
                    <h3>{item.name}</h3>
                    <p>
                      {[item.region, item.country].filter(Boolean).join(', ') ||
                        'Localização do dispositivo'}
                    </p>
                    <button
                      className="text-button"
                      onClick={() => selectLocation(item)}
                    >
                      Abrir previsão
                    </button>
                  </article>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <Bookmark size={36} />
                <h2>Nenhuma cidade salva ainda</h2>
                <p>
                  Busque uma cidade e selecione “Salvar local” para acompanhar a
                  previsão por aqui.
                </p>
                <button
                  className="primary-button"
                  onClick={() => setView('overview')}
                >
                  Buscar uma cidade
                </button>
              </div>
            )}
          </section>
        ) : (
          <>
            <div className="location-heading">
              <div>
                <MapPin size={22} />
                <h2>
                  {location.name}
                  <span>
                    {location.countryCode ? `, ${location.countryCode}` : ''}
                  </span>
                </h2>
                <span className="location-region">
                  {location.region && location.region !== location.name
                    ? location.region
                    : location.country}
                </span>
              </div>
              <div>
                <button
                  className="icon-button refresh-button"
                  aria-label="Atualizar previsão"
                  title="Atualizar previsão"
                  disabled={loading}
                  onClick={() => setRevision((value) => value + 1)}
                >
                  <RefreshCw size={18} className={loading ? 'spin' : ''} />
                </button>
                <button
                  className={`save-button ${saved ? 'saved' : ''}`}
                  aria-pressed={saved}
                  onClick={toggleFavorite}
                >
                  {saved ? <Check size={17} /> : <Bookmark size={17} />}
                  {saved ? 'Local salvo' : 'Salvar local'}
                </button>
              </div>
            </div>
            {loading ? (
              <div
                className="loading-dashboard"
                role="status"
                aria-label="Carregando previsão"
              >
                <div className="skeleton hero-skeleton" />
                <div className="skeleton days-skeleton" />
                <div className="skeleton graph-skeleton" />
                <span className="loading-label">
                  <LoaderCircle size={19} className="spin" />
                  Carregando a previsão de {location.name}…
                </span>
              </div>
            ) : error || !data || !today || !selectedDay ? (
              <section className="error-state" role="alert">
                <CloudOff size={40} />
                <h2>Não foi possível carregar a previsão</h2>
                <p>
                  {error || 'Não há previsão disponível para esta localidade.'}
                </p>
                <button
                  className="primary-button"
                  onClick={() => setRevision((value) => value + 1)}
                >
                  <RefreshCw size={18} />
                  Tentar novamente
                </button>
                <small>Você também pode buscar outra cidade acima.</small>
              </section>
            ) : (
              <>
                <section className="current-grid" aria-label="Condições atuais">
                  <article
                    className={`current-card ${data.current.isDay ? '' : 'night'}`}
                  >
                    <SkyArt
                      code={data.current.code}
                      isDay={data.current.isDay}
                    />
                    <div className="current-top">
                      <span className="current-label">Condições atuais</span>
                      <span className="current-time">
                        {localTime(data.current.time, data.timezone)}
                      </span>
                    </div>
                    <div className="current-main">
                      <div className="current-temperature">
                        {temperature(data.current.temperature, unit)}
                        <span>{unit === 'celsius' ? 'C' : 'F'}</span>
                      </div>
                      <div className="current-condition">
                        <WeatherIcon
                          code={data.current.code}
                          isDay={data.current.isDay}
                          size={27}
                        />
                        <span>{currentDescription}</span>
                      </div>
                      <p>
                        Sensação térmica de{' '}
                        {temperature(data.current.apparent, unit)}
                      </p>
                    </div>
                    <div className="current-bottom">
                      <span>
                        <ArrowUp size={16} />
                        <span className="sr-only">Máxima de hoje: </span>
                        {temperature(today.max, unit)}
                        <span className="current-divider" />
                        <ArrowDown size={16} />
                        <span className="sr-only">Mínima de hoje: </span>
                        {temperature(today.min, unit)}
                      </span>
                      <span>Hoje</span>
                    </div>
                  </article>
                  <div className="metrics-grid">
                    <article className="metric-card">
                      <div className="metric-label">
                        <span>Chuva hoje</span>
                        <Droplets size={21} />
                      </div>
                      <div className="metric-value">
                        {decimal(today.rain)}
                        <span>mm</span>
                      </div>
                      <p>Acumulado previsto</p>
                    </article>
                    <article className="metric-card">
                      <div className="metric-label">
                        <span>Probabilidade</span>
                        <CloudRainIcon />
                      </div>
                      <div className="metric-value">
                        {decimal(today.probability)}
                        <span>%</span>
                      </div>
                      <p>Máxima de precipitação hoje</p>
                    </article>
                    <article className="metric-card">
                      <div className="metric-label">
                        <span>Vento agora</span>
                        <Wind size={21} />
                      </div>
                      <div className="metric-value">
                        {decimal(data.current.wind)}
                        <span>km/h</span>
                      </div>
                      <p>Velocidade a 10 m do solo</p>
                    </article>
                    <article className="metric-card">
                      <div className="metric-label">
                        <span>Umidade agora</span>
                        <Droplets size={21} />
                      </div>
                      <div className="metric-value">
                        {decimal(data.current.humidity)}
                        <span>%</span>
                      </div>
                      <p>Umidade relativa do ar</p>
                    </article>
                  </div>
                </section>
                <section
                  className="week-section"
                  aria-label="Previsão para sete dias"
                >
                  <div className="section-heading">
                    <h2>Uma semana pela frente</h2>
                    <span>Escolha um dia para ver os detalhes</span>
                  </div>
                  <div className="week-grid">
                    {data.days.map((day, index) => (
                      <button
                        className={`day-card ${day.date === selectedDay.date ? 'selected' : ''}`}
                        key={day.date}
                        aria-pressed={day.date === selectedDay.date}
                        aria-label={`${dayLabel(day, data.timezone, index)}, ${weatherDescription(day.code).label}, máxima ${temperature(day.max, unit)}, mínima ${temperature(day.min, unit)}`}
                        onClick={() => setSelectedDate(day.date)}
                      >
                        <span className="day-name">
                          {dayLabel(day, data.timezone, index)}
                        </span>
                        <span className="day-date">
                          {new Intl.DateTimeFormat('pt-BR', {
                            timeZone: data.timezone,
                            day: '2-digit',
                            month: '2-digit',
                          }).format(new Date(day.time * 1000))}
                        </span>
                        <WeatherIcon code={day.code} size={34} />
                        <span className="day-temperatures">
                          <strong>{temperature(day.max, unit)}</strong>
                          <span>{temperature(day.min, unit)}</span>
                        </span>
                        <span className="day-rain">
                          <Droplets size={14} />
                          {decimal(day.rain, ' mm')}
                        </span>
                      </button>
                    ))}
                  </div>
                </section>
                <div className="detail-grid">
                  <div className="forecast-column">
                    <div className="selected-day-label">
                      <span>
                        {dayLabel(
                          selectedDay,
                          data.timezone,
                          data.days.indexOf(selectedDay),
                        )}
                      </span>
                      <span>
                        {new Intl.DateTimeFormat('pt-BR', {
                          timeZone: data.timezone,
                          day: 'numeric',
                          month: 'long',
                        }).format(new Date(selectedDay.time * 1000))}
                      </span>
                    </div>
                    <ForecastChart
                      key={selectedDay.date}
                      hours={selectedHours}
                      timezone={data.timezone}
                      unit={unit}
                      metric={metric}
                      onMetricChange={setMetric}
                    />
                  </div>
                  <aside className="daylight-panel">
                    <div className="panel-heading">
                      <h2>Luz do dia</h2>
                      <Sun size={23} className="sun-color" />
                    </div>
                    <div className="sun-arc" aria-hidden="true">
                      <svg viewBox="0 0 260 122">
                        <path
                          d="M20 108 A110 90 0 0 1 240 108"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeDasharray="3 7"
                        />
                        <circle cx="130" cy="18" r="15" className="sun-orb" />
                        <line
                          x1="12"
                          x2="248"
                          y1="108"
                          y2="108"
                          stroke="currentColor"
                          strokeWidth="1"
                        />
                      </svg>
                    </div>
                    <div className="sun-times">
                      <div>
                        <Sunrise size={21} />
                        <span>Nascer do sol</span>
                        <strong>
                          {selectedDay.sunrise === null
                            ? '—'
                            : localTime(selectedDay.sunrise, data.timezone)}
                        </strong>
                      </div>
                      <div>
                        <Sunset size={21} />
                        <span>Pôr do sol</span>
                        <strong>
                          {selectedDay.sunset === null
                            ? '—'
                            : localTime(selectedDay.sunset, data.timezone)}
                        </strong>
                      </div>
                    </div>
                    <div className="uv-row">
                      <span>Índice UV máximo</span>
                      <strong>{decimal(selectedDay.uv)}</strong>
                    </div>
                  </aside>
                </div>
                <section className="hourly-section">
                  <div className="section-heading">
                    <h2>Seu dia, a cada três horas</h2>
                    <span>Horários de {location.name}</span>
                  </div>
                  <div
                    className="hourly-grid"
                    role="region"
                    aria-label="Resumo horário com rolagem"
                    tabIndex={0}
                  >
                    {selectedHours
                      .filter((_, i) => i % 3 === 0)
                      .map((hour) => (
                        <article className="hour-card" key={hour.time}>
                          <span>{localTime(hour.time, data.timezone)}</span>
                          <WeatherIcon
                            code={hour.code}
                            isDay={
                              selectedDay.sunrise !== null &&
                              selectedDay.sunset !== null
                                ? hour.time >= selectedDay.sunrise &&
                                  hour.time < selectedDay.sunset
                                : true
                            }
                            size={28}
                          />
                          <strong>{temperature(hour.temperature, unit)}</strong>
                          <small>
                            <Droplets size={13} />
                            {decimal(hour.rain, ' mm')}
                          </small>
                          <span className="hour-probability">
                            {decimal(hour.probability, '%')} prob.
                          </span>
                        </article>
                      ))}
                  </div>
                </section>
                <div className="forecast-note">
                  <p>
                    Consulta atualizada às{' '}
                    <strong>
                      {localTime(data.fetchedAt / 1000, data.timezone)}
                    </strong>
                    . Horários em <strong>{data.timezone}</strong>.
                  </p>
                  <button
                    className="text-button"
                    onClick={() => setRevision((value) => value + 1)}
                  >
                    <RefreshCw size={15} />
                    Atualizar
                  </button>
                </div>
              </>
            )}
          </>
        )}
        <footer className="footer">
          <a
            href="#main"
            className="footer-brand"
            onClick={() => setView('overview')}
          >
            <BrandMark size={30} />
            <span>Weather Lab</span>
          </a>
          <span>
            Dados por{' '}
            <a href="https://open-meteo.com/" target="_blank" rel="noreferrer">
              Open-Meteo
            </a>
            . Localidades por{' '}
            <a
              href="https://www.geonames.org/"
              target="_blank"
              rel="noreferrer"
            >
              GeoNames
            </a>
            .{' '}
            <a
              href="https://creativecommons.org/licenses/by/4.0/"
              target="_blank"
              rel="noreferrer"
            >
              CC BY 4.0
            </a>
            .
          </span>
        </footer>
      </main>
      {notice && (
        <div className="toast" role="status">
          <Check size={19} />
          <span>{notice}</span>
          <button
            className="icon-button"
            aria-label="Fechar mensagem"
            onClick={() => setNotice('')}
          >
            <X size={18} />
          </button>
        </div>
      )}
      {about && (
        <div
          className="modal-backdrop"
          onClick={(event) => {
            if (event.target === event.currentTarget) setAbout(false)
          }}
        >
          <section
            className="about-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="about-title"
            onKeyDown={(event) => {
              if (event.key === 'Tab') {
                event.preventDefault()
                aboutClose.current?.focus()
              }
            }}
          >
            <button
              ref={aboutClose}
              className="icon-button modal-close"
              aria-label="Fechar sobre"
              onClick={() => setAbout(false)}
            >
              <X size={22} />
            </button>
            <BrandMark size={64} />
            <h2 id="about-title">Weather Lab</h2>
            <p>
              Um painel para consultar temperatura, chuva e condições do tempo.
              Projeto open source de Cristian, desenvolvido com React,
              TypeScript e dados da Open-Meteo.
            </p>
            <p>
              As informações vêm de modelos meteorológicos e não substituem
              alertas oficiais. Chuva é a soma de chuva e pancadas no intervalo
              anterior a cada horário.
            </p>
            <p>
              Favoritos e preferências ficam neste navegador. Ao usar sua
              localização, as coordenadas são enviadas à Open-Meteo para
              consultar a previsão.
            </p>
            <small>Versão {__APP_VERSION__}</small>
          </section>
        </div>
      )}
    </>
  )
}

function CloudRainIcon() {
  return <WeatherIcon code={61} size={21} />
}
