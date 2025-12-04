import { test, expect } from '@playwright/test';

test.describe('Static Pages', () => {
  test('should load all static pages', async ({ page }) => {
    // Test About
    await page.goto('/about');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/.*about/);
    await expect(page.locator('body')).toBeVisible();

    // Test Help
    await page.goto('/help');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/.*help/);
    await expect(page.locator('body')).toBeVisible();

    // Test Terms
    await page.goto('/terms');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/.*terms/);
    await expect(page.locator('body')).toBeVisible();

    // Test Policies
    await page.goto('/policies');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/.*policies/);
    await expect(page.locator('body')).toBeVisible();
  });
});

test.describe('Orders Page', () => {
  test('should handle orders page with auth', async ({ page }) => {
    await page.goto('/orders');
    await page.waitForTimeout(2000);

    // Either shows orders page or redirects to login
    const currentURL = page.url();
    expect(currentURL.includes('/orders') || currentURL.includes('/login')).toBeTruthy();
  });
});

test.describe('Preview Page', () => {
  test('should handle preview page', async ({ page }) => {
    await page.goto('/preview');
    await page.waitForLoadState('networkidle');

    // Preview page might redirect to create
    const url = page.url();
    expect(url.includes('/preview') || url.includes('/create')).toBeTruthy();
    await expect(page.locator('body')).toBeVisible();
  });
});
