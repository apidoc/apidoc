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
    // Read package.json
    var packageJsonInfo = this._readPackageData('package.json');

    // Read apidoc.json (and overwrite package.json information)
    var packageInfo = this._readPackageData('apidoc.json');

    // apidoc.json has higher priority
    _.defaults(packageInfo, packageJsonInfo);

    if (Object.keys(packageInfo).length === 0)
        app.log.warning('Please create an apidoc.json.');

    // Generator Information
    try {
        var apidocPath = path.join(__dirname, '../');
        var json = JSON.parse( fs.readFileSync(apidocPath + 'package.json', 'utf8') );
        packageInfo.generator = {
            version: json.version,
            time: new Date()
        };
    } catch(e) {}

    return packageInfo;
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
    var packageInfo = {};
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
            var json = JSON.parse( fs.readFileSync(jsonFilename, 'utf8') );
            app.log.debug('read: ' + jsonFilename);

            packageInfo.name        = json.name;
            packageInfo.version     = json.version;
            packageInfo.description = json.description;

            if(json.apidoc)
                _.extend(packageInfo, this._extractApiDocJsonData(json.apidoc));
            else
                _.extend(packageInfo, this._extractApiDocJsonData(json));
        } catch (e) {
            throw new Error('Can not read: ' + filename + ', please check the format (e.g. missing comma).');
        }
    }
    return packageInfo;
};

/**
 * Extract json parameters from the given path (json.apidoc. or json.)
 *
 * @param {Object} json
 * @returns {Object}
 */
PackageInfo.prototype._extractApiDocJsonData = function(json) {
    var packageInfo = {};

    // Browser title.
    packageInfo.title = json.title;

    // Template settings (without any operation, depend on the template itself)
    packageInfo.template = json.template;

    // HINT: url could be replaced in the future with an @apiVariable, so versioning could be used.
    packageInfo.url = json.url;

    packageInfo.sampleUrl = json.sampleUrl;

    // Header
    // TODO: replace it later with a more flexible system to add new navigation points and content files on specific positions.
    if (json.header && json.header.filename) {
        var filename = path.join(app.options.src, json.header.filename);
        if ( ! fs.existsSync(filename))
            filename = path.join('./', json.header.filename);

        app.log.debug('read header file: ' + filename);
        packageInfo.header = {
            title  : json.header.title,
            content: markdown( fs.readFileSync(filename, 'utf8') )
        };
    }

    // Footer
    // TODO: replace it later with a more flexible system to add new navigation points and content files on specific positions.
    if (json.footer && json.footer.filename) {
        var filename = path.join(app.options.src, json.footer.filename);
        if ( ! fs.existsSync(filename))
            filename = path.join('./', json.footer.filename);

        app.log.debug('read footer file: ' + filename);
        packageInfo.footer = {
            title  : json.footer.title,
            content: markdown( fs.readFileSync(filename, 'utf8') )
        };
    }

    // Order
    if (json.order)
        packageInfo.order = json.order;

    return packageInfo;
};
