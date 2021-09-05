/**
 * Post Filter parsed results
 * Remove double fields, happen when overwrite a global inherited field with a local definition.
 *
 * @param {Object[]} parsedFiles
 * @param {String[]} filenames
 * @param {String}   tagName     Example: 'parameter'
 * @returns {Object}
 */
function postFilter (parsedFiles, filenames, tagName) {
  tagName = tagName || 'parameter';

  parsedFiles.forEach(function (parsedFile) {
    parsedFile.forEach(function (block) {
      if (block.local[tagName] && block.local[tagName].fields) {
        const blockFields = block.local[tagName].fields;
        Object.keys(blockFields).forEach(function (blockFieldKey) {
          const fields = block.local[tagName].fields[blockFieldKey];
          const newFields = [];
          const existingKeys = {};
          fields.forEach(function (field) {
            const key = field.field; // .field (=id) is the key to check if it exists twice
            if (!existingKeys[key]) {
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
  postFilter: postFilter,
};
