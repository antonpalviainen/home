import { test } from '@playwright/test'

test.describe('gaki no tsukai series route', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/gaki/series')
  })
})
