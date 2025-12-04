# E2E Testing with Playwright

This project uses [Playwright](https://playwright.dev/) for end-to-end testing.

## Overview

Playwright is a modern E2E testing framework that provides:

- ✅ Cross-browser testing (Chromium, Firefox, WebKit)
- ✅ Mobile viewport testing
- ✅ Auto-waiting for elements
- ✅ Network interception
- ✅ Screenshots and videos on failure
- ✅ Parallel test execution
- ✅ Test recording and debugging tools

## Test Structure

```
e2e/
├── homepage.spec.ts      # Homepage tests (hero, testimonials, navigation)
├── create.spec.ts        # Book creation and character customization
├── cart.spec.ts          # Shopping cart functionality
├── auth.spec.ts          # Login, register, account pages
└── pages.spec.ts         # Static pages (about, help, terms, policies)
```

## Running Tests

### Local Development

```bash
# Run all E2E tests
pnpm test:e2e

# Run tests with UI mode (interactive)
pnpm test:e2e:ui

# Run tests in headed mode (see browser)
pnpm test:e2e:headed

# Debug specific test
pnpm test:e2e:debug

# Show test report
pnpm test:e2e:report

# Generate test code using codegen
pnpm test:e2e:codegen
```

### Run Specific Tests

```bash
# Run single test file
pnpm test:e2e homepage.spec.ts

# Run tests matching pattern
pnpm test:e2e -g "should load"

# Run specific browser
pnpm test:e2e --project=chromium
pnpm test:e2e --project=webkit
pnpm test:e2e --project=firefox

# Run mobile tests only
pnpm test:e2e --project="Mobile Chrome"
```

## Configuration

Configuration is in `playwright.config.ts`:

- **Test directory**: `./e2e`
- **Timeout**: 30 seconds per test
- **Retries**: 2 retries on CI, 0 locally
- **Browsers**: Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari
- **Base URL**: `http://localhost:3000`
- **Screenshots**: On failure only
- **Videos**: Retained on failure

## Writing Tests

### Basic Test Structure

```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/path');
  });

  test('should do something', async ({ page }) => {
    // Your test code
    await expect(page.locator('h1')).toBeVisible();
  });
});
```

### Common Patterns

#### Navigation

```typescript
await page.goto('/');
await page.click('a[href="/about"]');
await expect(page).toHaveURL(/.*about/);
```

#### Form Interaction

```typescript
await page.fill('input[name="email"]', 'test@example.com');
await page.fill('input[type="password"]', 'password123');
await page.click('button[type="submit"]');
```

#### Waiting for Elements

```typescript
await page.waitForSelector('.my-element');
await page.waitForLoadState('networkidle');
await page.waitForTimeout(1000);
```

#### Assertions

```typescript
await expect(page.locator('h1')).toBeVisible();
await expect(page.locator('h1')).toContainText('Welcome');
await expect(page).toHaveURL(/.*dashboard/);
await expect(page.locator('button')).toBeEnabled();
```

### Mobile Testing

```typescript
test.describe('Mobile Tests', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('should work on mobile', async ({ page }) => {
    // Test code
  });
});
```

### Authentication

```typescript
test('should access protected page', async ({ page, context }) => {
  // Set auth cookie
  await context.addCookies([
    {
      name: 'auth_token',
      value: 'your_token',
      domain: 'localhost',
      path: '/',
    },
  ]);

  await page.goto('/account');
});
```

## CI/CD Integration

Tests run automatically on:

- Every push to any branch
- Every pull request

CI configuration in `.github/workflows/ci.yml`:

1. Install dependencies
2. Install Playwright browsers
3. Run unit tests
4. Build application
5. Run E2E tests
6. Upload test report as artifact

### Viewing CI Test Reports

1. Go to GitHub Actions tab
2. Click on the workflow run
3. Download `playwright-report` artifact
4. Extract and open `index.html`

Or view inline in GitHub Actions summary.

## Debugging

### Debug Mode

```bash
# Run single test in debug mode
pnpm test:e2e:debug homepage.spec.ts
```

This opens Playwright Inspector where you can:

- Step through tests
- Inspect element selectors
- View console logs
- See network requests

### UI Mode

```bash
pnpm test:e2e:ui
```

Interactive mode with:

- Visual test runner
- Time travel debugging
- Watch mode
- Test filtering

### Screenshots & Videos

On test failure, Playwright automatically captures:

- Screenshot: `test-results/*/test-failed.png`
- Video: `test-results/*/video.webm`
- Trace: `test-results/*/trace.zip`

View trace:

```bash
npx playwright show-trace test-results/*/trace.zip
```

## Best Practices

### 1. Use Data Test IDs

```typescript
// Good
await page.locator('[data-testid="submit-button"]').click();

// Avoid brittle selectors
await page.locator('div > div > button:nth-child(3)').click();
```

### 2. Wait for Elements Properly

```typescript
// Good - Playwright auto-waits
await page.click('button');

// Unnecessary - but sometimes needed
await page.waitForSelector('button');
await page.click('button');
```

### 3. Isolate Tests

```typescript
// Each test should be independent
test.beforeEach(async ({ page }) => {
  // Reset state
  await page.goto('/');
});
```

### 4. Use Descriptive Names

```typescript
// Good
test('should display error message when email is invalid', ...)

// Bad
test('test 1', ...)
```

### 5. Group Related Tests

```typescript
test.describe('User Authentication', () => {
  test.describe('Login', () => {
    test('should login successfully', ...);
    test('should show error on invalid credentials', ...);
  });

  test.describe('Register', () => {
    test('should register new user', ...);
  });
});
```

## Troubleshooting

### Tests Timing Out

- Increase timeout in `playwright.config.ts`
- Check if dev server is running
- Use `page.waitForLoadState('networkidle')`

### Element Not Found

- Use Playwright Inspector to find correct selector
- Check if element is visible: `await expect(element).toBeVisible()`
- Add explicit wait: `await page.waitForSelector('.my-element')`

### Flaky Tests

- Avoid `waitForTimeout()` - use proper waits
- Check for race conditions
- Use `test.describe.serial()` if tests must run in order

### CI Failures

- Check uploaded artifacts for screenshots/videos
- Run tests with same configuration locally
- Ensure `CI=true` environment variable is set

## Resources

- [Playwright Documentation](https://playwright.dev/)
- [API Reference](https://playwright.dev/docs/api/class-playwright)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [Selectors Guide](https://playwright.dev/docs/selectors)
- [Debugging Guide](https://playwright.dev/docs/debug)

## Migration from Jest

This project migrated from Jest to Playwright for E2E tests:

**Why Playwright?**

- Better browser automation
- More reliable and less flaky
- Built-in auto-waiting
- Better debugging tools
- Simpler configuration
- Official support for Next.js

**What Changed:**

- ❌ Removed `__tests__/e2e/` Jest tests
- ❌ Removed `__tests__/setup.ts` and `__tests__/test-utils.ts`
- ✅ Added `e2e/` Playwright tests
- ✅ Added `playwright.config.ts`
- ✅ Updated CI/CD workflow
- ✅ Updated package.json scripts

Jest is still used for unit tests (`components/atoms/*.test.js`).
