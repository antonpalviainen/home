import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/gaki/episodes')
})

test.describe('pagination', () => {
  test('is rendered', async ({ page }) => {
    await expect(page.locator('.inline-flex').first()).toBeVisible()
  })

  test('is working', async ({ page }) => {
    await page.locator('.inline-flex > a').first().click()
    await expect(page).toHaveURL('http://localhost:3000/gaki/episodes?page=2')
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
  test('is working', async ({ page }) => {
    await page.getByRole('link', { name: 'EN' }).click()
    await expect(page).toHaveURL('http://localhost:3000/gaki/episodes?lang=en')
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
  test('is working', async ({ page }) => {
    await page.getByRole('link', { name: 'JA' }).click()
    await expect(page).toHaveURL('http://localhost:3000/gaki/episodes?lang=ja')
  })

  test('episode titles are in Japanese', async ({ page }) => {
    await page.getByRole('link', { name: 'JA' }).click()

    await expect(page.getByRole('rowgroup')).toContainText('1')
    await expect(page.getByRole('rowgroup')).toContainText(
      '偉いさん・医者・クイズ'
    )
    await expect(page.getByRole('rowgroup')).toContainText('1989-10-03')
  })
})

//   // Navigate to the second page
//   await page.locator('.inline-flex > a').first().click()
//   await expect(page).toHaveURL(
//     'http://localhost:3000/gaki/episodes?lang=en&page=2'
//   )

//   // 101th episode
//   await expect(page.getByRole('rowgroup')).toContainText('101')
//   await expect(page.getByRole('rowgroup')).toContainText('1991-10-20')

//   // Change language to Japanese
//   await page.getByRole('link', { name: 'JA' }).click()

//   // 101th episode with Japanese title
//   await expect(page.getByRole('rowgroup')).toContainText('101')
//   await expect(page.getByRole('rowgroup')).toContainText(
//     '商店街まるごと間違い探し!!'
//   )
//   await expect(page.getByRole('rowgroup')).toContainText('1991-10-20')

//   // Navigate to the first page
//   await page.locator('.inline-flex > a').first().click()

//   // First episode with Japanese title
//   await expect(page.getByRole('rowgroup')).toContainText('1')
//   await expect(page.getByRole('rowgroup')).toContainText(
//     '偉いさん・医者・クイズ'
//   )
//   await expect(page.getByRole('rowgroup')).toContainText('1989-10-03')
// })
