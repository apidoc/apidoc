var fs = require('fs');
var path = require('path');
var util = require('util');
var _ = require('lodash');
var markdown = require('marked');

var app = {};

function PackageInfo(_app) {
    // global variables
    app = _app;

    // marked (markdown) Settings.
    markdown.setOptions(app.options.marked);
}

/**
 * Inherit
 */
util.inherits(PackageInfo, Object);

/**
 * Exports
 */
module.exports = PackageInfo;

/**
 * Read package.json Data and optinal descriptions
 */
PackageInfo.prototype.get = function() {
    var result = {};

    // Read package.json
    var packageJson = this._readPackageData('package.json');

    if(packageJson.apidoc)
        result = packageJson.apidoc;

    _.defaults(result, {
        name       : packageJson.name || '',
        version    : packageJson.version || '0.0.0',
        description: packageJson.description || '',
    });

    // Read apidoc.json (and overwrite package.json information)
    var apidocJson = this._readPackageData('apidoc.json');

    // apidoc.json has higher priority
    _.extend(result, apidocJson);

    // Replace header footer with file contents
    _.extend(result, this._getHeaderFooter(result));

    if (Object.keys(apidocJson).length === 0)
        app.log.warning('Please create an apidoc.json.');

    // Generator Information
    try {
        var apidocPath = path.join(__dirname, '../');
        var json = JSON.parse( fs.readFileSync(apidocPath + 'package.json', 'utf8') );
        result.generator = {
            version: json.version,
            time: new Date()
        };
    } catch(e) {}

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
    var jsonFilename = path.join(app.options.src, filename);

    // read from source dir
    if ( ! fs.existsSync(jsonFilename)) {
        // read vom current dir
        jsonFilename = './' + filename;
    }
    if ( ! fs.existsSync(jsonFilename)) {
        app.log.debug(filename + ' not found!');
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

    ['header', 'footer'].forEach(function(key) {
        if (json[key] && json[key].filename) {
            console.log(key);
            var filename = path.join(app.options.src, json[key].filename);
            if ( ! fs.existsSync(filename))
                filename = path.join('./', json[key].filename);

            try {
                app.log.debug('read header file: ' + filename);
                result[key] = {
                    title  : json[key].title,
                    content: markdown( fs.readFileSync(filename, 'utf8') )
                };
            } catch (e) {
                throw new Error('Can not read: ' + filename + '.');
            }
        }
    });

    return result;
};
