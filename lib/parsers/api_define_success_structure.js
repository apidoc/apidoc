function parse(content)
{
	// Trim
	var name = content.replace(/^\s+|\s+$/g, "");

	if(content.length === 0) return null;
	return {
		defineSuccessStructure: name
	};
} // parse

function pushTo()
{
	return "global";
} // pushTo

/**
 * Exports.
 */
module.exports = {
	parse: parse,
	pushTo: pushTo
};