var apiParser = require("./parser_api_param_title.js");

function parse(content, source)
{
	return apiParser.parse(content, source);
} // parse

function pushTo()
{
	return "global.errorTitle";
}

/**
 * Exports.
 */
module.exports = {
	parse: parse,
	pushTo: pushTo,
	getGroup: apiParser.getGroup,
	allowMultiple: true
};