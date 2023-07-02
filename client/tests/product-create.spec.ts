import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:4200/products/new');
});

test('create new product', async ({ page }) => {
  await page
    .locator('div')
    .filter({ hasText: 'Name Name is required' })
    .getByRole('textbox')
    .click();
  await page
    .locator('div')
    .filter({ hasText: 'Name Name is required' })
    .getByRole('textbox')
    .fill('test');
  await page
    .locator('div')
    .filter({ hasText: 'Category' })
    .getByRole('textbox')
    .click();
  await page
    .locator('div')
    .filter({ hasText: 'Category' })
    .getByRole('textbox')
    .fill('test');
  await page.getByRole('combobox').selectOption('1: soccer town');
  await page.locator('textarea').click();
  await page.locator('textarea').fill('test');
  await page.getByRole('spinbutton').click();
  await page.getByRole('spinbutton').fill('12');
  await page.getByRole('button', { name: 'Save' }).click();
  await page.waitForLoadState('networkidle');

  await expect(page.getByText('List of Products')).toBeVisible();
});

test('cancel new product', async ({ page }) => {
  await page.getByText('Name is required').isVisible();
  await page.getByText('Supplier is required').isVisible();

  await page.getByRole('button', { name: 'Cancel' }).click();

  await page.waitForLoadState('networkidle');

  await expect(page.getByText('List of Products')).toBeVisible();
});
