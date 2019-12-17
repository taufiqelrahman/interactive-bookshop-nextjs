/* eslint-disable @typescript-eslint/no-var-requires */
const withCSS = require('@zeit/next-css');
const withPurgeCss = require('next-purgecss');
require('dotenv').config();
const path = require('path');
const Dotenv = require('dotenv-webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = withCSS(
  withPurgeCss({
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
      return config;
    },
  }),
);
