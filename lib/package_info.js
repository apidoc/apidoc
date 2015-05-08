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
 * Read apidoc.json / package.json data
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
    var apidocJson = this._readPackageData('apidoc.json');

    // apidoc.json has higher priority
    _.extend(result, apidocJson);

    // options.packageInfo overwrites packageInfo
    _.extend(result, app.options.packageInfo);

    // replace header footer with file contents
    _.extend(result, this._getHeaderFooter(result));

    if (Object.keys(apidocJson).length === 0 && ! packageJson.apidoc)
        app.log.warn('Please create an apidoc.json configuration file.');

    return result;
};

/**
 * Read json data from source dir, or if it not exists from current dir.
 * Return the data merged with the default values.
 *
 * @param {String} filename
 * @param {Object} defaults
 * @returns {Object}
 */
PackageInfo.prototype._readPackageData = function(filename) {
    var result = {};
    var dir = this._resolveSrcPath();
    var jsonFilename = path.join(dir, filename);

    // Read from source dir
    if ( ! fs.existsSync(jsonFilename)) {
        // Read from config dir (default './')
        jsonFilename = path.join(app.options.config, filename);
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

    if (app.options.src instanceof Array && app.options.src.length === 1)
        dir = app.options.src[0];

    return dir;
};

