# E2E Testing Quick Reference

## Quick Commands

```bash
# Run all tests
pnpm test:e2e

# Interactive UI mode
pnpm test:e2e:ui

# Watch browser (headed mode)
pnpm test:e2e:headed

# Debug mode with Playwright Inspector
pnpm test:e2e:debug

# View HTML report
pnpm test:e2e:report

# Generate test code
pnpm test:e2e:codegen
```

## Run Specific Tests

```bash
# Single file
pnpm test:e2e homepage.spec.ts

# By test name pattern
pnpm test:e2e -g "should load"

# Specific browser
pnpm test:e2e --project=chromium
pnpm test:e2e --project=firefox
pnpm test:e2e --project=webkit

# Mobile
pnpm test:e2e --project="Mobile Chrome"
```

## Test Files

| File               | Coverage                                             |
| ------------------ | ---------------------------------------------------- |
| `homepage.spec.ts` | Homepage hero, testimonials, navigation, mobile view |
| `create.spec.ts`   | Character customization, book creation flow          |
| `cart.spec.ts`     | Shopping cart, add items, checkout                   |
| `auth.spec.ts`     | Login, register, account pages                       |
| `pages.spec.ts`    | About, help, terms, policies, orders, preview        |

## Configuration

- **Config file**: `playwright.config.ts`
- **Base URL**: `http://localhost:3000`
- **Timeout**: 30s per test
- **Retries**: 2 on CI, 0 locally
- **Browsers**: Chromium, Firefox, WebKit + Mobile
- **Reports**: `playwright-report/`
- **Videos/Screenshots**: `test-results/`

## Common Patterns

### Navigation

```typescript
await page.goto('/create');
await expect(page).toHaveURL(/.*create/);
```

### Find Elements

```typescript
// By role
page.getByRole('button', { name: /submit/i });

// By text
page.getByText('Welcome');

// By selector
page.locator('.my-class');
page.locator('input[name="email"]');

// By test ID
page.locator('[data-testid="submit-btn"]');
```

### Interactions

```typescript
await page.fill('input[name="email"]', 'user@example.com');
await page.click('button[type="submit"]');
await page.selectOption('select', 'option-value');
await page.check('input[type="checkbox"]');
```

### Assertions

```typescript
await expect(page.locator('h1')).toBeVisible();
await expect(page.locator('h1')).toContainText('Title');
await expect(page).toHaveURL(/dashboard/);
await expect(page.locator('button')).toBeEnabled();
```

### Waiting

```typescript
await page.waitForSelector('.element');
await page.waitForLoadState('networkidle');
await page.waitForURL(/.*success/);
```

## Debugging Tips

1. **Use UI Mode**: `pnpm test:e2e:ui` - Best for debugging
2. **Headed Mode**: `pnpm test:e2e:headed` - See browser
3. **Debug Mode**: `pnpm test:e2e:debug` - Step through tests
4. **Slow Mo**: Add `slowMo: 1000` to `use` config
5. **Pause Test**: Add `await page.pause()` in test
6. **Console Logs**: `page.on('console', msg => console.log(msg.text()))`

## CI/CD

Tests run on every push and PR:

1. Install dependencies
2. Install Playwright browsers (chromium only on CI)
3. Run unit tests
4. Build app
5. Run E2E tests
6. Upload test reports

View reports in GitHub Actions artifacts.

## Troubleshooting

**Tests hang/timeout**

- Check if dev server is running
- Increase timeout in config
- Use proper waits instead of `waitForTimeout()`

**Element not found**

- Use Playwright Inspector: `pnpm test:e2e:debug`
- Check selector with codegen: `pnpm test:e2e:codegen`
- Add explicit wait: `await page.waitForSelector('.my-element')`

**Flaky tests**

- Avoid race conditions
- Use `networkidle` for API calls
- Check auto-wait is working
- Review test isolation

**CI failures**

- Download playwright-report artifact
- Check screenshots/videos
- Run with same config locally: `CI=true pnpm test:e2e`

## Resources

- [Full Documentation](./E2E_TESTING.md)
- [Playwright Docs](https://playwright.dev/)
- [API Reference](https://playwright.dev/docs/api/class-playwright)
- [Best Practices](https://playwright.dev/docs/best-practices)
