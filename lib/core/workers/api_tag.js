const semver = require('semver');
const WorkerError = require('../errors/worker_error');
const apiWorker = require("./api_param_title");

// Additional information for error log
const _messages = {
    common: {
        element: 'apiTag',
        usage: '@apiTag group',
        example: '@apiDefine MyValidTagGroup Some title\n@apiTag Tag1,Tag2',
    },
};

/**
 * PreProcess
 *
 * @param {Object[]} parsedFiles
 * @param {String[]} filenames
 * @param {Object}   packageInfos
 * @param {String}   target       Target path in preProcess-Object (returned result), where the data should be set.
 * @returns {Object}
 */
function preProcess (parsedFiles, filenames, packageInfos, target) {
    const result = [];

    parsedFiles.forEach(function (parsedFile) {
        parsedFile.forEach(function (block) {
            result.push(block.tag);
        });
    });

    return result;
}

/**
 * PostProcess
 *
 * @param {Object[]} parsedFiles
 * @param {String[]} filenames
 * @param {Object[]} preProcess
 * @param {Object}   packageInfos
 * @param {String}   source       Source path in preProcess-Object
 * @param {String}   target       Relative path to the tree (local.), where the data should be modified.
 * @param {String}   messages
 */
function postProcess (parsedFiles, filenames, preProcess, packageInfos, source, target, messages) {
    apiWorker.postProcess(parsedFiles, filenames, preProcess, packageInfos, 'defineTag', 'tag', messages);
}

/**
 * Exports
 */
module.exports = {
    preProcess: preProcess,
    postProcess: postProcess,
};
