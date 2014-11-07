var group = "";

// Search: group, type, optional, fieldname, defaultValue, size, description
// Example: {String{1..4}} [user.name="John Doe"] Users fullname.
//
// Naming convention:
//     b -> begin
//     e -> end
//     name -> the field value
//     oName -> optional field
//     wName -> wrapper for field

var regExp = {
    b:               "^",                                 // start

    oGroup: {                                             // optional group: (404)
        b:               "\\s*(?:\\(\\s*",                // starting with '(', optional surrounding spaces
        group:              "(.+?)",                      // 1
        e:               "\\s*\\)\\s*)?"                  // ending with ')', optional surrounding spaces
    },

    oType: {                                              // optional type: {string}
        b:               "\\s*(?:\\{\\s*",                // starting with '{', optional surrounding spaces
        type:                "([a-zA-Z0-9\.\/\\\\\\[\\]_-]+)",  // 2
        oSize: {                                          // optional size within type: {string{1..4}}
            b:               "\\s*(?:\\{\\s*",            // starting with '{', optional surrounding spaces
            size:                "(.+?)",                 // 3
            e:               "\\s*\\}\\s*)?"              // ending with '}', optional surrounding spaces
        },
        oAllowedValues: {                                 // optional allowed values within type: {string="abc","def"}
            b:               "\\s*(?:=\\s*",              // starting with '=', optional surrounding spaces
            possibleValues:      "(.+?)",                 // 4
            e:               "(?=\\s*\\}\\s*))?"          // ending with '}', optional surrounding spaces
        },
        e:               "\\s*\\}\\s*)?"                  // ending with '}', optional surrounding spaces
    },

    wName: {
        b:               "(\\[?\\s*",                     // 5 optional optional-marker
        name:                "([a-zA-Z0-9\.\/\\\\\\[\\]_-]+)",  // 6
        oDefaultValue: {                                  // optional defaultValue
            b:               "(?:\\s*=\\s*(?:",           // starting with '=', optional surrounding spaces
            withDoubleQuote:     "\"([^\"]*)\"",          // 7
            withQuote:           "|'([^']*)'",            // 8
            withoutQuote:        "|(.*?)(?:\\s|\\]|$)",   // 9
            e:               "))?"
        },
        e:               "\\s*\\]?\\s*)"
    },

    description:         "(.*)?",                         // 10
    e:               "$|@"
};

function _objectValuesToString(obj)
{
    var str = "";
    for(var el in obj) {
        if(typeof obj[el] === "string") str += obj[el];
        else str += _objectValuesToString(obj[el]);
    } // for
    return str;
} // _objectValuesToString

var parseRegExp = new RegExp(_objectValuesToString(regExp));

var allowedValuesWithDoubleQuoteRegExp = new RegExp(/\"[^\"]*[^\"]\"/g);
var allowedValuesWithQuoteRegExp = new RegExp(/\'[^\']*[^\']\'/g);
var allowedValuesRegExp = new RegExp(/[^,\s]/g);

function parse(content, source, defaultGroup)
{
    // Trim
    content = content.replace(/^\s+|\s+$/g, "");

    // Replace Linebreak with Unicode
    content = content.replace(/\n/g, "\uffff");

    var matches = parseRegExp.exec(content);

    if( ! matches) return null;

    var allowedValues = matches[4];
    if(allowedValues) {
        var regExp;
        if (allowedValues[0] === "\"")
            regExp = allowedValuesWithDoubleQuoteRegExp;
        else if (allowedValues[0] === "'")
            regExp = allowedValuesWithQuoteRegExp;
        else
            regExp = allowedValuesRegExp;

        var allowedValuesMatch;
        var list = [];
        while (allowedValuesMatch = regExp.exec(allowedValues)) {
            if (typeof allowedValuesMatch == 'string')
                list.push(allowedValuesMatch);
            else
                list.push(allowedValuesMatch[0]);
        }
        allowedValues = list;
    }

    // Replace Unicode Linebreaks in description
    if(matches[10])
        matches[10] = matches[10].replace(/\uffff/g, "\n");

    return {
        group        : matches[1] || defaultGroup || "Parameter",
        type         : matches[2],
        size         : matches[3],
        allowedValues: allowedValues,
        optional     : (matches[5] && matches[5][0] === "[") ? true : false,
        field        : matches[6],
        defaultValue : matches[7] || matches[8] || matches[9],
        description  : matches[10] || ""
    };
} // parse

function pushTo() {
    return "local.parameter.fields." + getGroup();
}

function getGroup() {
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
