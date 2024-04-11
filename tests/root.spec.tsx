import { test, expect } from '@playwright/test'

test.describe('gaki no tsukai routes', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/en/gaki-no-tsukai')
  })

  test('navigation', async ({ page }) => {
    // Click on the "episodes" link
    await page.click('text="Episodes"')

    // Assert that the current URL is "/en/gaki-no-tsukai/episodes"
    await page.waitForURL('/en/gaki-no-tsukai/episodes')

    // Go back to the main page
    await page.goBack()

    // Click on the "series" link
    await page.click('text="Series"')

    // Assert that the current URL is "/en/gaki-no-tsukai/series"
    await page.waitForURL('/en/gaki-no-tsukai/series')

    // Click on the "home" link
    await page.click('text="Home"')

    // Assert that the current URL is "/en/gaki-no-tsukai"
    await page.waitForURL('/en/gaki-no-tsukai')
  })

  test('localization', async ({ page }) => {
    // Assert that the page is in English
    await expect(page.getByText('Home')).toBeVisible()
    await expect(page.getByText('Episodes')).toBeVisible()
    await expect(page.getByText('Series')).toBeVisible()

    // Change the language to Japanese
    await page.click('text="JA"')

    // Assert that the current URL is "/ja/gaki-no-tsukai"
    await page.waitForURL('/ja/gaki-no-tsukai')

    // Assert that the page is in Japanese
    await expect(page.getByText('ホーム')).toBeVisible()
    await expect(page.getByText('エピソード')).toBeVisible()
    await expect(page.getByText('シリーズ')).toBeVisible()
  })
})
