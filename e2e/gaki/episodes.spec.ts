import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/gaki/episodes')
})

test.describe('pagination', () => {
  test('is rendered', async ({ page }) => {
    await expect(page.locator('.inline-flex').first()).toBeVisible()
  })

  test('changes the page', async ({ page }) => {
    await page.locator('.inline-flex > a').first().click()
    await expect(page).toHaveURL('/gaki/episodes?page=2')
    await expect(page.getByRole('rowgroup')).toContainText('101');
  })
})

test.describe('episode table', () => {
  test('is rendered', async ({ page }) => {
    await expect(page.locator('table')).toBeVisible()
  })

  test('contains the first episode', async ({ page }) => {
    await expect(page.getByRole('rowgroup')).toContainText('1')
    await expect(page.getByRole('rowgroup')).toContainText(
      'Big Shot / Doctor / Quiz'
    )
    await expect(page.getByRole('rowgroup')).toContainText('1989-10-03')
  })
})

test.describe('english toggle', () => {
  test('changes the query', async ({ page }) => {
    await page.getByRole('link', { name: 'EN' }).click()
    await expect(page).toHaveURL('/gaki/episodes?lang=en')
  })

  test('episode titles are in english', async ({ page }) => {
    await expect(page.getByRole('rowgroup')).toContainText('1')
    await expect(page.getByRole('rowgroup')).toContainText(
      'Big Shot / Doctor / Quiz'
    )
    await expect(page.getByRole('rowgroup')).toContainText('1989-10-03')
  })
})

test.describe('japanese toggle', () => {
  test('changes the query', async ({ page }) => {
    await page.getByRole('link', { name: 'JA' }).click()
    await expect(page).toHaveURL('/gaki/episodes?lang=ja')
  })

  test('episode titles are in japanese', async ({ page }) => {
    await page.getByRole('link', { name: 'JA' }).click()

    await expect(page.getByRole('rowgroup')).toContainText('1')
    await expect(page.getByRole('rowgroup')).toContainText(
      '偉いさん・医者・クイズ'
    )
    await expect(page.getByRole('rowgroup')).toContainText('1989-10-03')
  })
})

test.describe('search', () => {
  test('filters episodes by a query in english', async ({ page }) => {
    await page.goto('/gaki/episodes?lang=en')
    await page
      .getByPlaceholder('Search episodes')
      .fill('The 5th Heipo Shallowness Trial')
    await page.waitForURL(
      '/gaki/episodes?lang=en&page=1&query=The+5th+Heipo+Shallowness+Trial'
    )
    await expect(page.getByRole('row')).toContainText('769')
  })

  test('filters episodes by a query in japanese', async ({ page }) => {
    await page.goto('/gaki/episodes?lang=ja')
    await page
      .getByPlaceholder('Search episodes')
      .fill('第5回 ヘイポーうすっぺら裁判')
    await page.waitForURL(
      '/gaki/episodes?lang=ja&page=1&query=第5回+ヘイポーうすっぺら裁判'
    )
    await expect(page.getByRole('row')).toContainText('769')
  })
})
