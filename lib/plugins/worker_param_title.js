/**
 * PreProcess.
 *
 * @param {Object[]} parsedFiles
 * @param {String[]} filenames
 * @returns {Object}
 */
function preProcess(parsedFiles, filenames, defineStructureName)
{
    var result = {};
    defineStructureName = defineStructureName || "paramTitle";
    result[defineStructureName] = [];

    parsedFiles.forEach(function(parsedFile){
        parsedFile.forEach(function(block){
            if(block.global[defineStructureName])
            {
                var entries = block.global[defineStructureName];
                // Simple append, same Codes too.
                entries.forEach(function(entrie){
                    result[defineStructureName].push(entrie);
                });
                // Unset
                delete(block.global[defineStructureName]);
            }
        });
    });
    return result;
} // preProcess

/**
 * PostProcess.
 *
 * @param {Object[]} parsedFiles
 * @param {String[]} filenames
 * @param {Object[]} preProcessResults
 */
function postProcess(parsedFiles, filenames, preProcessResults, structureName, defineStructureName)
{
	structureName = structureName || "parameter";
	defineStructureName = defineStructureName || "paramTitle";
	for(var fileIndex = 0; fileIndex < parsedFiles.length; fileIndex += 1)
	{
		var parsedFile = parsedFiles[fileIndex];
		for(var blockIndex = 0; blockIndex < parsedFile.length; blockIndex += 1)
		{
			var block = parsedFile[blockIndex];
			if(block["local"][structureName] && block["local"][structureName]["fields"])
			{
				var fields = block["local"][structureName]["fields"];
				var newBlock = {}; // preserve sorting
				var blockKeys = Object.keys(fields);
				for(var blockKeyIndex = 0; blockKeyIndex < blockKeys.length; blockKeyIndex += 1)
				{
					var blockKey = blockKeys[blockKeyIndex];
					var blockEntries = block["local"][structureName]["fields"][blockKey];
					var found = false;
					for(var preIndex = 0; preIndex < preProcessResults[defineStructureName].length; preIndex += 1)
					{
						var preEntry = preProcessResults[defineStructureName][preIndex];
						if(preEntry.group === blockKey)
						{
							found = true;
							newBlock[preEntry.title] = blockEntries;
						}
					} // for preIndex
					if( ! found)
					{
						newBlock[blockKey] = blockEntries;
					}
				} // for blockKey
				block["local"][structureName]["fields"] = newBlock;
			}
		} // for blockIndex
	} // for fileIndex
} // postProcess

/**
 * Exports.
 */
module.exports = {
	preProcess: preProcess,
	postProcess: postProcess
};