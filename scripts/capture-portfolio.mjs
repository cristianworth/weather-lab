import { chromium } from '@playwright/test'
import { mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

const target = process.env.WEATHER_LAB_URL || 'http://127.0.0.1:4178/'
const directory = fileURLToPath(new URL('../docs/images/', import.meta.url))
await mkdir(directory, { recursive: true })
const browser = await chromium.launch({
  channel: process.env.PLAYWRIGHT_CHANNEL || 'msedge',
})

try {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1100 },
  })
  await page.goto(target)
  await page.getByRole('region', { name: 'Condições atuais' }).waitFor()
  await page.evaluate(() => document.fonts.ready)
  await page.screenshot({ path: `${directory}/desktop.png`, fullPage: true })
  await page.setViewportSize({ width: 390, height: 844 })
  await page.screenshot({ path: `${directory}/mobile.png`, fullPage: true })
  await page.getByRole('button', { name: 'Modo escuro' }).click()
  await page.screenshot({ path: `${directory}/dark-mode.png`, fullPage: true })

  const favicon = await page.locator('link[rel="icon"]').getAttribute('href')
  const iconUrl = new URL(favicon, page.url()).href
  await page.setViewportSize({ width: 700, height: 220 })
  await page.setContent(
    `<html><body style="margin:0;background:#eaf5f9"><section id="study" style="display:flex;width:600px;padding:32px;gap:24px">${['#eaf5f9', '#102f43'].map((background) => `<div style="background:${background};padding:24px;display:flex;align-items:center;gap:24px;border-radius:12px">${[16, 32, 64].map((size) => `<img src="${iconUrl}" width="${size}" height="${size}" alt="Horizonte ${size}px">`).join('')}</div>`).join('')}</section></body></html>`,
  )
  await page
    .locator('#study img')
    .evaluateAll((images) => Promise.all(images.map((image) => image.decode())))
  await page
    .locator('#study')
    .screenshot({ path: `${directory}/brand-mark.png` })
  console.log(`Portfolio images saved to ${directory}`)
} finally {
  await browser.close()
}
