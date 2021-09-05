const util = require('util');

function ParserError (message, file, block, element, source, extra) {
  // enable stack trace
  Error.call(this);
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;

  this.message = message;
  this.file = file;
  this.block = block;
  this.element = element;
  this.source = source;
  this.extra = extra || [];
}

/**
 * Inherit from Error
 */
util.inherits(ParserError, Error);

/**
 * Exports
 */
module.exports = ParserError;
