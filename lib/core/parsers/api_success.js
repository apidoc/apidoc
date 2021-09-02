// Same as @apiParam
const apiParser = require('./api_param.js');

function parse (content, source) {
  return apiParser.parse(content, source, 'Success 200');
}

function path () {
  return 'local.success.fields.' + apiParser.getGroup();
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
