function parse(content, source) {
    // trim
    content = content.replace(/^\s*|\s*$/g, '');

    // replace Linebreak with Unicode
    content = content.replace(/\n/g, '\uffff');

    // search: group, title
    var parseRegExp = /^(?:\((.+?)\))\s*(.*)(^@|$)/g;
    var matches = parseRegExp.exec(content);

    if ( ! matches)
        return null;

    return {
        group: matches[1],
        title: matches[2]
    };
}

/**
 * Exports
 */
module.exports = {
    parse        : parse,
    path         : 'global.paramTitle',
    method       : 'push',
    allowMultiple: true,
    deprecated   : true,
    alternative  : '@apiDefine'
};
