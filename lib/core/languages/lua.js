/**
 * Lua
 */
module.exports = {
  // find document blocks between '--[[' and '--]]'
  docBlocksRegExp: /--\[\[\uffff?(.+?)\uffff?(?:\s*)?\]\]/g,
  // remove not needed ' * ' and tabs at the beginning
  inlineRegExp: /^(\s*)?(\*)[ ]?/gm,
};
