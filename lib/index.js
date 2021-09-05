/*
 * apidoc
 * https://apidocjs.com
 *
 * Copyright (c) 2013 inveris OHG
 * Author Peter Rottmann <rottmann@inveris.de>
 * Licensed under the MIT license.
 */
const core = require('./core/index');
const defaults = require('./defaults');

const _ = require('lodash');
const fs = require('fs-extra');
const path = require('path');
let Markdown = require('markdown-it');

const PackageInfo = require('./package_info');

const app = {
  log: {},
  markdownParser: null,
  options: {},
};

// Display uncaught Exception.
process.on('uncaughtException', function (err) {
  console.error(new Date().toUTCString() + ' uncaughtException:', err.message);
  console.error(err.stack);
  process.exit(1);
});

/**
 * Create the documentation
 *
 * @param  {Object} options See `apidoc --help`
 * @returns {Mixed} true = ok, but nothing todo | false = error | Object with parsed data and project-informations.
 */
function createDoc (options) {
  // merge given options with defaults
  options = _.defaults({}, options, defaults.options);

  // if a config file is given, read it to figure out input and output
  if (options.config) {
    const configPath = path.resolve(options.config);
    const apidocConfig = require(configPath);
    // if dest is present in config file, set it in options, but only if it's the default value, as cli options should override config file options
    if (apidocConfig.output && options.dest === defaults.DEFAULT_DEST) {
      // keep a trailing slash
      options.dest = path.resolve(apidocConfig.output);
    }
    // do the same for input
    if (apidocConfig.input instanceof Array && options.src[0] === defaults.DEFAULT_SRC[0]) {
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

  app.log = defaults.getLogger(options);

  // Options.
  app.options = options;

  // Markdown Parser: enable / disable / use a custom parser.
  let markdownParser;
  if (app.options.markdown === true) {
    markdownParser = new Markdown({
      breaks: false,
      html: true,
      linkify: false,
      typographer: false,
      highlight: function (str, lang) {
        if (lang) {
          return '<pre><code class="language-' + lang + '">' + str + '</code></pre>';
        }
        return '<pre><code>' + str + '</code></pre>';
      },
    });
  } else if (app.options.markdown !== false) {
    // Include custom Parser @see MARKDOWN.md and test/fixtures/custom_markdown_parser.js
    if (app.options.markdown.substr(0, 2) !== '..' && ((app.options.markdown.substr(0, 1) !== '/' && app.options.markdown.substr(1, 2) !== ':/' && app.options.markdown.substr(1, 2) !== ':\\' && app.options.markdown.substr(0, 1) !== '~') || app.options.markdown.substr(0, 1) === '.')) { // eslint-disable-line no-extra-parens
      app.options.markdown = path.join(process.cwd(), app.options.markdown);
    }
    Markdown = require(app.options.markdown); // Overwrite default Markdown.
    markdownParser = new Markdown();
  }
  app.markdownParser = markdownParser;

  try {
    const packageInfo = new PackageInfo(app);
    const pkgInfo = packageInfo.get();

    // generator information
    const pkgjson = require('../package.json');
    core.setGeneratorInfos({
      name: pkgjson.name,
      time: new Date(),
      url: pkgjson.homepage,
      version: pkgjson.version,
    });
    core.setLogger(app.log);
    core.setMarkdownParser(markdownParser);
    core.setPackageInfos(pkgInfo);

    // this is holding our results from parsing the source code
    const api = core.parse(app.options);

    if (api === true) {
      app.log.info('Nothing to do.');
      return true;
    }
    if (api === false) { return false; }

    if (app.options.parse !== true) {
      if (app.options.single) {
        createSingleFile(api);
      } else {
        createOutputFiles(api);
      }
    }

    if (app.options.verbose) {
      app.log.info('Done.');
    }

    return api;
  } catch (e) {
    app.log.error(e.message);
    if (e.stack) { app.log.debug(e.stack); }
    return false;
  }
}

/**
 * Save parsed data to files
 *
 * @param {Object[]} blocks
 * @param {Object} packageInfos
 */
function createOutputFiles (api) {
  if (app.options.simulate) {
    app.log.warn('!!! Simulation !!! No file or dir will be copied or created.');
    return;
  }

  app.log.verbose('create dir: ' + app.options.dest);
  fs.mkdirsSync(app.options.dest);

  app.log.verbose('copy template ' + app.options.template + ' to: ' + app.options.dest);
  fs.copySync(app.options.template, app.options.dest);

  // copy vendored libraries
  const vendorPath = path.join(app.options.dest + 'vendor');

  // requirejs
  app.log.verbose('copy require library to: ' + vendorPath);
  fs.copySync('./node_modules/requirejs/require.js', path.join(vendorPath, 'require.js'));

  // jquery
  app.log.verbose('copy jquery library to: ' + vendorPath);
  fs.copySync('./node_modules/jquery/dist/jquery.min.js', path.join(vendorPath, 'jquery.min.js'));

  // handlebars
  app.log.verbose('copy handlebars library to: ' + vendorPath);
  fs.copySync('./node_modules/handlebars/dist/handlebars.min.js', path.join(vendorPath, 'handlebars.min.js'));

  // bootstrap
  app.log.verbose('copy bootstrap js library to: ' + vendorPath);
  fs.copySync('./node_modules/bootstrap/dist/js/bootstrap.min.js', path.join(vendorPath, 'bootstrap.min.js'));
  app.log.verbose('copy bootstrap css to: ' + vendorPath);
  fs.copySync('./node_modules/bootstrap/dist/css/bootstrap.min.css', path.join(vendorPath, 'bootstrap.min.css'));

  // webfontloader
  app.log.verbose('copy webfontloader library to: ' + vendorPath);
  fs.copySync('./node_modules/webfontloader/webfontloader.js', path.join(vendorPath, 'webfontloader.js'));

  // Write api_data
  app.log.verbose('write json file: ' + app.options.dest + 'api_data.json');
  fs.writeFileSync(app.options.dest + './api_data.json', api.data + '\n');

  app.log.verbose('write js file: ' + app.options.dest + 'api_data.js');
  writeJSFile(app.options.dest + './api_data.js', '{ "api": ' + api.data + ' }');

  // Write api_project
  app.log.verbose('write json file: ' + app.options.dest + 'api_project.json');
  fs.writeFileSync(app.options.dest + './api_project.json', api.project + '\n');

  app.log.verbose('write js file: ' + app.options.dest + 'api_project.js');
  writeJSFile(app.options.dest + './api_project.js', api.project);

  // Write api_definitions
  app.log.verbose('write json file: ' + app.options.dest + 'api_definitions.json');
  if (!app.options.copyDefinitions) { fs.writeFileSync(app.options.dest + './api_definition.json', api.definitions + '\n'); }

  app.log.verbose('write js file: ' + app.options.dest + 'api_definitions.js');
  if (!app.options.copyDefinitions) { writeJSFile(app.options.dest + './api_definition.js', api.definitions); }
}

/**
 * Write js file
 *
 * @param {string} dest
 * @param {string} data
 */
function writeJSFile (dest, data) {
  switch (app.options.mode) {
    case 'amd':
    case 'es':
      fs.writeFileSync(dest, 'export default ' + data + ';\n');
      break;
    case 'commonJS':
      fs.writeFileSync(dest, 'module.exports = ' + data + ';\n');
      break;
    default:
      fs.writeFileSync(dest, 'define(' + data + ');' + '\n');
  }
}

function createSingleFile (api) {
  if (app.options.simulate) {
    app.log.warn('!!! Simulation !!! No file or dir will be copied or created.');
    return;
  }

  // dest is file path, not folder
  const dir = path.join(app.options.dest, '..');
  app.log.verbose('create dir: ' + dir);
  fs.mkdirsSync(dir);

  // create target file and setting data
  app.log.verbose('generate file: ' + app.options.dest);
  fs.writeFileSync(app.options.dest, fs
    .readFileSync(app.options.template)
    .toString()
    .replace('__API_DATA__', api.data)
    .replace('__API_PROJECT__', api.project),
  );
}

module.exports = {
  createDoc: createDoc,
};
