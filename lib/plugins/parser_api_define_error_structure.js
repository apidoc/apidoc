function parse(content)
{
	// Trim
	name = content.replace(/^\s+|\s+$/g, "");

	if(content.length === 0) return null;
	return {
		defineErrorStructure: name
	};
} // parse

function pushTo()
{
	return "global";
} // pushTo

function postParseSender()
{
	return {
		path: "global",
		fields: "defineErrorStructure"
	};
} // postParseSender

/**
 * Exports.
 */
module.exports = {
	parse: parse,
	postParseSender: postParseSender,
	pushTo: pushTo
};