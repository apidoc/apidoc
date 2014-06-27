// Same as @apiExample
var apiExample = require("./parser_api_example.js");

function pushTo()
{
	return "local.header.examples";
}

/**
 * Exports.
 */
module.exports = {
	parse: apiExample.parse,
	pushTo: pushTo
};
