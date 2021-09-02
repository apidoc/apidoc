/**
 * Ruby
 */
module.exports = {
  // find document blocks between '=begin' and '=end'
  docBlocksRegExp: /#\*\*\uffff?(.+?)\uffff?(?:\s*)?#\*|=begin\uffff?(.+?)\uffff?(?:\s*)?=end/g,
  // remove not needed ' # ' and tabs at the beginning
  inlineRegExp: /^(\s*)?(#)[ ]?/gm,
};
