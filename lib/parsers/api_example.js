function parse(content, source) {
    // trim
    source = source.replace(/^\s*|\s*$/g, '');

    var title = '';
    var text = '';
    var type;

    // Search for @apiExample "[{type}] title and content
    // /^(@\w*)?\s?(?:(?:\{(.+?)\})\s*)?(.*)$/gm;
    var parseRegExpFirstLine = /(@\w*)?(?:(?:\s*\{\s*([a-zA-Z0-9\.\/\\\[\]_-]+)\s*\}\s*)?\s*(.*)?)?/;
    var parseRegExpFollowing = /(^.*\s?)/gm;

    var matches;
    if (matches = parseRegExpFirstLine.exec(source)) {
        type = matches[2];
        title = matches[3];
    }

    parseRegExpFollowing.exec(content); // ignore line 1
    while (matches = parseRegExpFollowing.exec(source)) {
        text += matches[1];
    }

    if (text.length === 0)
        return null;

    return {
        title  : title,
        content: text,
        type   : type || 'json'
    };
}

/**
 * Exports
 */
module.exports = {
    parse : parse,
    path  : 'local.examples',
    method: 'push'
};
