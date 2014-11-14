// Same as @apiUse
var apiWorker = require('./api_use.js');

// Additional information for error log
var _messages = {
    common: {
        element: 'apiPermission',
        usage  : '@apiPermission group',
        example: '@apiDefine MyValidPermissionGroup Some title\n@apiPermission MyValidPermissionGroup'
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
    return apiWorker.preProcess(parsedFiles, filenames, packageInfos, 'definePermission');
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
    apiWorker.postProcess(parsedFiles, filenames, preProcessResults, packageInfos, 'definePermission', 'permission', _messages);
}

/**
 * Exports
 */
module.exports = {
    preProcess : preProcess,
    postProcess: postProcess
};
