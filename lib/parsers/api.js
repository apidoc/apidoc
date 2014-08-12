function parse(content)
{
	// Trim
	content = content.replace(/^\s+|\s+$/g, "");

	// Search: type, url and title
	// Example: {get} /user/:id Get User by ID.
	var parseRegExp = /^(?:(?:\{(.+?)\})?\s)?(.+?)(?:\s(.+?))?$/g;
	var matches = parseRegExp.exec(content);

	if( ! matches) return null;
		
	return {
		type: matches[1],
		url: matches[2],
		title: matches[3] || ""
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