/**
 * Elixir
 */
module.exports = {
  // Find document blocks between '#{' and '#}'
  docBlocksRegExp: /#*\s?\{\uffff?(.+?)\uffff?(?:\s*)?#+\s?\}/g,
  // Remove not needed '#' and tabs at the beginning
  inlineRegExp: /^(\s*)?(#*)[ ]?/gm,
};
