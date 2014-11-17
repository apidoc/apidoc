var fs = require('fs');
var path = require('path');
var wrench = require('wrench');
var os = require('os');
var FileError = require('../errors/file_error');

/**
 * Search files recursivly and filter with include / exlude filters
 */
function FindFiles() {
    this.path = './';
    this.excludeFilters = [];
    this.includeFilters = [];
}

/**
 * Exports
 */
module.exports = new FindFiles();

/**
 * Set path to source-files
 *
 * @param {String} path
 */
FindFiles.prototype.setPath = function(path) {
    if (path)
        this.path = path;
};

/**
 * Set exclude filters
 *
 * @param {string[]} excludeFilters
 */
FindFiles.prototype.setExcludeFilters = function(excludeFilters) {
    if (excludeFilters)
        this.excludeFilters = excludeFilters;
};

/**
 * Set include filters
 *
 * @param {string[]} isSilent
 */
FindFiles.prototype.setIncludeFilters = function(includeFilters) {
    if (includeFilters)
        this.includeFilters = includeFilters;
};

/**
 * Search files recursivly and filter by include / exlude filters
 *
 * @returns {String[]}
 */
FindFiles.prototype.search = function() {
    var self = this;
    var files = [];
    try {
        // find Files
        files = wrench.readdirSyncRecursive(self.path);

        // create RegExp Include Filter List
        var regExpIncludeFilters = [];
        filters = self.includeFilters;
        if (typeof(filters) === 'string')
            filters = [ filters ];

        filters.forEach(function(filter) {
            if (filter.length > 0)
                regExpIncludeFilters.push( new RegExp(filter) );
        });

        // RegExp Include Filter
        var length = regExpIncludeFilters.length;
        files = files.filter(function(filename) {
            // Not include Directories like 'dirname.js'
            var fullFilename = path.join(self.path, filename);
            if (fs.statSync(fullFilename).isDirectory())
                return 0;

            if (os.platform() === 'win32')
                filename = filename.replace(/\\/g, '/');

            // apply every filter
            for (var i = 0; i < length; i += 1) {
                if(regExpIncludeFilters[i].test(filename))
                    return 1;
            }
            return 0;
        });

        // create RegExp Exclude Filter List
        var regExpExcludeFilters = [];
        filters = self.excludeFilters;
        if (typeof(filters) === 'string')
            filters = [ filters ];

        filters.forEach(function(filter) {
            if (filter.length > 0)
                regExpExcludeFilters.push( new RegExp(filter) );
        }); // forEach

        // RegExp Exclude Filter
        length = regExpExcludeFilters.length;
        files = files.filter(function(filename) {
            if (os.platform() === 'win32')
                filename = filename.replace(/\\/g, '/');

            // apply every filter
            for(var i = 0; i < length; i += 1) {
                if(regExpExcludeFilters[i].test(filename))
                    return 0;
            }
            return 1;
        });
    } catch (e) {
        throw e;
    } finally {
        if ( ! files || files.length === 0)
            throw new FileError('No files found.', self.path);
    }
    return files;
};
