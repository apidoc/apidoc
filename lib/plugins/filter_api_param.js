/**
 * Post Filter parsed results.
 *
 * @param {Object[]} parsedFiles
 * @param {String[]} filenames
 * @returns {Object}
 */
function postFilter(parsedFiles, filenames)
{
	_postFilter(parsedFiles, filenames, "parameter");
} // postFilter

/**
 * Post Filter parsed results.
 *
 * @param {Object[]} parsedFiles
 * @param {String[]} filenames
 * @param {String} tagName Example: "parameter"
 * @returns {Object}
 * @todo Use elegant Map and Reduce Funktions.
 */
function _postFilter(parsedFiles, filenames, tagName)
{
	for(var fileIndex = 0; fileIndex < parsedFiles.length; fileIndex += 1)
	{
		var parsedFile = parsedFiles[fileIndex];
		for(var blockIndex = 0; blockIndex < parsedFile.length; blockIndex += 1)
		{
			var block = parsedFile[blockIndex];
			if(block["local"][tagName] && block["local"][tagName]["fields"])
			{
				// Remove double field params, 1st is newest and is ok
				var fields = block["local"][tagName]["fields"];
				var newFields = [];
				var keys = {};
				for(var fieldIndex = 0; fieldIndex < fields.length; fieldIndex += 1)
				{
					var key = fields[fieldIndex].field;
					if( ! keys[key])
					{
						keys[key] = 1;
						newFields.push(fields[fieldIndex]);
					}
				} // for fieldIndex
				block["local"][tagName]["fields"] = newFields;
			}
		} // for blockIndex
	} // for fileIndex
} // _postFilter

/**
 * Exports.
 */
module.exports = {
	postFilter: postFilter,
	_postFilter: _postFilter
};