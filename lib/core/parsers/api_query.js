// Same as @apiParam
const apiParser = require('./api_param.js');

function parse (content, source) {
  return apiParser.parse(content, source, 'Query');
}

/**
 * Exports
 */
module.exports = {
  parse: parse,
  path: 'local.query',
  method: apiParser.method,
  markdownFields: ['description'],
};
