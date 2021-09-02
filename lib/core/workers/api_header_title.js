// Same as @apiParamTitle
const apiWorker = require('./api_param_title.js');

// Additional information for error log
const _messages = {
  common: {
    element: 'apiHeader',
    usage: '@apiHeader (group) varname',
    example: '@apiDefine MyValidHeaderGroup Some title\n@apiHeader (MyValidHeaderGroup) Content-Type',
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
  return apiWorker.preProcess(parsedFiles, filenames, packageInfos, 'defineHeaderTitle');
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
  apiWorker.postProcess(parsedFiles, filenames, preProcess, packageInfos, 'defineHeaderTitle', 'header', _messages);
}

/**
 * Exports
 */
module.exports = {
  preProcess: preProcess,
  postProcess: postProcess,
};
