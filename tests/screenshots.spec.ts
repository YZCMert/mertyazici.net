import { test } from '@playwright/test'

const routes = [
  { name: 'home', path: '/' },
  { name: 'about', path: '/hakkimda' },
  { name: 'services', path: '/hizmetler' },
  { name: 'work', path: '/calismalar' },
  { name: 'project-detail', path: '/calismalar/real-estate-crm' },
  { name: 'contact', path: '/iletisim' },
]

const widths = [1440, 768, 375]

for (const route of routes) {
  for (const width of widths) {
    test(`baseline ${route.name} at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 })
      await page.goto(route.path, { waitUntil: 'networkidle' })
      // Loading screen bypass
      await page.evaluate(() => sessionStorage.setItem('visited', '1'))
      await page.goto(route.path, { waitUntil: 'networkidle' })
      await page.waitForTimeout(2000)
      await page.screenshot({
        path: `screenshots/baseline/${route.name}-${width}.png`,
        fullPage: true,
      })
    })
  }
}

for (const route of routes) {
  for (const width of widths) {
    test(`after ${route.name} at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 })
      await page.goto(route.path, { waitUntil: 'networkidle' })
      await page.evaluate(() => sessionStorage.setItem('visited', '1'))
      await page.goto(route.path, { waitUntil: 'networkidle' })
      await page.waitForTimeout(2000)
      await page.screenshot({
        path: `screenshots/after/${route.name}-${width}.png`,
        fullPage: true,
      })
    })
  }
}
