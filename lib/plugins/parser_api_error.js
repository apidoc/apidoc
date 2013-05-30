// Same as @apiparam
var apiParam = require("./parser_api_param.js");

function parse(content, source)
{
	return apiParam.parse(content, source, "Error 4xx");
}

function pushTo()
{
	return "local.error.fields." + apiParam.getGroup();
}

/**
 * Exports.
 */
module.exports = {
	parse: parse,
	pushTo: pushTo
};