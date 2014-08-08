function parse(content)
{
	// Trim
	name = content.replace(/^\s+|\s+$/g, "");

	if(name.length === 0) return null;
	return name;
} // parse

function pushTo()
{
	return "local.errorStructure";
} // pushTo

/**
 * Exports.
 */
module.exports = {
	parse: parse,
	pushTo: pushTo,
	preventGlobal: true
};