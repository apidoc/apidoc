/**
 * Erlang
 */
module.exports = {
  // Find document blocks between '%{' and '%}'
  docBlocksRegExp: /%*\{\uffff?(.+?)\uffff?(?:\s*)?%+\}/g,
  // remove not needed ' % ' and tabs at the beginning
  // HINT: Not sure if erlang developer use the %, but i think it should be no problem
  inlineRegExp: /^(\s*)?(%*)[ ]?/gm,
};
