var ParameterError = require('../errors/parameter_error');

// Additional information for error log
var _messages = {
    common: {
        element: 'apiDefine',
        usage  : '@apiDefine name',
        example: '@apiDefine MyValidName'
    }
};

function parse(content, source, messages) {
    messages = messages || _messages;

    // trim
    content = content.replace(/^\s*|\s*$/g, '');

    var parseRegExp = /^(\w*)(.*?)(?:\s+|$)(.*)$/gm;
    var matches = parseRegExp.exec(content);

    if ( ! matches)
        return null;

    if (matches[0] === '')
        throw new ParameterError('No arguments found.',
                                 messages.common.element, messages.common.usage, messages.common.example);

    if (matches[2] !== '')
        throw new ParameterError('Name must contain only alphanumeric characters.',
                                 messages.common.element, messages.common.usage, messages.common.example);

    var name = matches[1];
    var title = matches[3];
    var description = '';

    while (matches = parseRegExp.exec(content)) {
        description += matches[0] + '\n';
    }

    return {
        name       : name,
        title      : title,
        description: description
    };
}

/**
 * Exports
 */
module.exports = {
    parse         : parse,
    path          : 'global.define',
    method        : 'insert',
    markdownFields: [ 'description' ]
};
