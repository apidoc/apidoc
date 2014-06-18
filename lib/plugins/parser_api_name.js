function parse(content)
{
	// Trim
	content = content.replace(/^\s+|\s+$/g, "");

	if(content.length === 0) return null;
	return {
		name: content.replace(/(\s+|'|:|\.|\[|\])/g, "_")
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
