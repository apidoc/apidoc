var _    = require('lodash');
var fs   = require('fs');
var path = require('path');

var app = {};

function PackageInfo(_app) {
    // global variables
    app = _app;
}

/**
 * Exports
 */
module.exports = PackageInfo;

/**
 * Read package.json / apidoc.json / apidoc.config.js data
 */
PackageInfo.prototype.get = function() {
    var result = {};

    // Read package.json
    var packageJson = this._readPackageData('package.json');

    if (packageJson.apidoc)
        result = packageJson.apidoc;

    result = _.defaults({}, result, {
        name       : packageJson.name        || '',
        version    : packageJson.version     || '0.0.0',
        description: packageJson.description || '',
    });

    // read apidoc.json (and overwrite package.json information)
    var apidocJson = this._readPackageData('apidoc.json', app.options.config);

    // apidoc.json has higher priority
    if (Object.keys(apidocJson).length > 0) {
        _.extend(result, apidocJson);
    } else {
        // Read apidoc.config.js (and overwrite package.json information).
        var apidocJs = this._readJsConfig('apidoc.config.js', app.options.config);

        if (Object.keys(apidocJs).length > 0) {
            _.extend(result, apidocJs);
        } else if (!packageJson.apidoc) {
            app.log.warn('Please ' + (app.options.config ? 'provide a valid' : 'create an') + " apidoc.json or apidoc.config.js configuration file or add an 'apidoc' key to your package.json.");
        }
    }

    // options.packageInfo overwrites packageInfo
    _.extend(result, app.options.packageInfo);

    // replace header footer with file contents
    _.extend(result, this._getHeaderFooter(result));

    return result;
};

/**
 * Reads the .json file.
 * Returns the data if found or an empty object.
 *
 * @param {String} filename
 * @param {Object} [config] Config path to read the file from. If not provided, the file will be read from the source dir or the current dir (whichever one is found first).
 * @returns {Object}
 */
PackageInfo.prototype._readPackageData = function(filename, config) {
    var result = {};
    var jsonFilename;

    if (config) {
        // Read from provided config path.
        var isDir = config.substr(-5) !== '.json';
        if (isDir) {
            jsonFilename = path.join(config, filename);
        } else {
            jsonFilename = config;
        }
    } else {
        // Read from source directory.
        var dir = this._resolveSrcPath();
        jsonFilename = path.join(dir, filename);

        if (!fs.existsSync(jsonFilename)) {
            // Read from current directory.
            jsonFilename = path.join('./', filename);
        }
    }

    if ( ! fs.existsSync(jsonFilename)) {
        app.log.debug(jsonFilename + ' not found!');
    } else {
        try {
            result = JSON.parse( fs.readFileSync(jsonFilename, 'utf8') );
            app.log.debug('read: ' + jsonFilename);
        } catch (e) {
            throw new Error('Can not read: ' + filename + ', please check the format (e.g. missing comma).');
        }
    }
    return result;
};

/**
 * Reads the .js file.
 * Returns the data if found or an empty object.
 *
 * @param {String} filename
 * @param {Object} [config] Config path to read the file from. If not provided, the file will be read from the source dir or the current dir (whichever one is found first).
 * @returns {Object}
 */
PackageInfo.prototype._readJsConfig = function(filename, config) {
    var result = {};
    var jsFilename;

    if (config) {
        // Read from provided config path.
        var isDir = config.substr(-3) !== '.js';
        if (isDir) {
            jsFilename = path.join(config, filename);
        } else {
            jsFilename = config;
        }
    } else {
        // Read from source directory.
        var dir = this._resolveSrcPath();
        jsFilename = path.join(dir, filename);

        if (!fs.existsSync(jsFilename)) {
            // Read from current directory.
            jsFilename = path.join('./', filename);
        }
    }

    if (!fs.existsSync(jsFilename)) {
        app.log.debug(jsFilename + ' not found!');
    } else {
        try {
            var configObj = require(path.resolve(jsFilename));
            if (typeof configObj !== 'object' || Array.isArray(configObj)) {
                throw new Error('');
            }
            result = configObj;
            app.log.debug('read: ' + jsFilename);
        } catch (e) {
            throw new Error('Can not read: ' + filename + ', please make sure that you are exporting a valid object with module.exports.');
        }
    }
    return result;
};

/**
 * Get json.header / json.footer title and markdown content (from file)
 *
 * @param {Object} json
 * @returns {Object}
 */
PackageInfo.prototype._getHeaderFooter = function(json) {
    var result = {};
    var self = this;

    ['header', 'footer'].forEach(function(key) {
        if (json[key] && json[key].filename) {
//            var filename = path.join(app.options.src, json[key].filename);
            var dir = self._resolveSrcPath();
            var filename = path.join(dir, json[key].filename);

            if ( ! fs.existsSync(filename))
                filename = path.join('./', json[key].filename);

            try {
                app.log.debug('read header file: ' + filename);
                var content = fs.readFileSync(filename, 'utf8');
                result[key] = {
                    title  : json[key].title,
                    content: app.markdownParser ? app.markdownParser.render(content) : content
                };
            } catch (e) {
                throw new Error('Can not read: ' + filename + '.');
            }
        }
    });

    return result;
};

/**
 * Resolve source path.
 *
 * If multiple input dirs are given, the current workdir './' will be returned.
 * On one input dir, the current workdir will be the input dir.
 *
 * @returns {string}
 * @private
 */
PackageInfo.prototype._resolveSrcPath = function() {
    var dir = './';

    if (app.options.src instanceof Array) {
        if (app.options.src.length === 1) {
            dir = app.options.src[0];
        }
    } else {
        if (app.options.src) {
            dir = app.options.src;
        }
    }

    return dir;
};

