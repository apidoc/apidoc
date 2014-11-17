// Same as @apiDefine
var apiParser = require('./api_define.js');

// Additional information for error log
var _messages = {
    common: {
        element: 'apiDefineErrorStructure',
        usage  : '@apiDefineErrorStructure name',
        example: '@apiDefineErrorStructure MyValidErrorName'
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
    path          : 'global.defineErrorStructure',
    method        : apiParser.method,
    markdownFields: [ 'description' ],
    deprecated    : true,
    alternative   : '@apiDefine'
};
