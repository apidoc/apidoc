function parse(content) {
    // trim
    var description = content.replace(/^\s*|\s*$/g, '');

    if (description.length === 0)
        return null;

    return {
        groupDescription: description
    };
}

/**
 * Exports
 */
module.exports = {
    parse         : parse,
    path          : 'local',
    method        : 'insert',
    markdownFields: [ 'groupDescription' ],
    deprecated    : true,
    alternative   : '@apiDefine'
};
