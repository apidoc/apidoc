/* apidoc assets builder config */
const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'main.js'),
  mode: 'development',
  // devtool: 'eval-source-map',
  devtool: 'inline-source-map',
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
