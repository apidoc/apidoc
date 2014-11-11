var semver = require("semver");

function parse(content)
{
	// Trim
	content = content.replace(/^\s+|\s+$/g, "");

	if(content.length === 0) return null;

	if( ! semver.valid(content)) throw new Error("version \"" + content + "\" not valid.");

	return {
		version: content
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
	extendRoot: true
};