/**
 * Clojure
 */
module.exports = {
  // find document blocks between ';;;;' and ';;;;'
  docBlocksRegExp: /;{4}\uffff?(.+?)\uffff?(?:\s*)?;{4}/g,
  // remove not needed ' ;; ' at the beginning
  inlineRegExp: /^(\s*)?(;{2})[ ]?/gm,
};
