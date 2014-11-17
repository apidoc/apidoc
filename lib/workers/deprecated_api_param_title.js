/**
 * PreProcess
 *
 * @param {Object[]} parsedFiles
 * @param {String[]} filenames
 * @param {Object}   packageInfos
 * @param {String}   target       Target path in preProcess-Object (returned result), where the data should be set.
 * @returns {Object}
 */
function preProcess(parsedFiles, filenames, packageInfos, target) {
    target = target || 'paramTitle';
    var source = target; // relative path to the tree (global.), from where the data should be fetched.

    var result = {};
    result[target] = [];

    parsedFiles.forEach(function(parsedFile) {
        parsedFile.forEach(function(block) {
            if (block.global[source]) {
                var entries = block.global[source];

                // Simple append, same Codes too
                entries.forEach(function(entry) {
                    result[target].push(entry);
                });

                // Delete should be placed in a cleanup filter (here we not know if an other worker need the data)
                delete block.global[source];
            }
        });
    });

    if (result[target].length === 0)
        delete result[target];

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
 */
function postProcess(parsedFiles, filenames, preProcess, packageInfos, source, target) {
    source = source || 'paramTitle';
    target = target || 'parameter';

    parsedFiles.forEach(function(parsedFile) {
        parsedFile.forEach(function(block) {
            if ( ! block.local[target] || ! block.local[target].fields)
                return;

            var fields = block.local[target].fields;
            var newBlock = {}; // preserve sorting
            Object.keys(fields).forEach(function(blockKey) {
                var blockEntries = block.local[target].fields[blockKey];
                var found = false;

                if (preProcess[source]) {
                    preProcess[source].forEach(function(preEntry) {
                        if (preEntry.group === blockKey) {
                            found = true;
                            newBlock[preEntry.title] = blockEntries;
                        }
                    });
                }

                if ( ! found)
                    newBlock[blockKey] = blockEntries;
            });
            block.local[target].fields = newBlock;
        });
    });
}

/**
 * Exports
 */
module.exports = {
    preProcess : preProcess,
    postProcess: postProcess
};
