// Same as @apiParamTitle
const apiWorker = require('./api_param_title.js');

// Additional information for error log
const _messages = {
  common: {
    element: 'apiSuccess',
    usage: '@apiSuccess (group) varname',
    example: '@apiDefine MyValidSuccessGroup Some title or 200 OK\n@apiSuccess (MyValidSuccessGroup) username',
  },
};

/**
 * PreProcess
 *
 * @param {Object[]} parsedFiles
 * @param {String[]} filenames
 * @param {Object}   packageInfos
 * @returns {Object}
 */
function preProcess (parsedFiles, filenames, packageInfos) {
  return apiWorker.preProcess(parsedFiles, filenames, packageInfos, 'defineSuccessTitle');
}

/**
 * PostProcess
 *
 * @param {Object[]} parsedFiles
 * @param {String[]} filenames
 * @param {Object[]} preProcess
 * @param {Object}   packageInfos
 */
function postProcess (parsedFiles, filenames, preProcess, packageInfos) {
  apiWorker.postProcess(parsedFiles, filenames, preProcess, packageInfos, 'defineSuccessTitle', 'success', _messages);
}

/**
 * Exports
 */
module.exports = {
  preProcess: preProcess,
  postProcess: postProcess,
};
