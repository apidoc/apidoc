function parse(content)
{
	// Trim
	content = content.replace(/^\s+|\s+$/g, "");

	var name = "";
	var title = "";
	var text = "";

	// Search for [@apiexample title] and content
	var parseRegExp = /^(\w*)?\s?(.*)$/gm;
	if(matches = parseRegExp.exec(content))
	{
		name = matches[1];
		title = matches[2];
	}
	while(matches = parseRegExp.exec(content))
	{
		text += matches[0] + "\n";
	} // while

	if(name.length === 0) return null;
	return {
		definePermission: {
			name: name,
			title: title,
			description: text
		}
	};
} // parse

function pushTo()
{
	return "global";
}

/**
 * Exports.
 */
module.exports = {
	parse: parse,
	pushTo: pushTo,
	markdownFields: [ "description" ]
};