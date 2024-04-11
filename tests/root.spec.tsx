import { test, expect } from '@playwright/test'

test('Route navigation', async ({ page }) => {
  // Go to the page
  await page.goto('http://localhost:3000')

  // Click on the "episodes" link
  await page.click('text="episodes"')

  // Wait for the page to navigate
  await page.waitForNavigation()

  // Assert that the current URL is "/gaki-no-tsukai/episodes"
  expect(page.url()).toBe('http://localhost:3000/gaki-no-tsukai/episodes')

  // Go back to the main page
  await page.goBack()

  // Click on the "series" link
  await page.click('text="series"')

  // Wait for the page to navigate
  await page.waitForNavigation()

  // Assert that the current URL is "/gaki-no-tsukai/series"
  expect(page.url()).toBe('http://localhost:3000/gaki-no-tsukai/series')
})
