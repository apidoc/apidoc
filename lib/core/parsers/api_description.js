const trim = require('../utils/trim');
const unindent = require('../utils/unindent');

function parse (content) {
  const description = trim(content);

  if (description.length === 0) { return null; }

  return {
    description: unindent(description),
  };
}

/**
 * Exports
 */
module.exports = {
  parse: parse,
  path: 'local',
  method: 'insert',
  markdownFields: ['description'],
};
