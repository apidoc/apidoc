// Same as @apiParamTitle
var apiParser = require("./api_param_title.js");

function parse(content, source)
{
	return apiParser.parse(content, source);
} // parse

function pushTo()
{
	return "global.successTitle";
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