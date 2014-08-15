var apiWorker = require("./api_param_title.js");

/**
 * PreProcess.
 *
 * @param {Object[]} parsedFiles
 * @param {String[]} filenames
 * @param {Object} packageInfos
 * @returns {Object}
 */
function preProcess(parsedFiles, filenames, packageInfos)
{
	return apiWorker.preProcess(parsedFiles, filenames, packageInfos, "headerTitle");
} // preProcess

/**
 * PostProcess.
 *
 * @param {Object[]} parsedFiles
 * @param {String[]} filenames
 * @param {Object[]} preProcessResults
 * @param {Object} packageInfos
 */
function postProcess(parsedFiles, filenames, preProcessResults, packageInfos)
{
	apiWorker.postProcess(parsedFiles, filenames, preProcessResults, packageInfos, "header", "headerTitle");
} // postProcess

/**
 * Exports.
 */
module.exports = {
	preProcess: preProcess,
	postProcess: postProcess
};
