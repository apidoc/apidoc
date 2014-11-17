var util = require('util');

function ParameterError(message, element, definition, example) {
    // enable stack trace
    Error.call(this);
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;

    this.message = message;
    this.element = element;
    this.definition = definition;
    this.example = example;
}

/**
 * Inherit from Error
 */
util.inherits(ParameterError, Error);

/**
 * Exports
 */
module.exports = ParameterError;
