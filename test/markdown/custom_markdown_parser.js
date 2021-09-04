/**
 * Custom Markdown Parser example.
 */
function CustomMarkdownParser () {
  // Some init stuff.
}

/**
 * Exports.
 */
module.exports = CustomMarkdownParser;

/**
 * Render a markdown Text to HTML.
 *
 * @param {String} text Markdown Text.
 * @returns {String} Converted HTML Text.
 */
CustomMarkdownParser.prototype.render = function (text) {
  // Here would be the markdown-Parser call.
  return 'Custom Markdown Parser: ' + text;
};
