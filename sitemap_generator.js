// eslint-disable-next-line @typescript-eslint/no-var-requires
const sitemap = require('nextjs-sitemap-generator');

sitemap({
  alternateUrls: {
    id: 'https://whenigrowup.co.id',
    en: 'https://whenigrowup.co.id/en',
  },
  baseUrl: 'https://whenigrowup.co.id',
  // ignoredPaths: ['admin'],
  // extraPaths: ['/extraPath'],
  pagesDirectory: __dirname + '/pages',
  targetDirectory: 'public/static/',
  nextConfigPath: __dirname + '/next.config.js',
  ignoredExtensions: ['png', 'jpg'],
  // pagesConfig: {
  //   '/login': {
  //     priority: '0.5',
  //     changefreq: 'daily',
  //   },
  // },
  // sitemapStylesheet: [
  //   {
  //     type: 'text/css',
  //     styleFile: '/test/styles.css',
  //   },
  //   {
  //     type: 'text/xsl',
  //     styleFile: 'test/test/styles.xls',
  //   },
  // ],
});

console.log(`✅ sitemap.xml generated!`);
