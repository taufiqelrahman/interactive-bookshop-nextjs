import withBundleAnalyzer from '@next/bundle-analyzer';
import withPWA from 'next-pwa';

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})(
  withPWA({
    pwa: {
      disable: process.env.NODE_ENV !== 'production',
      publicExcludes: ['!static/images'],
    },
    reactStrictMode: true,
    i18n: {
      defaultLocale: 'en',
      locales: ['en', 'id'],
      localeDetection: true,
    },
    // Performance optimizations
    swcMinify: true,
    compiler: {
      removeConsole:
        process.env.NODE_ENV === 'production'
          ? {
              exclude: ['error', 'warn'],
            }
          : false,
    },
    images: {
      formats: ['image/webp', 'image/avif'],
      minimumCacheTTL: 60,
    },
    compress: true,
    poweredByHeader: false,
    // Optimize production builds
    productionBrowserSourceMaps: false,
    optimizeFonts: true,
    modularizeImports: {
      lodash: {
        transform: 'lodash/{{member}}',
      },
      '@sentry/browser': {
        transform: '@sentry/browser/{{member}}',
      },
    },
  }),
);
