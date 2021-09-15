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
const _ = require('lodash');
const path = require('path');
const util = require('util');
const glob = require('glob');

let app = {};

function PluginLoader (_app) {
  const self = this;

  // global variables
  app = _app;

  // class variables
  self.plugins = {};

  // Try to load global apidoc-plugins (if apidoc is installed locally it tries only local)
  this.detectPugins(__dirname);

  // Try to load local apidoc-plugins
  this.detectPugins(path.join(process.cwd(), '/node_modules'));

  if (Object.keys(this.plugins).length === 0) {
    app.log.debug('No plugins found.');
  }

  this.loadPlugins();
}
/**
 * Inherit
 */
util.inherits(PluginLoader, Object);

/**
 * Exports
 */
module.exports = PluginLoader;

/**
 * Detect modules start with "apidoc-plugin-".
 * Search up to root until found a plugin.
 */
PluginLoader.prototype.detectPugins = function (dir) {
  const self = this;

  // Every dir start with "apidoc-plugin-", because for the tests of apidoc-plugin-test.
  let plugins;
  try {
    plugins = glob.sync(dir + '/apidoc-plugin-*')
      .concat(glob.sync(dir + '/@*/apidoc-plugin-*'));
  } catch (e) {
    app.log.warn(e);
    return;
  }

  if (plugins.length === 0) {
    dir = path.join(dir, '..');
    if (dir === '/' || dir.substr(1) === ':\\') {
      return;
    }
    return this.detectPugins(dir);
  }

  const offset = dir.length + 1;
  plugins.forEach(function (plugin) {
    const name = plugin.substr(offset);
    const filename = path.relative(__dirname, plugin);
    app.log.debug('add plugin: ' + name + ', ' + filename);
    self.addPlugin(name, plugin);
  });
};

/**
 * Add Plugin to plugin list.
 */
PluginLoader.prototype.addPlugin = function (name, filename) {
  if (this.plugins[name]) {
    app.log.debug('overwrite plugin: ' + name + ', ' + this.plugins[name]);
  }

  this.plugins[name] = filename;
};

/**
 * Load and initialize Plugins.
 */
PluginLoader.prototype.loadPlugins = function () {
  _.forEach(this.plugins, function (filename, name) {
    app.log.debug('load plugin: ' + name + ', ' + filename);
    let plugin;
    try {
      plugin = require(filename);
    } catch (e) {
    }
    if (plugin && plugin.init) {
      plugin.init(app);
    } else {
      app.log.debug('Ignored, no init function found.');
    }
  });
};
