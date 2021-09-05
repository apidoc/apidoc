/**
 * Provide default values for configuration objects
 */
const path = require('path');
const winston = require('winston');

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

// Get the default logger
function getLogger (options) {
  // default format
  let format = winston.format.simple();
  if (options.logFormat === 'json') {
    // remove colors for json output
    options.colorize = false;
    format = winston.format.json();
  }
  // add colors (default is true)
  if (options.colorize) {
    format = winston.format.combine(
      winston.format.colorize(),
      format,
    );
  }

  // console logger
  return winston.createLogger({
    transports: [
      new winston.transports.Console({
        level: options.debug ? 'debug' : options.verbose ? 'verbose' : 'info',
        silent: options.silent,
      }),
    ],
    format: format,
  });
}

module.exports = {
  options: options,
  getLogger: getLogger,
  DEFAULT_DEST: DEFAULT_DEST,
  DEFAULT_SRC: DEFAULT_SRC,
};
