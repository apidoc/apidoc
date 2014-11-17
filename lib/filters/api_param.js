/**
 * Post Filter parsed results
 * Remove double fields, happen when overwrite a global inherited field with a local definition.
 *
 * @param {Object[]} parsedFiles
 * @param {String[]} filenames
 * @param {String}   tagName     Example: 'parameter'
 * @returns {Object}
 */
function postFilter(parsedFiles, filenames, tagName) {
    tagName = tagName || 'parameter';

    parsedFiles.forEach(function(parsedFile) {
        parsedFile.forEach(function(block) {
            if (block.local[tagName] && block.local[tagName].fields) {
                var blockFields = block.local[tagName].fields;
                Object.keys(blockFields).forEach(function(blockFieldKey) {
                    var fields = block.local[tagName].fields[blockFieldKey];
                    var newFields = [];
                    var existingKeys = {};
                    fields.forEach(function(field) {
                        var key = field.field; // .field (=id) is the key to check if it exists twice
                        if ( ! existingKeys[key]) {
                            existingKeys[key] = 1;
                            newFields.push(field);
                        }
                    });
                    block.local[tagName].fields[blockFieldKey] = newFields;
                });
            }
        });
    });
}

/**
 * Exports
 */
module.exports = {
    postFilter: postFilter
};
