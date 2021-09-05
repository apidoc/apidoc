/**
 * Provide default values for configuration objects
 */
const path = require('path');

const DEFAULT_DEST = 'doc/';
const DEFAULT_SRC = ['./src'];

const options = {
  dest: path.join(__dirname, '..', DEFAULT_DEST),
  template: path.join(__dirname, '../template/'),
  templateSingleFile: path.join(__dirname, '../template-single/index.html'),

  debug: false,
  single: false, // build to single file
  silent: false,
  verbose: false,
  simulate: false,
  parse: false, // Only parse and return the data, no file creation.
  colorize: true,
  markdown: true,
  config: '',
  apiprivate: false,
  encoding: 'utf8',
  mode: '', // amd | es | commonJS or empty string for define()
};

module.exports = {
  options: options,
  DEFAULT_DEST: DEFAULT_DEST,
  DEFAULT_SRC: DEFAULT_SRC,
};
