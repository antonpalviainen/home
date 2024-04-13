import { test } from '@playwright/test'

test.describe('gaki no tsukai routes', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/gaki-no-tsukai')
  })

  test('navigation', async ({ page }) => {
    // Click on the "episodes" link
    await page.click('text="Episodes"')

    // Assert that the current URL is "/gaki-no-tsukai/episodes"
    await page.waitForURL('/gaki-no-tsukai/episodes')

    // Go back to the main page
    await page.goBack()

    // Click on the "series" link
    await page.click('text="Series"')

    // Assert that the current URL is "/gaki-no-tsukai/series"
    await page.waitForURL('/gaki-no-tsukai/series')

    // Click on the "home" link
    await page.click('text="Home"')

    // Assert that the current URL is "/gaki-no-tsukai"
    await page.waitForURL('/gaki-no-tsukai')
  })
})
