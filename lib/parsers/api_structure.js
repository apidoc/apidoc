// Same as @apiUse
var apiParser = require('./api_use.js');

/**
 * Exports
 */
module.exports = {
    parse        : apiParser.parse,
    path         : 'local.structure',
    method       : apiParser.method,
    preventGlobal: true,
    deprecated   : true,
    alternative  : '@apiUse'
};
