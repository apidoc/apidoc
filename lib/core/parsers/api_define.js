const unindent = require('../utils/unindent');

const ParameterError = require('../errors/parameter_error');

// Additional information for error log
const _messages = {
  common: {
    element: 'apiDefine',
    usage: '@apiDefine name',
    example: '@apiDefine MyValidName',
  },
};

function parse (content, source, messages) {
  messages = messages || _messages;

  content = content.trim();

  const parseRegExp = /^([\w:]*)(.*?)(?:\s+|$)(.*)$/gm;
  let matches = parseRegExp.exec(content);

  if (!matches) { return null; }

  if (matches[0] === '') {
    throw new ParameterError('No arguments found.',
      messages.common.element, messages.common.usage, messages.common.example);
  }

  if (matches[2] !== '') {
    throw new ParameterError('Name must contain only alphanumeric and colon characters.',
      messages.common.element, messages.common.usage, messages.common.example);
  }

  const name = matches[1];
  const title = matches[3];
  let description = '';

  while ((matches = parseRegExp.exec(content))) { // eslint-disable-line no-extra-parens
    description += matches[0] + '\n';
  }

  return {
    name: name,
    title: title,
    description: unindent(description),
  };
}

/**
 * Exports
 */
module.exports = {
  parse: parse,
  path: 'global.define',
  method: 'insert',
  markdownFields: ['description'],
};
