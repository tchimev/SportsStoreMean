import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:4200/products/new');
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
  await page.getByRole('combobox').selectOption('0: splash dudes');
  await page.locator('textarea').click();
  await page.locator('textarea').fill('test');
  await page.getByRole('spinbutton').click();
  await page.getByRole('spinbutton').fill('10');
  await page.getByRole('button', { name: 'Save' }).click();
  await page.waitForLoadState('networkidle');

  await page.getByRole('button', { name: 'Edit' }).last().click();
});

test('cancel edit product', async ({ page }) => {
  await page.getByRole('button', { name: 'Cancel' }).click();

  await page.waitForLoadState('networkidle');

  await expect(page.getByText('List of Products')).toBeVisible();
});

test('Name is required field', async ({ page }) => {
  await page
    .locator('div')
    .filter({ hasText: 'Name' })
    .getByRole('textbox')
    .clear();

  await expect(
    page
      .locator('div')
      .filter({ hasText: 'Name Name is required' })
      .getByRole('textbox')
  ).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Save' })
  ).toBeDisabled();
});

test('save edited product', async ({ page }) => {
  await page
    .locator('div')
    .filter({ hasText: 'Name' })
    .getByRole('textbox')
    .click();
  await page
    .locator('div')
    .filter({ hasText: 'Name' })
    .getByRole('textbox')
    .fill('test1');
  await page
    .locator('div')
    .filter({ hasText: 'Category' })
    .getByRole('textbox')
    .click();
  await page
    .locator('div')
    .filter({ hasText: 'Category' })
    .getByRole('textbox')
    .fill('test1');
  await page.getByRole('combobox').selectOption('1: soccer town');
  await page.locator('textarea').click();
  await page.locator('textarea').fill('test1');
  await page.getByRole('spinbutton').click();
  await page.getByRole('spinbutton').fill('11');

  await page.getByRole('button', { name: 'Save' }).click();

  await page.waitForLoadState('networkidle');

  await expect(page.getByText('List of Products')).toBeVisible();
});
