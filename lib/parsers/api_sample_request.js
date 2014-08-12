function parse(content, source)
{
	// Trim
	source = source.replace(/^\s+|\s+$/g, "");

	var title = "";

	// Search for [@apiSampleRequest url]
	var parseRegExp = /^(@\w*)?\s?(.*)/gm;
    var matches = parseRegExp.exec(source);

    var url = matches[2];
	return {
		url: url
	};
} // parse

function pushTo()
{
	return "local.sample";
}

/**
 * Exports.
 */
module.exports = {
	parse: parse,
	pushTo: pushTo
};