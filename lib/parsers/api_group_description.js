function parse(content)
{
  // Trim
  content = content.replace(/^\s+|\s+$/g, "");

  if(content.length === 0) return null;
  return {
    groupDescription: content
  };
} // parse

function pushTo()
{
  return "local";
} // pushTo

/**
 * Exports.
 */
module.exports = {
  parse: parse,
  pushTo: pushTo,
	markdownFields: [ "groupDescription" ]
};