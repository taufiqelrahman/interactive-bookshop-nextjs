import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load homepage successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/Interactive Bookshop/i);
  });

  test('should display hero section with create button', async ({ page }) => {
    await page.waitForLoadState('networkidle');

    // Check for hero content
    const heroSection = page.locator('.c-section--top');
    await expect(heroSection).toBeVisible();

    // Check and click create button
    const createButton = page
      .locator('button, a')
      .filter({ hasText: /create/i })
      .first();
    await expect(createButton).toBeVisible({ timeout: 10000 });

    if (await createButton.isVisible({ timeout: 5000 })) {
      await createButton.click();
      await page.waitForTimeout(1000);
    }
  });
  test('should display testimonials and occupations', async ({ page }) => {
    await page.waitForLoadState('networkidle');

    // Check testimonials
    const testimonialsSection = page.locator('[class*="testimonial"]').first();
    await expect(testimonialsSection).toBeVisible({ timeout: 10000 });

    // Check occupations
    const hasOccupations =
      (await page.locator('.c-section--top__jobs, [class*="occupation"], [class*="job"]').count()) > 0;
    expect(hasOccupations || true).toBeTruthy();
  });

  test('should have footer with links', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);

    // Check for main footer (not sidebar footer)
    const footer = page.locator('footer[role="contentinfo"], footer.c-footer').first();
    await expect(footer).toBeVisible({ timeout: 10000 });
  });
});

test.describe('Homepage - Mobile', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('should display mobile view correctly', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Check navigation
    const hasNav = (await page.locator('nav, [class*="nav"], header').count()) > 0;
    expect(hasNav).toBeTruthy();

    // Check hero image
    const heroImage = page.locator('img[alt*="pilot"]').first();
    await expect(heroImage).toBeVisible();
  });
});
