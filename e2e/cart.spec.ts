import { test, expect } from '@playwright/test';

test.describe('Cart Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/cart');
  });

  test('should load cart page successfully', async ({ page }) => {
    await expect(page).toHaveURL(/.*cart/);
  });

  test('should display cart page with header and navigation', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    await expect(page.locator('body')).toBeVisible();

    // Check cart items
    const cartItems = page.locator('[class*="cart-item"]');
    const itemCount = await cartItems.count();

    if (itemCount === 0) {
      const emptyMessage = page.getByText(/empty|kosong/i);
      await expect(emptyMessage).toBeVisible({ timeout: 5000 });
    }

    // Check heading
    const hasHeading = (await page.locator('h1, h2, h3, [class*="title"], [class*="header"]').count()) > 0;
    expect(hasHeading).toBeTruthy();

    // Check navigation
    const hasHomeLink = (await page.locator('a[href="/"], a[href="/home"], nav').count()) > 0;
    expect(hasHomeLink).toBeTruthy();
  });
});

test.describe('Cart - With Items', () => {
  test('should handle cart items and checkout', async ({ page }) => {
    await page.goto('/cart');
    await page.waitForLoadState('networkidle');

    const cartItems = page.locator('[class*="cart-item"]');
    const itemCount = await cartItems.count();

    if (itemCount > 0) {
      // Check total
      const totalElement = page.locator('[class*="total"]').first();
      await expect(totalElement).toBeVisible();

      // Check checkout button
      const checkoutButton = page.getByRole('button', { name: /checkout|bayar/i });
      await expect(checkoutButton).toBeVisible({ timeout: 5000 });
    }
  });
});
