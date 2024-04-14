import { test } from '@playwright/test'

test.describe('gaki no tsukai routes', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/gaki')
  })

  test('navigation', async ({ page }) => {
    // Click on the "episodes" link
    await page.click('text="Episodes"')

    // Assert that the current URL is "/gaki/episodes"
    await page.waitForURL('/gaki/episodes')

    // Go back to the main page
    await page.goBack()

    // Click on the "series" link
    await page.click('text="Series"')

    // Assert that the current URL is "/gaki/series"
    await page.waitForURL('/gaki/series')
  })
})
