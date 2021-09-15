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
const util = require('util');
const _ = require('lodash');

let app = {};

/**
 * Worker
 *
 * Attaches defined data to parameter which inherit the data.
 * It uses 2 functions, preProcess and postProcess (with the result of preProcess).
 *
 * preProcess  Generates a list with [defineName][name][version] = value
 * postProcess Attach the preProcess data with the nearest version to the tree.
 *
 * @param {Object} _app
 */
function Worker (_app) {
  const self = this;

  // global variables
  app = _app;

  // class variables
  this.workers = {};

  // load worker
  const workers = Object.keys(app.workers);
  workers.forEach(function (worker) {
    if (_.isObject(app.workers[worker])) {
      app.log.debug('inject worker: ' + worker);
      self.addWorker(worker, app.workers[worker]);
    } else {
      const filename = app.workers[worker];
      app.log.debug('load worker: ' + worker + ', ' + filename);
      self.addWorker(worker, require(filename));
    }
  });
}

/**
 * Inherit
 */
util.inherits(Worker, Object);

/**
 * Exports
 */
module.exports = Worker;

/**
 * Add Worker
 */
Worker.prototype.addWorker = function (name, worker) {
  this.workers[name] = worker;
};

/**
 * Execute worker
 *
 * @todo Add priority system (if needed), if a plugin need an other operation to be done before.
 */
Worker.prototype.process = function (parsedFiles, parsedFilenames, packageInfos) {
  // some smaller operation that are not outsourced to extra workers
  // TODO: add priority system first and outsource them then
  parsedFiles.forEach(function (parsedFile, fileIndex) {
    parsedFile.forEach(function (block) {
      if (Object.keys(block.global).length === 0 && Object.keys(block.local).length > 0) {
        if (!block.local.type) { block.local.type = ''; }

        if (!block.local.url) { block.local.url = ''; }

        if (!block.local.version) { block.local.version = packageInfos.defaultVersion; }

        if (!block.local.filename) { block.local.filename = parsedFilenames[fileIndex]; }

        // convert dir delimeter \\ to /
        block.local.filename = block.local.filename.replace(/\\/g, '/');
      }
    });
  });

  // process transformations and assignments for each @api-Parameter
  const preProcessResults = {};

  _.each(this.workers, function (worker, name) {
    if (worker.preProcess) {
      app.log.verbose('worker preProcess: ' + name);
      const result = worker.preProcess(parsedFiles, parsedFilenames, packageInfos);
      _.extend(preProcessResults, result);
    }
  });
  _.each(this.workers, function (worker, name) {
    if (worker.postProcess) {
      app.log.verbose('worker postProcess: ' + name);
      worker.postProcess(parsedFiles, parsedFilenames, preProcessResults, packageInfos);
    }
  });
};
