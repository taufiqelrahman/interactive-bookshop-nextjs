/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express');
const next = require('next');
const nextI18NextMiddleware = require('next-i18next/middleware').default;
const path = require('path');
const { parse } = require('url');
const nextI18next = require('./i18n');
const config = require('./next.config');

// const port = process.env.PORT || 8101;
const port = process.env.PORT || 80;
const app = next({
  dev: process.env.NODE_ENV !== 'production',
  conf: { ...config },
});
const handle = app.getRequestHandler();

(async () => {
  await app.prepare();
  const server = express();

  await nextI18next.initPromise;

  server.get('/sw.js', (req, res) => {
    const parsedUrl = parse(req.url, true);
    const filePath = path.join(__dirname, '.next', parsedUrl.pathname);
    app.serveStatic(req, res, filePath);
  });
  server.get('/workbox*', (req, res) => {
    const parsedUrl = parse(req.url, true);
    const filePath = path.join(__dirname, '.next', parsedUrl.pathname);
    app.serveStatic(req, res, filePath);
  });
  server.use(nextI18NextMiddleware(nextI18next));
  server.get('*', (req, res) => handle(req, res));

  process.on('uncaughtException', (error, origin) => {
    console.log({
      name: 'uncaughtException',
      message: error.message,
      stack: error.stack,
      origin: `Exception origin: ${origin}`,
      response: (error.response || {}).data,
    });
  });

  process.on('unhandledRejection', error => {
    console.log({
      name: 'unhandledRejection',
      message: (error as any).message,
      stack: (error as any).stack,
      response: ((error as any).response || {}).data,
    });
  });

  await server.listen(port);
  console.log(`> Ready on http://localhost:${port}`); // eslint-disable-line no-console
})();
