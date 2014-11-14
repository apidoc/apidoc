function parse(content, source) {
    // trim
    var url = content.replace(/^\s*|\s*$/g, '');

    if(url.length === 0)
        return null;

    return {
        url: url
    };
}

/**
 * Exports
 */
module.exports = {
    parse : parse,
    path  : 'local.sampleRequest',
    method: 'push'
};
