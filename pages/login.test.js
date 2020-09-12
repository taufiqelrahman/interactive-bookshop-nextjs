import puppeteer from 'puppeteer';
import commonLocale from '../public/static/locales/id/common';

describe('Visits login page', () => {
  let page = null;
  let browser = null;
  beforeEach(async () => {
    browser = await puppeteer.launch({
      headless: false,
    });
    page = await browser.newPage();
    await page.goto(`${url}/login`);
  });
  afterEach(() => {
    browser.close();
    browser = null;
    page = null;
  });
  test('title loads correclty', async () => {
    const selector = '.c-login__title';
    await page.waitForSelector(selector);

    const html = await page.$eval(selector, e => e.innerHTML);
    expect(html).toBe(commonLocale['welcome-back']);
  });
  test('user logins', async () => {
    const selectorGoogle = '[data-testid="google"]';
    await page.waitForSelector(selectorGoogle);
    await page.click(selectorGoogle);
    await page.waitForNavigation();

    expect(page.url()).toMatch(/accounts.google.com/);
    await page.goBack();

    const selectorFacebook = '[data-testid="facebook"]';
    await page.waitForSelector(selectorFacebook);
    await page.click(selectorFacebook);
    await page.waitForNavigation();

    expect(page.url()).toMatch(/facebook.com/);
    await page.goBack();

    const selectorEmail = '[data-testid="email"]';
    await page.waitForSelector(selectorEmail);
    await page.click(selectorEmail);
    await page.waitForSelector('.c-login__form');

    await page.click('input[name=email]');
    await page.type('input[name=email]', 'yomi@mail.com');
    await page.click('input[name=password]');
    await page.type('input[name=password]', 'password');
    await page.click('[data-testid="submit"]');
    await page.waitForSelector('.Toastify');
  }, 9000000);
});
