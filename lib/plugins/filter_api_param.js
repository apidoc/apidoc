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
	for(var fileIndex = 0; fileIndex < parsedFiles.length; fileIndex += 1)
	{
		var parsedFile = parsedFiles[fileIndex];
		for(var blockIndex = 0; blockIndex < parsedFile.length; blockIndex += 1)
		{
			var block = parsedFile[blockIndex];
			if(block["local"][tagName] && block["local"][tagName]["fields"])
			{
				var blockFields = block["local"][tagName]["fields"];
				var blockFieldKeys = Object.keys(blockFields);
				for(var blockFieldKeysIndex = 0; blockFieldKeysIndex < blockFieldKeys.length; blockFieldKeysIndex += 1)
				{
					var blockFieldKey = blockFieldKeys[blockFieldKeysIndex];
					// Remove double field params, 1st is newest and is ok
					var fields = block["local"][tagName]["fields"][blockFieldKey];
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
					block["local"][tagName]["fields"][blockFieldKey] = newFields;
				} // for blockFieldKeysIndex
			}
		} // for blockIndex
	} // for fileIndex
} // postFilter

/**
 * Exports.
 */
module.exports = {
	postFilter: postFilter
};