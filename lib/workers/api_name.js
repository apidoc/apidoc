var _ = require('lodash');

/**
 * PostProcess
 *
 * Priority: process after use and api
 *
 * @param {Object[]} parsedFiles
 * @param {String[]} filenames
 * @param {Object[]} preProcess
 * @param {Object}   packageInfos
 */
function postProcess(parsedFiles, filenames, preProcess, packageInfos) {
    var target = 'name';

    parsedFiles.forEach(function(parsedFile, parsedFileIndex) {
        parsedFile.forEach(function(block) {
            // Ignore global name, or non existing global names (that will be generated with this func)
            // could overwrite local names on a later starting worker process from e.g. @apiUse
            if (Object.keys(block.global).length === 0) {
                var name = block.local[target];
                if ( ! name) {
                    // TODO: Add a warning

                    // HINT: document that name SHOULD always be used
                    // if no name is set, the name will be generated from type and url.
                    var type = block.local.type;
                    var url = block.local.url;
                    name = type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();

                    var matches = url.match(/[\w]+/g);
                    for (var i = 0; i < matches.length; i+= 1) {
                        var part = matches[i];
                        name += part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
                    }
                }

                // replace special chars
                name = name.replace(/[^\w]/g, '_');

                block.local[target] = name;
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
