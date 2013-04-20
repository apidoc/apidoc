var apiWorker = require("./worker_structure.js");

/**
 * PreProcess.
 *
 * @param {Object[]} parsedFiles
 * @param {String[]} filenames
 * @returns {Object}
 */
function preProcess(parsedFiles, filenames)
{
	return apiWorker._preProcess(parsedFiles, filenames, "successStructure", "defineSuccessStructure");
} // preProcess

/**
 * PostProcess.
 *
 * @param {Object[]} parsedFiles
 * @param {String[]} filenames
 * @param {Object[]} preProcessResults
 */
function postProcess(parsedFiles, filenames, preProcessResults)
{
	apiWorker._postProcess(parsedFiles, filenames, preProcessResults, "successStructure", "defineSuccessStructure");
} // postProcess

/**
 * Exports.
 */
module.exports = {
	preProcess: preProcess,
	postProcess: postProcess
};