var group = "";

function parse(content, source, defaultGroup)
{
	// Trim
	content = content.replace(/^\s+|\s+$/g, "");

	// Replace Linebreak with Unicode
	content = content.replace(/\n/g, "\uffff");

	// Old-RegExp:
	// var parseRegExp = /^(?:(?:\((.+?)\))\s*)?(?:(?:\{(.+?)\})\s*)?(\[?(\S[a-zA-Z0-9._\-]*)(?:=['|"]?([\s.a-zA-Z0-9_\-]*)['|"]?)?\]?)\s*(.*)?(^@|$)/g;

	function _objectValuesToString(obj)
	{
		var str = "";
		for(var el in obj) {
			if(typeof obj[el] === "string") str += obj[el];
			else str += _objectValuesToString(obj[el]);
		} // for
		return str;
	} // _objectValuesToString

	// Search: group, type, field, defaultValue, optional, description
	// Example: {Boolean} [user.name="Default Value"] Users lastname.
	var regExp = {
		b:                 "^",
		vGroup: {
			b:               "(?:",
			c: {
				b:               "(?:\\(",
				group:              "(.+?)",                 // 1
				e:               "\\))",
			},
			e:               "\\s*)?"
		},
		vType: {
			b:               "(?:",
			c: {
				b:               "(?:\\{",
				type:              "(.+?)",                  // 2
				e:               "\\})",
			},
			e:               "\\s*)?"
		},
		vBrackets: {
			b:               "(\\[?",                        // 3
			fieldname:         "(\\S[a-zA-Z0-9\/._\\-]*)",   // 4
            vSize: {
                b:               "(?:\\{?",
                size:              "(.+?)",                  // 5
                e:               "\\})?"
            },
			vDefaultValue: {
			    b:               "(?:=['|\"]?",
			    defaultValue:      "(.+?(?=['|\"|\\]]))",    // 6
			    e:               "['|\"]?)?"
			},
			e:               "\\]?)"
		},
		oWhitespace:       "\\s*",
		vDescription:      "(.*)?",                          // 7
		e:                 "(^@|$)"
	};
	var parseRegExp = new RegExp(_objectValuesToString(regExp));
	var matches = parseRegExp.exec(content);

	if( ! matches) return null;

	// Reverse Unicode Linebreaks
	if(matches[7]) matches[7] = matches[7].replace(/\uffff/g, "\n");

	group = matches[1] || defaultGroup || "Parameter";

	return {
		group: group,
		type: matches[2],
		field: matches[4],
		defaultValue: matches[6],
		optional: (matches[3] !== matches[4]) ? true : false,
		size: matches[5],
		description: matches[7] || ""
	};
} // parse

function pushTo()
{
	return "local.parameter.fields." + getGroup();
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
	markdownFields: [ "description" ]
};