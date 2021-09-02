/**
 * Strip whitespace from the beginning and end of a string
 *
 * @param str string
 * @returns string
 */
module.exports = function trim (str) {
  return str.replace(/^\s*|\s*$/g, '');
};
