import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import App from './App'
import * as weather from './lib/weather'
import { makeApiForecast } from './test/fixtures'

vi.mock('./lib/weather', async (importOriginal) => {
  const actual = await importOriginal<typeof import('./lib/weather')>()
  return { ...actual, getForecast: vi.fn(), searchLocations: vi.fn() }
})

beforeEach(() => {
  vi.mocked(weather.getForecast).mockResolvedValue(
    weather.parseForecast(makeApiForecast()),
  )
  vi.mocked(weather.searchLocations).mockResolvedValue([])
})

describe('weather dashboard', () => {
  it('loads the dashboard, switches days, changes units and explores rain', async () => {
    const user = userEvent.setup()
    render(<App />)
    await screen.findByRole('region', { name: 'Condições atuais' })
    expect(
      screen.getByRole('heading', { name: /O tempo, de perto/ }),
    ).toBeVisible()
    const current = screen.getByRole('region', { name: 'Condições atuais' })
    expect(within(current).getByText('24°')).toBeVisible()
    await user.click(screen.getByRole('button', { name: '°F' }))
    expect(within(current).getByText('75°')).toBeVisible()
    await user.click(screen.getByRole('button', { name: /^Amanhã,/ }))
    expect(screen.getByRole('button', { name: /^Amanhã,/ })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
    await user.click(screen.getByRole('button', { name: 'Chuva' }))
    expect(
      screen.getByText('Chuva acumulada na hora anterior (mm)'),
    ).toBeVisible()
    await user.click(screen.getByText('Ver dados e entender as medidas'))
    const table = screen.getByRole('table')
    expect(within(table).getAllByRole('row')).toHaveLength(25)
  })

  it('saves favorites, restores preferences after remount and removes a favorite', async () => {
    const user = userEvent.setup()
    const app = render(<App />)
    await screen.findByRole('region', { name: 'Condições atuais' })
    await user.click(screen.getByRole('button', { name: 'Salvar local' }))
    expect(
      JSON.parse(localStorage.getItem('weather-lab.favorites')!),
    ).toHaveLength(1)
    await user.click(screen.getByRole('button', { name: '°F' }))
    app.unmount()
    render(<App />)
    expect(screen.getByRole('button', { name: '°F' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
    await user.click(screen.getByRole('button', { name: /Favoritos/ }))
    expect(screen.getByRole('heading', { name: 'São Paulo' })).toBeVisible()
    await user.click(
      screen.getByRole('button', { name: 'Remover São Paulo dos favoritos' }),
    )
    expect(screen.getByText('Nenhuma cidade salva ainda')).toBeVisible()
  })

  it('recovers after a service failure without displaying invented weather', async () => {
    vi.mocked(weather.getForecast).mockRejectedValueOnce(
      new Error('Conexão indisponível.'),
    )
    const user = userEvent.setup()
    render(<App />)
    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Conexão indisponível.',
    )
    expect(
      screen.queryByRole('region', { name: 'Condições atuais' }),
    ).not.toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Tentar novamente' }))
    expect(
      await screen.findByRole('region', { name: 'Condições atuais' }),
    ).toBeVisible()
  })

  it('supports keyboard city search and persists the selected location', async () => {
    const city: weather.Location = {
      id: 1,
      name: 'Curitiba',
      latitude: -25.42,
      longitude: -49.27,
      country: 'Brasil',
      countryCode: 'BR',
      region: 'Paraná',
    }
    vi.mocked(weather.searchLocations).mockResolvedValue([city])
    const user = userEvent.setup()
    render(<App />)
    await user.type(
      screen.getByRole('combobox', { name: 'Buscar cidade' }),
      'Curitiba',
    )
    await screen.findByRole('option')
    await user.keyboard('{ArrowDown}{Enter}')
    await screen.findByRole('heading', { name: 'Curitiba, BR' })
    expect(JSON.parse(localStorage.getItem('weather-lab.location')!).name).toBe(
      'Curitiba',
    )
    expect(screen.getByRole('combobox')).toHaveValue('')
  })

  it('survives invalid local data and a denied geolocation request', async () => {
    localStorage.setItem('weather-lab.location', '{corrupt')
    Object.defineProperty(navigator, 'geolocation', {
      configurable: true,
      value: {
        getCurrentPosition: vi.fn((_success, failure) => failure({ code: 1 })),
      },
    })
    const user = userEvent.setup()
    render(<App />)
    await screen.findByRole('region', { name: 'Condições atuais' })
    await user.click(
      screen.getByRole('button', { name: 'Usar minha localização' }),
    )
    expect(screen.getByRole('status')).toHaveTextContent(
      'A localização não foi permitida',
    )
    expect(screen.getByRole('heading', { name: 'São Paulo, BR' })).toBeVisible()
  })

  it('ignores a superseded city response even if it finishes after the next request', async () => {
    let finishOld!: (value: weather.Forecast) => void
    vi.mocked(weather.getForecast).mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          finishOld = resolve
        }),
    )
    const city: weather.Location = {
      id: 2,
      name: 'Recife',
      latitude: -8.05,
      longitude: -34.88,
      country: 'Brasil',
    }
    vi.mocked(weather.searchLocations).mockResolvedValue([city])
    const user = userEvent.setup()
    render(<App />)
    await user.type(screen.getByRole('combobox'), 'Recife')
    await screen.findByRole('option')
    await user.keyboard('{ArrowDown}{Enter}')
    await screen.findByRole('region', { name: 'Condições atuais' })
    const old = weather.parseForecast(makeApiForecast())
    old.current.temperature = -99
    finishOld(old)
    await waitFor(() =>
      expect(screen.getByRole('heading', { name: 'Recife' })).toBeVisible(),
    )
    expect(screen.queryByText('-99°')).not.toBeInTheDocument()
  })

  it('supports graph keyboard exploration and dismisses the about dialog with Escape', async () => {
    const user = userEvent.setup()
    render(<App />)
    await screen.findByRole('region', { name: 'Condições atuais' })
    const chart = screen.getByRole('img', {
      name: /Temperatura ao longo do dia/,
    })
    fireEvent.focus(chart)
    fireEvent.keyDown(chart, { key: 'ArrowRight' })
    expect(screen.getByRole('status')).toHaveTextContent('01:00')
    await user.click(
      screen.getByRole('button', { name: 'Sobre o Weather Lab' }),
    )
    expect(screen.getByRole('dialog')).toBeVisible()
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})
