var semver = require('semver');
var ParameterError = require('../errors/parameter_error');

function parse(content) {
    // trim
    content = content.replace(/^\s*|\s*$/g, '');

    if (content.length === 0)
        return null;

    if ( ! semver.valid(content))
        throw new ParameterError('Version format not valid.',
                                 'apiVersion', '@apiVersion major.minor.patch', '@apiDefine 1.2.3');

    return {
        version: content
    };
}

function pushTo() {
    return 'local';
}

/**
 * Exports
 */
module.exports = {
    parse     : parse,
    path      : 'local',
    method    : 'insert',
    extendRoot: true
};
