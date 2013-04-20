function parse(content, source)
{
	// Trim
	source = source.replace(/^\s+|\s+$/g, "");

	var title = "";
	var text = "";

	// Search for [@apiexample title] and content
	var parseRegExp = /^(@\w*)?\s?(.*)$/gm;
	while(matches = parseRegExp.exec(source))
	{
		if(matches[1]) title += matches[2];
		else if(matches[2]) text += matches[2] + "\n";
	} // while

	if(text.length === 0) return null;
	return {
		title: title,
		content: text
	};
} // parse

function pushTo()
{
	return "local.examples";
}

/**
 * Exports.
 */
module.exports = {
	parse: parse,
	pushTo: pushTo
};