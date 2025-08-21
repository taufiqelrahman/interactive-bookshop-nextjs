import withBundleAnalyzer from '@next/bundle-analyzer';
import withPWA from 'next-pwa';

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})(
  withPWA({
    // webpack: config => {
    //   return config;
    // },
    pwa: {
      disable: process.env.NODE_ENV !== 'production',
      publicExcludes: ['!static/images'],
    },
  }),
);
