// Same as @apiParam
const filterApiParam = require('./api_param.js');

/**
 * Post Filter parsed results.
 *
 * @param {Object[]} parsedFiles
 * @param {String[]} filenames
 */
function postFilter (parsedFiles, filenames) {
  filterApiParam.postFilter(parsedFiles, filenames, 'header');
}

/**
 * Exports
 */
module.exports = {
  postFilter: postFilter,
};
