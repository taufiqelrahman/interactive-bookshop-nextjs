/* eslint-disable @typescript-eslint/no-var-requires */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const withPWA = require('next-pwa');
const path = require('path');
const Dotenv = require('dotenv-webpack');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = withBundleAnalyzer(
  withPWA({
    webpack: (config, { dev }) => {
      config.plugins.push(
        new Dotenv({
          path: path.join(__dirname, '.env'),
          systemvars: true,
        }),
      );

      config.resolve.modules.push(path.resolve('./'));

      if (!dev) {
        config.optimization.minimize = true;
        config.optimization.minimizer.push(new CssMinimizerPlugin({}));
        config.optimization.minimizer.push(new TerserPlugin());
      }
      return config;
    },
    pwa: {
      disable: process.env.NODE_ENV !== 'production',
      publicExcludes: ['!static/images'],
    },
    future: {
      webpack5: true,
    },
  }),
);
