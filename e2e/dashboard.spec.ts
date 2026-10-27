import { expect, test } from '@playwright/test'
import { makeApiForecast } from '../src/test/fixtures'
import AxeBuilder from '@axe-core/playwright'

test('real forecast, keyboard city search, favorites and reload', async ({
  page,
}) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.goto('./')
  await expect(
    page.getByRole('region', { name: 'Condições atuais' }),
  ).toBeVisible()
  const accessibility = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa'])
    .analyze()
  expect(
    accessibility.violations.map((issue) => ({
      id: issue.id,
      nodes: issue.nodes.map((node) => node.target),
    })),
  ).toEqual([])
  await page.screenshot({
    path: 'test-results/dashboard-desktop.png',
    fullPage: true,
  })
  await page.getByRole('combobox', { name: 'Buscar cidade' }).fill('Curitiba')
  await expect(page.getByRole('option').first()).toBeVisible()
  await page.getByRole('combobox').press('ArrowDown')
  await page.getByRole('combobox').press('Enter')
  await expect(
    page.getByRole('heading', { name: 'Curitiba, BR' }),
  ).toBeVisible()
  await expect(
    page.getByRole('region', { name: 'Condições atuais' }),
  ).toBeVisible()
  await page.getByRole('button', { name: 'Salvar local' }).click()
  await page.getByRole('button', { name: '°F', exact: true }).click()
  await page.reload()
  await expect(
    page.getByRole('heading', { name: 'Curitiba, BR' }),
  ).toBeVisible()
  await expect(
    page.getByRole('button', { name: '°F', exact: true }),
  ).toHaveAttribute('aria-pressed', 'true')
  await expect(page.getByRole('button', { name: 'Local salvo' })).toBeVisible()
  await page.getByRole('button', { name: /Favoritos/ }).click()
  await expect(
    page.getByRole('heading', { name: 'Curitiba', exact: true }),
  ).toBeVisible()
  expect(errors).toEqual([])
})

test('mobile layout, selected day, rain chart and dark mode', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('./')
  await expect(
    page.getByRole('region', { name: 'Condições atuais' }),
  ).toBeVisible()
  await expect(page.getByRole('button', { name: /^Amanhã,/ })).toBeVisible()
  await page.getByRole('button', { name: /^Amanhã,/ }).click()
  await expect(page.getByRole('button', { name: /^Amanhã,/ })).toHaveAttribute(
    'aria-pressed',
    'true',
  )
  await page.getByRole('button', { name: 'Chuva', exact: true }).click()
  await expect(
    page.getByText('Chuva acumulada na hora anterior (mm)'),
  ).toBeVisible()
  const width = await page.evaluate(() => ({
    content: document.documentElement.scrollWidth,
    viewport: innerWidth,
  }))
  expect(width.content).toBeLessThanOrEqual(width.viewport)
  await page.screenshot({
    path: 'test-results/dashboard-mobile.png',
    fullPage: true,
  })
  await page.getByRole('button', { name: 'Modo escuro' }).click()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  const accessibility = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa'])
    .analyze()
  expect(
    accessibility.violations.map((issue) => ({
      id: issue.id,
      nodes: issue.nodes.map((node) => node.target),
    })),
  ).toEqual([])
  await page.screenshot({
    path: 'test-results/dashboard-dark.png',
    fullPage: true,
  })
})

test('failed request can be retried without sample data appearing', async ({
  page,
}) => {
  let recovering = false
  await page.route('https://api.open-meteo.com/**', (route) => {
    return route.fulfill(
      !recovering
        ? { status: 503, body: 'Unavailable' }
        : {
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(makeApiForecast()),
          },
    )
  })
  await page.goto('./')
  await expect(page.getByRole('alert')).toContainText(
    'Não foi possível consultar',
  )
  await expect(
    page.getByRole('region', { name: 'Condições atuais' }),
  ).toHaveCount(0)
  recovering = true
  await page.getByRole('button', { name: 'Tentar novamente' }).click()
  await expect(
    page.getByRole('region', { name: 'Condições atuais' }),
  ).toBeVisible()
})

test('brand assets load consistently and the layout fits small and intermediate screens', async ({
  page,
}) => {
  await page.route('https://api.open-meteo.com/**', (route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(makeApiForecast()),
    }),
  )
  await page.goto('./')
  await expect(
    page.getByRole('region', { name: 'Condições atuais' }),
  ).toBeVisible()
  const favicon = await page.locator('link[rel="icon"]').getAttribute('href')
  await expect(page.locator('.brand .brand-mark')).toHaveAttribute(
    'src',
    favicon!,
  )
  const asset = await page.request.get(favicon!)
  expect(asset.status()).toBe(200)
  expect(asset.headers()['content-type']).toContain('image/svg+xml')
  for (const width of [320, 768, 1280]) {
    await page.setViewportSize({ width, height: 1000 })
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(width)
  }
  const iconUrl = new URL(favicon!, page.url()).href
  await page.setContent(
    `<html><body style="margin:0;background:#eaf5f9;font:16px sans-serif"><section id="study" style="display:flex;width:600px;padding:32px;gap:24px">${['#eaf5f9', '#102f43'].map((background) => `<div style="background:${background};padding:24px;display:flex;align-items:center;gap:24px;border-radius:12px">${[16, 32, 64].map((size) => `<img src="${iconUrl}" width="${size}" height="${size}" alt="Horizonte ${size}px">`).join('')}</div>`).join('')}</section></body></html>`,
  )
  await expect(
    page.getByRole('img', { name: 'Horizonte 64px' }).first(),
  ).toBeVisible()
  await page
    .locator('#study img')
    .evaluateAll((images) =>
      Promise.all(images.map((image) => (image as HTMLImageElement).decode())),
    )
  await page
    .locator('#study')
    .screenshot({ path: 'test-results/brand-study.png' })
})
