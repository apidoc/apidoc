// Same as @apiparam
var filterApiParam = require("./filter_api_param.js");

/**
 * Post Filter parsed results.
 *
 * @param {Object[]} parsedFiles
 * @param {String[]} filenames
 * @returns {Object}
 */
function postFilter(parsedFiles, filenames)
{
	filterApiParam._postFilter(parsedFiles, filenames, "error");
} // postFilter

/**
 * Exports.
 */
module.exports = {
	postFilter: postFilter
};