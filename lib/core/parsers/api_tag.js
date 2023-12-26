const ParameterError = require('../errors/parameter_error');

function parse (content) {
    content = content.trim();

    if (content.length === 0) { return null; }

    let tags = [];
    let _tags = content.split(",");
    _tags.forEach((tag) => {
        tags.push(tag.trim());
    })
    return {
        tag: tags,
    };
}

/**
 * Exports
 */
module.exports = {
    parse: parse,
    path: 'local',
    method: 'insert',
    extendRoot: true,
};
