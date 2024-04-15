import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/gaki/series')
})

test.describe('episode list', () => {
  test('is rendered', async ({ page }) => {
    await expect(page.locator('ul')).toBeVisible()
  })

  test('contains series', async ({ page }) => {
    await expect(
      page.getByRole('link', { name: 'Batsu Game 22' })
    ).toBeVisible()
  })
})

test.describe('english toggle', () => {
  test.beforeEach(async ({ page }) => {
    await page.getByRole('link', { name: 'EN', exact: true }).click()
  })

  test('is working', async ({ page }) => {
    await expect(page).toHaveURL('http://localhost:3000/gaki/series?lang=en')
  })

  test('series names are in english', async ({ page }) => {
    await expect(page.getByRole('list')).toContainText('Batsu Game')
  })
})

test.describe('japanese toggle', () => {
  test.beforeEach(async ({ page }) => {
    await page.getByRole('link', { name: 'JA', exact: true }).click()
  })

  test('is working', async ({ page }) => {
    await expect(page).toHaveURL('http://localhost:3000/gaki/series?lang=ja')
  })

  test('series names are in Japanese', async ({ page }) => {
    await expect(page.getByRole('list')).toContainText('罰ゲーム')
  })
})