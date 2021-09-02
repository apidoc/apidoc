const apiWorker = require('./api_param_title.js');

// Additional information for error log
const _messages = {
  common: {
    element: 'apiQuery',
    usage: '@apiQuery (group) varname',
    example: '@apiDefine MyValidParamGroup Some title\n@apiQuery (MyValidParamGroup) username',
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
  return apiWorker.preProcess(parsedFiles, filenames, packageInfos, 'defineQueryTitle');
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
  apiWorker.postProcess(parsedFiles, filenames, preProcess, packageInfos, 'defineQueryTitle', 'query', _messages);
}

/**
 * Exports
 */
module.exports = {
  preProcess: preProcess,
  postProcess: postProcess,
};
