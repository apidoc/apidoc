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
const defaultConfig = {
  name: 'Acme project',
  version: '0.0.0',
  description: 'REST Api',
};

/**
 * Read information about the source code we are parsing from the config file
 */
class Reader {
  constructor (app) {
    this.app = app;
    this.log = app.log;
    this.opt = app.options;
    this.fs = require('fs-extra');
    this.path = require('path');
  }

  // read the apidoc.json file, or apidoc.config.js or from the package.json
  read () {
    let config = {};
    // if the config file is provided, we use this and do no try to read other files
    if (this.opt.config) {
      this.log.debug('Config file provided, reading this.');
      config = require(this.path.resolve(this.opt.config));
    } else {
      config = this.search();
    }
    // replace header footer with file contents
    return Object.assign(config, this.getHeaderFooter(config));
  }

  /**
   * Look for config files in input folder
   */
  search () {
    this.log.debug('Now looking for apidoc config files');
    // possible sources of information
    const sources = [
      'package.json',
      'apidoc.json',
      'apidoc.config.js',
    ];

    // create a new object because javascript will not assign value
    const config = Object.assign({}, defaultConfig);

    let foundConfig;

    // loop the three possible source of information to try and find packageInfo
    sources.forEach(configFile => {
      this.log.debug(`Now looking for ${configFile}`);
      const filePath = this.findFileInSrc(configFile);
      if (filePath) {
        foundConfig = require(filePath);
        // if the package.json has an apidoc key, read that
        if (foundConfig.apidoc) { foundConfig = foundConfig.apidoc; }

        Object.assign(config, foundConfig);
      }
    });

    if (config === defaultConfig) {
      this.log.info('No config files found.');
    }

    return config;
  }

  /**
   * Get json.header / json.footer title and markdown content (from file)
   *
   * @param {Object} config
   * @returns {Object}
   */
  getHeaderFooter (config) {
    const result = {};

    ['header', 'footer'].forEach(key => {
      if (config[key] && config[key].filename) {
        this.log.debug('Now looking for ' + key);
        // note that markdown files path is taken from first input value
        let filePath = this.path.join(config.input ? config.input[0] : './', config[key].filename);

        // try again to find it in current dir
        if (!this.fs.existsSync(filePath)) { filePath = this.path.join(process.cwd(), config[key].filename); }

        // try again to find it in input folders
        if (!this.fs.existsSync(filePath)) { filePath = this.findFileInSrc(config[key].filename); }

        // try again to find it in dir with the config file
        if (!this.fs.existsSync(filePath) && typeof this.opt.config === 'string') {
          filePath = this.path.join(this.path.dirname(this.opt.config), config[key].filename);
        }

        try {
          this.log.debug(`Reading ${key} file: ${filePath}`);
          const content = this.fs.readFileSync(filePath, 'utf8');
          result[key] = {
            title: config[key].title,
            content: this.app.markdownParser ? this.app.markdownParser.render(content) : content,
          };
        } catch (e) {
          throw new Error('Can not read: ' + filePath);
        }
      }
    });

    return result;
  }

  /**
   * Look for a file in each of the input folders
   */
  findFileInSrc (filename) {
    let path = '';

    // scan each source dir to find a package.json
    this.opt.src.forEach(dir => {
      const target = this.path.join(dir, filename);
      if (this.fs.existsSync(target)) {
        this.log.debug('Found file: ' + target);
        path = this.path.resolve(target);
      }
    });
    return path;
  }
}

module.exports = {
  Reader: Reader,
  defaultConfig: defaultConfig,
};
