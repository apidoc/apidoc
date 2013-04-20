// Same as @apiexample
var apiExample = require("./parser_api_example.js");

function pushTo()
{
	return "local.success.examples";
}

/**
 * Exports.
 */
module.exports = {
	parse: apiExample.parse,
	pushTo: pushTo
};