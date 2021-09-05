/**
 * C#, Go, Dart, Java, JavaScript, PHP (all DocStyle capable languages)
 */
module.exports = {
  // find document blocks between '#**' and '#*'
  docBlocksRegExp: /\/\*\*\uffff?(.+?)\uffff?(?:\s*)?\*\//g,
  // remove not needed ' * ' and tabs at the beginning
  inlineRegExp: /^(\s*)?(\*)[ ]?/gm,
};
