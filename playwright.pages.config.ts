import { defineConfig } from '@playwright/test'
import config from './playwright.config'

const baseURL = 'http://127.0.0.1:4180/weather-lab/'

export default defineConfig({
  ...config,
  use: { ...config.use, baseURL },
  webServer: {
    command: 'npm run preview -- --base=/weather-lab/ --port 4180 --strictPort',
    url: baseURL,
    reuseExistingServer: !process.env.CI,
  },
})
