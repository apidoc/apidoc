// Same as @apiParam
const apiParser = require('./api_param.js');

function parse (content, source) {
  return apiParser.parse(content, source, 'Body');
}

/**
 * Exports
 */
module.exports = {
  parse: parse,
  path: 'local.body',
  method: apiParser.method,
  markdownFields: ['description'],
};
