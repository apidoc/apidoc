function parse (content) {
  const name = content.trim();

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
