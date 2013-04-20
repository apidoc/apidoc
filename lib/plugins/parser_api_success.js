// Same as @apiparam
var apiParam = require("./parser_api_param.js");

function pushTo()
{
	return "local.success.fields";
}

/**
 * Exports.
 */
module.exports = {
	parse: apiParam.parse,
	pushTo: pushTo
};