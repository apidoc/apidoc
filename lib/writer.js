/*
 * apidoc
 * https://apidocjs.com
 *
 * Copyright (c) 2013 inveris OHG
 * Author Peter Rottmann <rottmann@inveris.de>
 * Licensed under the MIT license.
 */

/**
 * Write output files
 */
class Writer {
  constructor (api, app) {
    this.api = api;
    this.log = app.log;
    this.opt = app.options;
    this.fs = require('fs-extra');
    this.path = require('path');
  }

  // The public method
  write () {
    if (this.opt.dryRun) {
      this.log.info('Dry run mode enabled: no files created.');
      return false;
    }

    this.log.verbose('Writing files...');
    if (this.opt.single) {
      this.createSingleFile();
    } else {
      this.createOutputFiles();
    }
  }

  createOutputFiles () {
    this.createDir(this.opt.dest);

    this.log.verbose('Copying template ' + this.opt.template + ' to: ' + this.opt.dest);
    this.fs.copySync(this.opt.template, this.opt.dest);

    // copy vendored libraries
    const vendorPath = this.path.join(this.opt.dest + 'vendor');

    // requirejs
    this.log.verbose('Copying require library to: ' + vendorPath);
    this.fs.copySync('./node_modules/requirejs/require.js', this.path.join(vendorPath, 'require.js'));

    // jquery
    this.log.verbose('Copying jquery library to: ' + vendorPath);
    this.fs.copySync('./node_modules/jquery/dist/jquery.min.js', this.path.join(vendorPath, 'jquery.min.js'));

    // handlebars
    this.log.verbose('Copying handlebars library to: ' + vendorPath);
    this.fs.copySync('./node_modules/handlebars/dist/handlebars.min.js', this.path.join(vendorPath, 'handlebars.min.js'));

    // bootstrap
    this.log.verbose('Copying bootstrap js library to: ' + vendorPath);
    this.fs.copySync('./node_modules/bootstrap/dist/js/bootstrap.min.js', this.path.join(vendorPath, 'bootstrap.min.js'));
    this.log.verbose('Copying bootstrap css to: ' + vendorPath);
    this.fs.copySync('./node_modules/bootstrap/dist/css/bootstrap.min.css', this.path.join(vendorPath, 'bootstrap.min.css'));

    // webfontloader
    this.log.verbose('Copying webfontloader library to: ' + vendorPath);
    this.fs.copySync('./node_modules/webfontloader/webfontloader.js', this.path.join(vendorPath, 'webfontloader.js'));

    // Write this.api_data
    const apiDataJsPath = this.path.join(this.opt.dest, 'api_data.js');
    this.writeJSFile(apiDataJsPath, '{ "api": ' + this.api.data + ' }');

    const apiDataJsonPath = apiDataJsPath + 'on';
    this.writeJsonFile(apiDataJsonPath, this.api.data);

    // Write this.api_project
    const apiProjectJsPath = this.path.join(this.opt.dest, 'api_project.js');
    this.writeJSFile(apiProjectJsPath, this.api.project);

    const apiProjectJsonPath = apiProjectJsPath + 'on';
    this.writeJsonFile(apiProjectJsonPath, this.api.project);

    // Write this.api_definitions
    const apiDefinitionsJsPath = this.path.join(this.opt.dest, 'api_definition.js');
    if (!this.opt.copyDefinitions) { this.fs.writeFileSync(apiDefinitionsJsPath, typeof this.api.definitions !== 'undefined' ? this.api.definitions : '??'); }

    const apiDefinitionsJsonPath = apiDefinitionsJsPath + 'on';
    if (!this.opt.copyDefinitions) { this.writeJsonFile(apiDefinitionsJsonPath, typeof this.api.definitions !== 'undefined' ? this.api.definitions : '??'); }
  }

  /**
   * Write a JSON file
   *
   * @param {string} dest Destination path
   * @param {string} data Content of the file
   */
  writeJsonFile (dest, data) {
    this.log.verbose(`Writing json file: ${dest}`);
    this.fs.writeFileSync(dest, data + '\n');
  }

  /**
   * Write js file
   *
   * @param {string} dest Destination path
   * @param {string} data Content of the file
   */
  writeJSFile (dest, data) {
    this.log.verbose(`Writing js file: ${dest}`);
    switch (this.opt.mode) {
      case 'amd':
      case 'es':
        this.fs.writeFileSync(dest, 'export default ' + data + ';\n');
        break;
      case 'commonJS':
        this.fs.writeFileSync(dest, 'module.exports = ' + data + ';\n');
        break;
      default:
        this.fs.writeFileSync(dest, 'define(' + data + ');' + '\n');
    }
  }

  /**
   * Create a directory
   *
   * @param {string} dir Path of the directory to create
   */
  createDir (dir) {
    this.log.verbose('Creating dir: ' + dir);
    this.fs.mkdirsSync(dir);
  }

  createSingleFile () {
    // dest is a file path, so get the folder with dirname
    this.createDir(this.path.dirname(this.opt.dest));

    // create target file
    this.log.verbose('generating file: ' + this.opt.dest);
    this.fs.writeFileSync(this.opt.dest, this.fs
      .readFileSync(this.opt.template)
      .toString()
      .replace('__this.api_DATA__', this.api.data)
      .replace('__this.api_PROJECT__', this.api.project),
    );
  }
}

module.exports = Writer;
