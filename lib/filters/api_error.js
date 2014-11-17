// Same as @apiParam
var filterApiParam = require('./api_param.js');

/**
 * Post Filter parsed results.
 *
 * @param {Object[]} parsedFiles
 * @param {String[]} filenames
 */
function postFilter(parsedFiles, filenames) {
	filterApiParam.postFilter(parsedFiles, filenames, 'error');
}

/**
 * Exports
 */
module.exports = {
	postFilter: postFilter
};
