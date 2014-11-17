// Same as @apiUse
var apiWorker = require('./api_use.js');

// Additional information for error log
var _messages = {
    common: {
        element: 'apiErrorStructure',
        usage  : '@apiErrorStructure group',
        example: '@apiDefine MyValidErrorStructureGroup Some title\n@apiErrorStructure MyValidErrorStructureGroup'
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
    return apiWorker.preProcess(parsedFiles, filenames, packageInfos, 'defineErrorStructure');
}

/**
 * PostProcess
 *
 * @param {Object[]} parsedFiles
 * @param {String[]} filenames
 * @param {Object[]} preProcess
 * @param {Object}   packageInfos
 */
function postProcess(parsedFiles, filenames, preProcess, packageInfos) {
    apiWorker.postProcess(parsedFiles, filenames, preProcess, packageInfos, 'defineErrorStructure', 'errorStructure', _messages);
}

/**
 * Exports
 */
module.exports = {
    preProcess : preProcess,
    postProcess: postProcess
};
