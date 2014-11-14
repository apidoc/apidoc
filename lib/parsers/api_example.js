function parse(content, source) {
	// trim
	source = source.replace(/^\s*|\s*$/g, '');

	var title = '';
	var text = '';
	var type;

	// Search for [@apiExample title] and content
	var parseRegExp = /^(@\w*)?\s?(?:(?:\{(.+?)\})\s*)?(.*)$/gm;

	var matches;
	while(matches = parseRegExp.exec(source))
	{
		if (matches[1] && matches[3])
			title += matches[3]; // @apiExample and title in the same line
		if (matches[2])
			type = matches[2];
		else
			if( ! matches[1] && matches[3])
				text += matches[3] + '\n';
	} // while

	if (text.length === 0)
		return null;

	return {
		title  : title,
		content: text,
		type   : type || 'json'
	};
}

/**
 * Exports
 */
module.exports = {
	parse : parse,
	path  : 'local.examples',
	method: 'push'
};
