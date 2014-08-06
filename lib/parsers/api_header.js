// Same as @apiParam
var apiParam = require("./api_param.js");

function parse(content, source)
{
	return apiParam.parse(content, source, "Header");
}

function pushTo()
{
	return "local.header.fields." + apiParam.getGroup();
}

/**
 * Exports.
 */
module.exports = {
	parse: parse,
	pushTo: pushTo,
	markdownFields: [ "description" ]
};