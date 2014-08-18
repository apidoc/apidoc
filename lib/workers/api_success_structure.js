var apiWorker = require("./api_structure.js");

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
	return apiWorker.preProcess(parsedFiles, filenames, packageInfos, "successStructure", "defineSuccessStructure");
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
	apiWorker.postProcess(parsedFiles, filenames, preProcessResults, packageInfos, "successStructure", "defineSuccessStructure");
} // postProcess

/**
 * Exports.
 */
module.exports = {
	preProcess: preProcess,
	postProcess: postProcess
};