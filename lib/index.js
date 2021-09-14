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
const core = require('./core/index');
const defaults = require('./defaults');
const optionsProcessor = require('./options');
const { Reader } = require('./reader');
const Writer = require('./writer');

const app = {
  log: {},
  markdownParser: null,
  options: {},
};

// Display uncaught Exception.
process.on('uncaughtException', err => {
  console.error(new Date().toUTCString() + ' uncaughtException:', err.message);
  console.error(err.stack);
  process.exit(1);
});

/**
 * Create the documentation
 *
 * @param  {Object} options See `apidoc --help`
 * @returns {Boolean|Object} true = ok, but nothing todo | false = error | Object with parsed data and project-informations.
 */
function createDoc (options) {
  // process options
  try {
    app.options = optionsProcessor.process(options);
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }

  // get the default logger
  app.log = defaults.getLogger(app.options);
  // if --warn-error was passed, treat warnings as error and exit with error code
  if (options.warnError) {
    app.log.warn = msg => {
      app.log.error(msg);
      process.exit(1);
    };
  }

  // get the markdown parser
  app.markdownParser = defaults.getMarkdownParser(app.options);

  // make sure input is an array
  if (typeof app.options.src === 'string') {
    app.log.warn('Provided "src" option is not an array. Converting it to array.');
    app.options.src = [app.options.src];
  }

  try {
    // generator information
    const pkgjson = require('../package.json');
    core.setGeneratorInfos({
      name: pkgjson.name,
      time: new Date().toString(),
      url: pkgjson.homepage,
      version: pkgjson.version,
    });
    core.setLogger(app.log);
    core.setMarkdownParser(app.markdownParser);

    const reader = new Reader(app);
    core.setPackageInfos(reader.read());

    // this is holding our results from parsing the source code
    const api = core.parse(app.options);

    if (api === true) {
      app.log.info('Nothing to do.');
      return true;
    }

    if (api === false) {
      app.log.error('Error during source code parsing!');
      return false;
    }

    const writer = new Writer(api, app);
    writer.write().then(() => app.log.verbose('All done :)'));

    return api;
  } catch (e) {
    app.log.error(e.message);
    if (e.stack) { app.log.debug(e.stack); }
    return false;
  }
}

module.exports = {
  createDoc: createDoc,
};
