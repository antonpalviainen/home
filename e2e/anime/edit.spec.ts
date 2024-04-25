import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/anime/create')
  await page.getByLabel('Title*').fill('edit test')
  await page.getByLabel('Runtime*').fill('120')
  await page.getByLabel('Type').selectOption('movie')
  await page.getByLabel('Season').selectOption('fall')
  await page.getByLabel('Year*').fill('2020')
  await page.getByPlaceholder('Search or add new').fill('sha')
  await page.getByRole('button', { name: 'Shaft' }).click()
  await page.getByRole('button', { name: 'Create' }).click()
  await page.waitForURL('/anime', {waitUntil: 'domcontentloaded'})
  // await expect(page).toHaveURL('/anime')
})

test('should edit anime', async ({ page }) => {
  await page
    .getByRole('cell', { name: /edit test/ })
    .getByRole('link')
    .click()
  await page.getByLabel('Title*').fill('edit test completed')
  await page.getByLabel('Status').selectOption('completed')
  await page.getByLabel('Rating').selectOption('9')
  await page.getByLabel('Episodes').fill('10')
  await page.getByLabel('Runtime*').fill('25')
  await page.getByLabel('Type').selectOption('tv')
  await page
    .locator('div')
    .filter({ hasText: /^Finish dates$/ })
    .getByRole('button')
    .click()
  await page.getByRole('button', { name: 'Save' }).click()
})
