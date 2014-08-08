// Same as @apiparam
var filterApiParam = require("./api_param.js");

/**
 * Post Filter parsed results.
 *
 * @param {Object[]} parsedFiles
 * @param {String[]} filenames
 * @returns {Object}
 */
function postFilter(parsedFiles, filenames)
{
	filterApiParam.postFilter(parsedFiles, filenames, "info");
} // postFilter

/**
 * Exports.
 */
module.exports = {
	postFilter: postFilter
};