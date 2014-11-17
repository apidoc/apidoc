function parse(content) {
    // trim
    var name = content.replace(/^\s*|\s*$/g, '');

    if (name.length === 0)
        return null;

    return {
        name: name
    };
}

/**
 * Exports
 */
module.exports = {
    parse        : parse,
    path         : 'local.use',
    method       : 'push',
    preventGlobal: true
};
