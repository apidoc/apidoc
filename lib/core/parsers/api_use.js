const trim = require('../utils/trim');

function parse (content) {
  const name = trim(content);

  if (name.length === 0) { return null; }

  return {
    name: name,
  };
}

/**
 * Exports
 */
module.exports = {
  parse: parse,
  path: 'local.use',
  method: 'push',
  preventGlobal: true,
};
