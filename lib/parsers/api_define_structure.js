// Same as @apiDefine
var apiParser = require('./api_define.js');

// Additional information for error log
var _messages = {
    common: {
        element: 'apiDefineStructure',
        usage  : '@apiDefineStructure name',
        example: '@apiDefineStructure MyValidName'
    }
};

function parse(content, source) {
    return apiParser.parse(content, source, _messages);
}

/**
 * Exports
 */
module.exports = {
    parse         : parse,
    path          : 'global.defineStructure',
    method        : apiParser.method,
    markdownFields: [ 'description' ],
    deprecated    : true,
    alternative   : '@apiDefine'
};
