import { test } from '@playwright/test'

test.describe('gaki no tsukai episodes route', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/gaki/episodes')
  })
  
})
