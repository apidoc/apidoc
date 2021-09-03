const semver = require('semver');
const ParameterError = require('../errors/parameter_error');

function parse (content) {
  content = content.trim();

  if (content.length === 0) { return null; }

  if (!semver.valid(content)) {
    throw new ParameterError('Version format not valid.',
      'apiVersion', '@apiVersion major.minor.patch', '@apiVersion 1.2.3');
  }

  return {
    version: content,
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
