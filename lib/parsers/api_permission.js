// Same as @apiUse
var apiParser = require('./api_use.js');

/**
 * Exports
 */
module.exports = {
    parse        : apiParser.parse,
    path         : 'local.permission',
    method       : apiParser.method,
    preventGlobal: true
};
