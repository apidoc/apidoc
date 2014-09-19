var group = "";

function parse(content, source, defaultGroup)
{
	// Trim
	content = content.replace(/^\s+|\s+$/g, "");

	// Replace Linebreak with Unicode
	content = content.replace(/\n/g, "\uffff");

	function _objectValuesToString(obj)
	{
		var str = "";
		for(var el in obj) {
			if(typeof obj[el] === "string") str += obj[el];
			else str += _objectValuesToString(obj[el]);
		} // for
		return str;
	} // _objectValuesToString

 content = "{Number} param35=2                     Type, parameter, default value and description.";

	// Search: group, type, fieldname, defaultValue, size, description
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
		vField: {
			b:               "(\\[?",                        // 3
			fieldname:         "(\\S[a-zA-Z0-9\/._\\-]*)",   // 4
			vDefaultValue: {
			    b:               "(?:=",
			    withQuote: {
			    	b:             "(?:['|\"]",
			    	defaultValue:    "(.+?(?=['|\"|\\]]))", // 5
			        e:             "['|\"]?)"
				},
			    withoutQuote: {
			    	b:             "(?!['|\"]",
			    	defaultValue:    "(.+?(?=[\\]|\\s|$]))", // 5
			        e:             "[\\]|\\s|$])"
				},
			    e:               ")?"
			},
			e:               "\\]?)"
		},
        vSize: {
			oWhitespace:     "\\s*",
            b:               "(?:\\{",
            size:              "(.+?)",                      // 6
            e:               "\\})?"
        },
		oWhitespace:       "\\s*",
		vDescription:      "(.*)?",                          // 7
		e:                 "(^@|$)"                          // 8 ???
	};
	var parseRegExp = new RegExp(_objectValuesToString(regExp));
	var matches = parseRegExp.exec(content);

	if( ! matches) return null;

	// Reverse Unicode Linebreaks
	if(matches[7]) matches[7] = matches[7].replace(/\uffff/g, "\n");

	group = matches[1] || defaultGroup || "Parameter";

//if (content.substr(0, 16) === "{Number} param35") {
	console.log(matches);
process.exit(1);

	return {
		group: group,
		type: matches[2],
		field: matches[4],
		defaultValue: matches[5],
		optional: (matches[3] && matches[3][0] === "[") ? true : false,
		size: matches[6],
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