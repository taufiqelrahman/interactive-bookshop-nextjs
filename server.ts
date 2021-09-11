import express from 'express';
import next from 'next';
const nextI18NextMiddleware = require('next-i18next/middleware').default;
import path from 'path';
import { parse } from 'url';
// const { createReadStream } = require('fs');
import nextI18next from './i18n';
import config from './next.config';

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
    if (!parsedUrl.pathname) return;
    const filePath = path.join(__dirname, '.next', parsedUrl.pathname);
    // app.serveStatic(req, res, filePath);
    // createReadStream(filePath).pipe(res);
    res.sendFile(filePath);
  });
  server.get('/workbox*', (req, res) => {
    const parsedUrl = parse(req.url, true);
    if (!parsedUrl.pathname) return;
    const filePath = path.join(__dirname, '.next', parsedUrl.pathname);
    // app.serveStatic(req, res, filePath);
    res.sendFile(filePath);
  });
  server.use(nextI18NextMiddleware(nextI18next));
  server.get('*', (req, res) => handle(req, res));

  process.on('uncaughtException', (error: Error, origin: string) => {
    console.log({
      name: 'uncaughtException',
      message: error.message,
      stack: error.stack,
      origin: `Exception origin: ${origin}`,
    });
  });

  process.on('unhandledRejection', (error: Error) => {
    console.log({
      name: 'unhandledRejection',
      message: error.message,
      stack: error.stack,
    });
  });

  await server.listen(port);
  console.log(`> Ready on http://localhost:${port}`); // eslint-disable-line no-console
})();
