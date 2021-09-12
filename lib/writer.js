/*
 * apidoc
 * https://apidocjs.com
 *
 * Copyright (c) 2013 inveris OHG
 * Authors: Peter Rottmann <rottmann@inveris.de>
 * Nicolas CARPi @ Deltablot
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
      return new Promise((resolve, reject) => { return resolve(); });
    }

    this.log.verbose('Writing files...');
    if (this.opt.single) {
      return this.createSingleFile();
    }
    return this.createOutputFiles();
  }

  createOutputFiles () {
    this.createDir(this.opt.dest);

    const indexPath = this.path.join(this.opt.template, 'index.html');
    this.log.verbose('Copying template index.html to: ' + this.opt.dest);
    this.fs.copySync(indexPath, this.path.join(this.opt.dest, 'index.html'));

    // the path to apidoc's node_modules directory
    const nodeModPath = this.path.resolve(this.path.join(__dirname, '..', 'node_modules'));

    // create assets folder
    const assetsPath = this.path.resolve(this.path.join(this.opt.dest + 'assets'));
    this.createDir(assetsPath);

    // add the fonts
    this.log.verbose('Copying fonts to: ' + assetsPath);
    this.fs.copySync(this.path.join(this.opt.template, 'fonts'), assetsPath);

    // CSS from dependencies
    this.log.verbose('Copying bootstrap css to: ' + assetsPath);
    this.fs.copySync(this.path.join(nodeModPath, 'bootstrap/dist/css/bootstrap.min.css'), this.path.join(assetsPath, 'bootstrap.min.css'));
    this.fs.copySync(this.path.join(nodeModPath, 'bootstrap/dist/css/bootstrap.min.css.map'), this.path.join(assetsPath, 'bootstrap.min.css.map'));
    this.log.verbose('Copying prism css to: ' + assetsPath);
    this.fs.copySync(this.path.join(nodeModPath, 'prismjs/themes/prism-tomorrow.css'), this.path.join(assetsPath, 'prism.css'));
    this.log.verbose('Copying main css to: ' + assetsPath);
    // main.css
    this.fs.copySync(this.path.join(this.opt.template, 'src', 'css', 'main.css'), this.path.join(assetsPath, 'main.css'));
    // images
    this.fs.copySync(this.path.join(this.opt.template, 'img'), assetsPath);

    return this.runWebpack(this.path.resolve(assetsPath));
  }

  /**
   * Run webpack in a promise
   */
  runWebpack (outputPath) {
    this.log.verbose('Running webpack bundler');
    return new Promise((resolve, reject) => {
      // run webpack to create the bundle file in assets
      const webpackConfig = require(this.path.join(this.opt.template, 'src', 'webpack.config.js'));
      const webpack = require('webpack');
      // set output
      webpackConfig.output.path = outputPath;
      this.log.debug('webpack output folder: ' + webpackConfig.output.path);
      // set data
      const plugins = [
        new webpack.DefinePlugin({
          API_DATA: this.api.data,
          API_PROJECT: this.api.project,
        }),
      ];
      webpackConfig.plugins = plugins;
      const compiler = webpack(webpackConfig);
      compiler.run((err, stats) => {
        if (err) {
          this.log.error('Webpack failure:', err);
          return reject(err);
        }
        this.log.debug('Generated bundle with hash: ' + stats.hash);
        return resolve(outputPath);
      });
    });
  }

  createSingleFile () {
    // dest is a file path, so get the folder with dirname
    this.createDir(this.path.dirname(this.opt.dest));

    // the path to apidoc's node_modules directory
    const nodeModPath = this.path.resolve(this.path.join(__dirname, '..', 'node_modules'));

    // get all css content
    const bootstrapCss = this.fs.readFileSync(this.path.join(nodeModPath, 'bootstrap/dist/css/bootstrap.min.css'), 'utf8');
    const prismCss = this.fs.readFileSync(this.path.join(nodeModPath, 'prismjs/themes/prism-tomorrow.css'), 'utf8');
    const mainCss = this.fs.readFileSync('./template/src/css/main.css', 'utf8');
    const indexHtml = this.fs.readFileSync('./template/index.html', 'utf8');
    const tmpPath = '/tmp/apidoc-tmp';
    // TODO add favicons in base64 in the html
    this.createDir(tmpPath);
    return this.runWebpack(tmpPath).then(tmpPath => {
      const mainBundle = this.fs.readFileSync(this.path.join(tmpPath, 'main.bundle.js'), 'utf8');

      // remove link to css normally in assets
      const indexContent = indexHtml.toString().replace(/<link href="assets[^>]*>/g, '')
        // remove call to main bundle in assets
        .replace(/<script src="assets[^>]*><\/script>/, '');
      const finalContent = `${indexContent}
      <style>${bootstrapCss} ${prismCss} ${mainCss}</style>
      <script>${mainBundle}</script>`;

      // create target file
      this.log.verbose('generating file: ' + this.opt.dest);
      this.fs.writeFileSync(this.path.join(this.opt.dest, 'index.html'), finalContent);
    });
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
    if (!this.fs.existsSync(dir)) {
      this.log.verbose('Creating dir: ' + dir);
      this.fs.mkdirsSync(dir);
    }
  }
}

module.exports = Writer;
