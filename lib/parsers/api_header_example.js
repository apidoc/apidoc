// Same as @apiExample
var apiParser = require('./api_example.js');

/**
 * Exports
 */
module.exports = {
    parse : apiParser.parse,
    path  : 'local.header.examples',
    method: apiParser.method
};
