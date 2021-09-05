/**
 * All about options
 */
const path = require('path');
const _ = require('lodash');

const DEFAULT_DEST = 'doc';
const DEFAULT_SRC = ['./src'];
const DEFAULT_TEMPLATE = 'template';

const defaultOptions = {
  src: DEFAULT_SRC,
  dest: path.resolve(path.join(__dirname, '..', DEFAULT_DEST)) + path.sep,
  template: path.resolve(path.join(__dirname, '..', DEFAULT_TEMPLATE)) + path.sep,
  templateSingleFile: path.resolve(__dirname, '../template-single/index.html'),

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

function process (options) {
  // merge given options with defaults
  options = _.defaults({}, options, defaultOptions);

  // if a config file is given, read it to figure out input and output
  if (options.config) {
    const configPath = path.resolve(options.config);
    const apidocConfig = require(configPath);
    // if dest is present in config file, set it in options, but only if it's the default value, as cli options should override config file options
    if (apidocConfig.output && options.dest === defaultOptions.dest) {
      // keep a trailing slash
      options.dest = path.resolve(path.join(apidocConfig.output, path.sep));
    }
    // do the same for input
    if (apidocConfig.input instanceof Array && options.src[0] === DEFAULT_SRC[0]) {
      // keep a trailing slash
      const input = apidocConfig.input.map(p => path.resolve(p) + path.sep);
      options.src = input;
    }
  }

  // add a trailing slash to output destination because it's always a folder
  options.dest = path.join(options.dest, path.sep);

  if (options.single) {
    options.template = options.templateSingleFile;
    options.dest = path.join(options.dest, 'index.html');
  } else {
    options.template = path.join(options.template, path.sep);
  }

  // Line-Ending option
  if (options.lineEnding) {
    if (options.lineEnding === 'CRLF') { // win32
      options.lineEnding = '\r\n';
    } else if (options.lineEnding === 'CR') { // darwin
      options.lineEnding = '\r';
    } else { // linux
      options.lineEnding = '\n';
    }
  }

  return options;
}

module.exports = {
  process: process,
  defaultOptions: defaultOptions,
};
