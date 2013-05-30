// Same as @apiparam
var apiParam = require("./parser_api_param.js");

function parse(content, source)
{
	return apiParam.parse(content, source, "Success 200");
}

function pushTo()
{
	return "local.success.fields." + apiParam.getGroup();
}

/**
 * Exports.
 */
module.exports = {
	parse: parse,
	pushTo: pushTo
};