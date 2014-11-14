// Same as @apiParamTitle
var apiWorker = require('./deprecated_api_param_title.js');

/**
 * PreProcess
 *
 * @param {Object[]} parsedFiles
 * @param {String[]} filenames
 * @param {Object}   packageInfos
 * @returns {Object}
 */
function preProcess(parsedFiles, filenames, packageInfos) {
    return apiWorker.preProcess(parsedFiles, filenames, packageInfos, 'successTitle');
}

/**
 * PostProcess
 *
 * @param {Object[]} parsedFiles
 * @param {String[]} filenames
 * @param {Object[]} preProcessResults
 * @param {Object}   packageInfos
 */
function postProcess(parsedFiles, filenames, preProcessResults, packageInfos) {
    apiWorker.postProcess(parsedFiles, filenames, preProcessResults, packageInfos, 'successTitle', 'success');
}

/**
 * Exports
 */
module.exports = {
    preProcess : preProcess,
    postProcess: postProcess
};
