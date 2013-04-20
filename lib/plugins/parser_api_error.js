// Same as @apiparam
var apiParam = require("./parser_api_param.js");

function pushTo()
{
	return "local.error.fields";
}

/**
 * Exports.
 */
module.exports = {
	parse: apiParam.parse,
	pushTo: pushTo
};