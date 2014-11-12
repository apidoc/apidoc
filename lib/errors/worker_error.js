var util = require('util');

function WorkerError(message, file, block, element, extra) {
    // enable stack trace
    Error.call(this);
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;

    this.message = message;
    this.file = file;
    this.block = block;
    this.element = element;
    this.extra = extra;
}

/**
 * Inherit from Error
 */
util.inherits(WorkerError, Error);

/**
 * Exports
 */
module.exports = WorkerError;
