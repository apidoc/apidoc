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
 * Filter
 * Cleanup the data, e.g.: remove double fields, happen when overwrite a global inherited field with a local definition.
 *
 * @param {Object} _app
 */
function Filter (_app) {
  const self = this;

  // global variables
  app = _app;

  // class variables
  this.filters = {};

  // load filters
  const filters = Object.keys(app.filters);
  filters.forEach(function (filter) {
    if (_.isObject(app.filters[filter])) {
      app.log.debug('inject filter: ' + filter);
      self.addFilter(filter, app.filters[filter]);
    } else {
      const filename = app.filters[filter];
      app.log.debug('load filter: ' + filter + ', ' + filename);
      self.addFilter(filter, require(filename));
    }
  });
}

/**
 * Inherit
 */
util.inherits(Filter, Object);

/**
 * Exports
 */
module.exports = Filter;

/**
 * Add Filter
 */
Filter.prototype.addFilter = function (name, filter) {
  this.filters[name] = filter;
};

/**
 * Execute filter
 */
Filter.prototype.process = function (parsedFiles, parsedFilenames) {
  // filter each @api-Parameter
  _.each(this.filters, function (filter, name) {
    if (filter.postFilter) {
      app.log.verbose('filter postFilter: ' + name);
      filter.postFilter(parsedFiles, parsedFilenames);
    }
  });

  // reduce to local blocks where global is empty
  const blocks = [];
  parsedFiles.forEach(function (parsedFile) {
    parsedFile.forEach(function (block) {
      if (Object.keys(block.global).length === 0 && Object.keys(block.local).length > 0) { blocks.push(block.local); }
    });
  });
  return blocks;
};
