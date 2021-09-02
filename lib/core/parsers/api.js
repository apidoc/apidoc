const trim = require('../utils/trim');

function parse (content) {
  content = trim(content);

  // Search: type, url and title
  // Example: {get} /user/:id Get User by ID.
  const parseRegExp = /^(?:(?:\{(.+?)\})?\s*)?(.+?)(?:\s+(.+?))?$/g;
  const matches = parseRegExp.exec(content);

  if (!matches) { return null; }

  return {
    type: matches[1],
    url: matches[2],
    title: matches[3] || '',
  };
}

/**
 * Exports
 */
module.exports = {
  parse: parse,
  path: 'local',
  method: 'insert',
};
