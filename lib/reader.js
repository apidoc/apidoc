/*
 * apidoc
 * https://apidocjs.com
 *
 * Copyright (c) 2013 inveris OHG
 * Author Peter Rottmann <rottmann@inveris.de>
 * Licensed under the MIT license.
 */

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
    this._ = require('lodash');
  }

  // read the apidoc.json file, or apidoc.config.js or from the package.json
  read () {
    // if the config file is provided, we use this and do no try to read other files
    if (this.opt.config) {
      this.log.debug('Config file provided, reading this.');
      return require(this.path.resolve(this.opt.config));
    }

    // possible sources of information
    const sources = [
      'package.json',
      'apidoc.json',
      'apidoc.config.js',
    ];

    const defaultConfig = {
      name: 'Acme project',
      version: '0.0.0',
      description: 'REST Api',
    };

    const config = defaultConfig;

    let foundConfig;

    // loop the three possible source of information to try and find packageInfo
    sources.forEach(configFile => {
      const filePath = this.findFileInSrc(configFile);
      if (filePath) {
        foundConfig = require(filePath);
        // if the package.json has an apidoc key, read that
        if (foundConfig.apidoc) { foundConfig = configFile.apidoc; }

        this._.extend(config, foundConfig);
      }
    });

    if (config === defaultConfig) {
      this.log.warn('No config files found!');
    }

    // replace header footer with file contents
    this._.extend(config, this.getHeaderFooter(config));

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
        // note that markdown files path is taken from first input value
        let filePath = this.path.join(config.input ? config.input[0] : './', config[key].filename);

        // try again to find it in current dir
        if (!this.fs.existsSync(filePath)) { filePath = this.path.join('./', config[key].filename); }

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

  findFileInSrc (filename) {
    let path = '';

    // scan each source dir to find a package.json
    this.opt.src.forEach(dir => {
      const target = this.path.join(dir, filename);
      if (this.fs.existsSync(target)) {
        this.log.debug('Found config file: ' + target);
        path = this.path.resolve(target);
      }
    });
    return path;
  }
}

module.exports = Reader;
