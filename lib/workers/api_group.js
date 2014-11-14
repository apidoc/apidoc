var path = require('path');

/**
 * PostProcess
 *
 * @param {Object[]} parsedFiles
 * @param {String[]} filenames
 * @param {Object[]} preProcessResults
 * @param {Object}   packageInfos
 */
function postProcess(parsedFiles, filenames, preProcessResults, packageInfos) {
    var target = 'group';

    parsedFiles.forEach(function(parsedFile, parsedFileIndex) {
        parsedFile.forEach(function(block) {
            // Ignore global groups, or non existing global group names (that will be generated with this func)
            // could overwrite local names on a later starting worker process from e.g. @apiUse
            if (Object.keys(block.global).length === 0) {
                var group = block.local[target];
                if ( ! group) {

                    // TODO: Add a warning

                    // if no group is set, the filename will be the group-name
                    group = path.resolve(filenames[parsedFileIndex]);
                }

                // replace special chars
                group = group.replace(/[^\w]/g, '_');

                block.local[target] = group;
            }
        });
    });
}

/**
 * Exports
 */
module.exports = {
    postProcess: postProcess
};
