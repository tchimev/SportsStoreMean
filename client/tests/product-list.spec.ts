import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:4200/');
});

test('has header', async ({ page }) => {
  const loc = page.getByRole('heading');

  await expect(loc).toHaveText('List of Products');
});

test('new product button is enabled', async ({ page }) => {
  const loc = page.getByRole('button', { name: 'Add a New Product' });

  await expect(loc).toBeEnabled();
});

test('can open new product page', async ({ page }) => {
  await page.getByRole('button', { name: 'Add a New Product' }).click();

  const loc = page.getByRole('heading');

  await expect(loc).toHaveText('Add a New Product');
});

test('can open edit product page', async ({ page }) => {
  const edits = page.getByRole('button', { name: 'Edit' });
  if ((await edits.count()) > 0) {
    await edits.last().click();

    const loc = page.getByRole('heading');

    await expect(loc).toHaveText('Edit Product');
  }
});

test('can delete product', async ({ page }) => {
  const deletes = page.getByRole('button', { name: 'Delete' });
  const total = await deletes.count();
  if (total > 0) {
    await deletes.last().click();

    await page.waitForLoadState('networkidle');
    const newTotal = await page.getByRole('button', { name: 'Delete' }).count();

    expect(total).toBeGreaterThan(newTotal);
  }
});
