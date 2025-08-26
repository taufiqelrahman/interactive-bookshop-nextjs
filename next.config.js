import withBundleAnalyzer from '@next/bundle-analyzer';
import withPWA from 'next-pwa';

import nextI18NextConfig from './next-i18next.config.js';

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})(
  withPWA({
    // webpack: (config) => {
    //   return config;
    // },
    pwa: {
      disable: process.env.NODE_ENV !== 'production',
      publicExcludes: ['!static/images'],
    },
    reactStrictMode: true,
    i18n: nextI18NextConfig.i18n,
  }),
);
