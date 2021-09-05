// Same as @apiParam
const apiParser = require('./api_param.js');

function parse (content, source) {
  return apiParser.parse(content, source, 'Error 4xx');
}

function path () {
  return 'local.error.fields.' + apiParser.getGroup();
}

/**
 * Exports
 */
module.exports = {
  parse: parse,
  path: path,
  method: apiParser.method,
  markdownFields: ['description', 'type'],
  markdownRemovePTags: ['type'],
};
