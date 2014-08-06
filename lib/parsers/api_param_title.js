var group = "";

function parse(content, source)
{
	// Trim
	content = content.replace(/^\s+|\s+$/g, "");

	// Replace Linebreak with Unicode
	content = content.replace(/\n/g, "\uffff");

	// Search: group, title
	var parseRegExp = /^(?:\((.+?)\))\s*(.*)(^@|$)/g;
	var matches = parseRegExp.exec(content);

	if( ! matches) return null;

	return {
		group: matches[1],
		title: matches[2]
	};
} // parse

function pushTo()
{
	return "global.paramTitle";
}

function getGroup()
{
	return group;
}

/**
 * Exports.
 */
module.exports = {
	parse: parse,
	pushTo: pushTo,
	getGroup: getGroup,
	allowMultiple: true
};