var util = require('util');
var fs = require('path');

function FileError(message, file, path) {
    // enable stack trace
    Error.call(this);
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;

    this.message = message;
    this.file = file || '';
    this.path = path || file;

    if (this.path && this.path.charAt(this.path.length - 1) !== '/') {
        this.path = fs.dirname(this.path);
    }
}

/**
 * Inherit from Error
 */
util.inherits(FileError, Error);

/**
 * Exports
 */
module.exports = FileError;
