function parse(content, source)
{
	// Trim
	var url = content.replace(/^\s+|\s+$/g, "");
	
	if(url.length === 0) return null;

	return {
		url: url
	};
} // parse

function pushTo()
{
	return "local.sampleRequest";
}

/**
 * Exports.
 */
module.exports = {
	parse: parse,
	pushTo: pushTo
};