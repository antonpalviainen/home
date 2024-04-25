import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/anime/create')
})

test('should create a new anime', async ({ page }) => {
  await page.getByLabel('Title*').fill('test title completed')
  await page.getByLabel('Status').selectOption('completed')
  await page.getByLabel('Rating').selectOption('8')
  await page.getByLabel('Episodes').fill('12')
  await page.getByLabel('Runtime*').fill('25')
  await page.getByLabel('Season').selectOption('summer')
  await page
    .locator('div')
    .filter({ hasText: /^Finish dates$/ })
    .getByRole('button')
    .click()
  await page.getByLabel('Finish dates').fill('2024-04-01')
  await page.getByPlaceholder('Search or add new').fill('kyo')
  await page.getByRole('button', { name: 'Kyoto Animation' }).click()
  await page.getByRole('button', { name: 'Create' }).click()

  await expect(page).toHaveURL('/anime')
  await expect(page.locator('tbody')).toContainText(/test title completed/)
})
