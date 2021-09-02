/**
 * Python
 */
module.exports = {
  // find document blocks between """ and """
  docBlocksRegExp: /"""\uffff?(.+?)\uffff?(?:\s*)?"""/g,
  // remove not needed tabs at the beginning
  inlineRegExp: /^(\t*)?/gm,
};
