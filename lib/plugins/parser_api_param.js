function parse(content)
{
	// Trim
	content = content.replace(/^\s+|\s+$/g, "");

	// Replace Linebreak with Unicode
	content = content.replace(/\n/g, "\uffff");
	
	// Search: type, field, defaultValue, optional, description
	// Example: {Boolean} [user.name="Default Value"] Users lastname.
	// RegExp:
	//     ^
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
	//var parseRegExp = /^(?:(?:\{(.+?)\})\s*)?(\[?(\S[a-zA-Z0-9._\-]*)(?:=['|"]?([\s.a-zA-Z0-9_\-]*)['|"]?)?\]?)\s*(.*)?$/g;
	var parseRegExp = /^(?:(?:\{(.+?)\})\s*)?(\[?(\S[a-zA-Z0-9._\-]*)(?:=['|"]?([\s.a-zA-Z0-9_\-]*)['|"]?)?\]?)\s*(.*)?(^@|$)/g;
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
	if(matches[5]) matches[5] = matches[5].replace(/\uffff/g, "\n");

	return {
		type: matches[1],
		field: matches[3],
		defaultValue: matches[4],
		optional: (matches[2] !== matches[3]) ? true : false,
		description: matches[5]
	};
} // parse

function pushTo()
{
	return "local.parameter.fields";
}

/**
 * Exports.
 */
module.exports = {
	parse: parse,
	pushTo: pushTo
};