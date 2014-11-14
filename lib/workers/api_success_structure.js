// Same as @apiUse
var apiWorker = require('./api_use.js');

// Additional information for error log
var _messages = {
    common: {
        element: 'apiSuccessStructure',
        usage  : '@apiSuccessStructure group',
        example: '@apiDefine MyValidSuccessStructureGroup Some title\n@apiSuccessStructure MyValidSuccessStructureGroup'
    }
};

/**
 * PreProcess
 *
 * @param {Object[]} parsedFiles
 * @param {String[]} filenames
 * @param {Object}   packageInfos
 * @returns {Object}
 */
function preProcess(parsedFiles, filenames, packageInfos) {
    return apiWorker.preProcess(parsedFiles, filenames, packageInfos, 'defineSuccessStructure');
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
    apiWorker.postProcess(parsedFiles, filenames, preProcessResults, packageInfos, 'defineSuccessStructure', 'successStructure', _messages);
}

/**
 * Exports
 */
module.exports = {
    preProcess : preProcess,
    postProcess: postProcess
};
