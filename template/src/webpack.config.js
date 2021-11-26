/*
 * apidoc
 * https://apidocjs.com
 *
 * Authors:
 * Peter Rottmann <rottmann@inveris.de>
 * Nicolas CARPi @ Deltablot
 * Copyright (c) 2013 inveris OHG
 * Licensed under the MIT license.
 */

/* webpack js bundler config file */
const path = require('path');
const { ESBuildMinifyPlugin } = require('esbuild-loader');

module.exports = {
  entry: path.resolve(__dirname, 'main.js'),
  // mode is set at runtime
  resolve: {
    alias: {
      handlebars: 'handlebars/dist/handlebars.min.js',
      // use src jquery, not the minified version or it won't be found
      jquery: 'jquery/src/jquery',
    },
    extensions: ['.js', '.mjs'],
  },
  module: {
    rules: [
      // expose jquery globally
      {
        test: require.resolve('jquery'),
        loader: 'expose-loader',
        options: {
          exposes: ['$', 'jQuery'],
        },
      },
    ],
  },
  output: {
    filename: 'main.bundle.js',
    // path is set at runtime
  },
  optimization: {
    minimizer: [
      new ESBuildMinifyPlugin({
        target: 'es2015',
      }),
    ],
  },
};
