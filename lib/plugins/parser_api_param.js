var group = "";

function parse(content, source, defaultGroup)
{
	// Trim
	content = content.replace(/^\s+|\s+$/g, "");

	// Replace Linebreak with Unicode
	content = content.replace(/\n/g, "\uffff");

	// Search: group, type, field, defaultValue, optional, description
	// Example: {Boolean} [user.name="Default Value"] Users lastname.
	// RegExp:
	//     ^
	//     (?:
	//       (?:\(
	//         (.+?)                 ; group
	//       \))
	//     \s*)?
	//     (?:
	//       (?:\{
	//         (.+?)                 ; type
	//       \})
	//     \s*)?
	//     (\[?                     ; optional
	//       (\S[a-zA-Z0-9._\-]*)    ; field
	//       (?:=['|"]?
	//         ([\s.a-zA-Z0-9_\-]*) ; defaultValue
	//       ['|"]?)
	//     ?\]?)
	//      \s*
	//     (.*)?                     ; description
	//     (^@|$)                    ; Multiline
	var parseRegExp = /^(?:(?:\((.+?)\))\s*)?(?:(?:\{(.+?)\})\s*)?(\[?(\S[a-zA-Z0-9._\-]*)(?:=['|"]?([\s.a-zA-Z0-9_\-]*)['|"]?)?\]?)\s*(.*)?(^@|$)/g;
	var matches = parseRegExp.exec(content);
//	function objectValuesToString(obj)
//	{
//		var str = "";
//		for(var el in obj)
//		{
//			if(typeof obj[el] === "string") str += obj[el];
//			else str += objectValuesToString(obj[el]);
//		} // for
//		return str;
//	} // objectValuesToString
//	var rx = {
//		b:                 "^",
//		ohType: {
//			b:               "(?:",
//			ohBraces: {
//				b:               "(?:\\{",
//				type:              "(.+?)",                 // 1
//				e:               "\\})",
//			},
//			e:               "\\s*)?"
//		},
//		oBrackets: {
//			b:               "(\\[?",                     // 2
//      fieldname:         "(\\S[a-zA-Z0-9._\\-]*)",    // 3
//		  hDefaultValue: {
//			  b:               "(?:=['|\"]?",
//			  defaultValue:      "([\\s.a-zA-Z0-9_\\-]*)", // 4
//			  e:               "['|\"]?)"
//			},
//			e:               "?\\]?)"
//		},
//		oWhitespace:       "\\s*",
//		oDescription:      "(.*)?",                     // 5
//		e:                 "(^@|$)"
//	};
//	objectValuesToString(rx);

	if( ! matches) return null;

	// Reverse Unicode Linebreaks
	if(matches[6]) matches[6] = matches[6].replace(/\uffff/g, "\n");

	group = matches[1] || defaultGroup || "Parameter";

	return {
		group: group,
		type: matches[2],
		field: matches[4],
		defaultValue: matches[5],
		optional: (matches[3] !== matches[4]) ? true : false,
		description: matches[6] || ""
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
	getGroup: getGroup
};