/* eslint-disable @typescript-eslint/no-var-requires */
const withCSS = require('@zeit/next-css');
const withPurgeCss = require('next-purgecss');
require('dotenv').config();
const path = require('path');
const Dotenv = require('dotenv-webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const withPWA = require('next-pwa');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = withBundleAnalyzer(
  withCSS(
    withPurgeCss(
      withPWA({
        webpack: config => {
          config.plugins.push(
            new Dotenv({
              path: path.join(__dirname, '.env'),
              systemvars: true,
            }),
          );
          config.resolve.modules.push(path.resolve('./'));
          // remove existing plugin
          config.plugins = config.plugins.filter(plugin => {
            return plugin.constructor.name !== 'ForkTsCheckerWebpackPlugin';
          });
          // only report errors on a matcher that doesn't match anything
          config.plugins.push(
            new ForkTsCheckerWebpackPlugin({
              reportFiles: ['does-not-exist'],
            }),
          );
          config.module.rules.push({
            test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
            use: {
              loader: 'url-loader',
              options: {
                limit: 100000,
              },
            },
          });
          config.optimization.minimizer.push(new OptimizeCSSAssetsPlugin({}));
          return config;
        },
        pwa: {
          disable: process.env.NODE_ENV !== 'production',
          // dest: 'public/static',
          publicExcludes: ['!static/images'],
        },
      }),
    ),
  ),
);
