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

module.exports = {
  entry: path.resolve(__dirname, 'main.js'),
  // TODO check NODE_ENV to set it to development in dev
  mode: 'production',
  // devtool: 'inline-source-map',
  resolve: {
    alias: {
      handlebars: 'handlebars/dist/handlebars.min.js',
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
};
