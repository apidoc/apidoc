// Same as @apiexample
var apiExample = require("./api_example.js");

function pushTo()
{
	return "local.error.examples";
}

/**
 * Exports.
 */
module.exports = {
	parse: apiExample.parse,
	pushTo: pushTo
};