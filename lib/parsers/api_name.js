function parse(content) {
    // trim
    var name = content.replace(/^\s*|\s*$/g, '');

    if(name.length === 0)
        return null;

    return {
        name: name.replace(/(\s+)/g, '_')
    };
}

/**
 * Exports
 */
module.exports = {
    parse : parse,
    path  : 'local',
    method: 'insert'
};
