var apiWorker = require("./param_title.js");

/**
 * PreProcess.
 *
 * @param {Object[]} parsedFiles
 * @param {String[]} filenames
 * @returns {Object}
 */
function preProcess(parsedFiles, filenames)
{
	return apiWorker.preProcess(parsedFiles, filenames, "headerTitle");
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
	apiWorker.postProcess(parsedFiles, filenames, preProcessResults, "header", "headerTitle");
} // postProcess

/**
 * Exports.
 */
module.exports = {
	preProcess: preProcess,
	postProcess: postProcess
};
