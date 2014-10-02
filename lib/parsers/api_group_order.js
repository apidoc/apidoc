function parse(content)
{
  return {
    groupOrder: content.match(/\d+/)[0]
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
  pushTo: pushTo
};