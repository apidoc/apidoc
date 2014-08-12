/**
 * Post Filter parsed results.
 *
 * @param {Object[]} parsedFiles
 * @param {String[]} filenames
 * @param {String} tagName Example: "parameter"
 * @returns {Object}
 * @todo Use elegant Map and Reduce Funktions.
 */
function postFilter(parsedFiles, filenames, tagName)
{
    tagName = tagName || "parameter";

    var blockFields;
    var fields;
    var newFields;
    var keys;
    parsedFiles.forEach(function(parsedFile){
        parsedFile.forEach(function(block){
            if(block.local[tagName] && block.local[tagName].fields)
            {
                blockFields = block.local[tagName].fields;
                Object.keys(blockFields).forEach(function(blockFieldKey){
                    fields = block.local[tagName].fields[blockFieldKey];
                    newFields = [];
                    keys = {};
                    fields.forEach(function(field){
                        var key = field.field;
                        if ( ! keys[key]) {
                            keys[key] = 1;
                            newFields.push(field);
                        }
                    });
                    block.local[tagName].fields[blockFieldKey] = newFields;
                });
            }
        });
    });
} // postFilter

/**
 * Exports.
 */
module.exports = {
	postFilter: postFilter
};