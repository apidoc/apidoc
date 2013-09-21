var _ = require("lodash"); // Because of _.merge
var semver = require("semver");

/**
 * PreProcess.
 *
 * @param {Object[]} parsedFiles
 * @param {String[]} filenames
 * @param {String} structureName
 * @param {String} defineStructureName
 * @returns {Object}
 */
function preProcess(parsedFiles, filenames, structureName, defineStructureName)
{
	structureName = structureName || "structure";
	defineStructureName = defineStructureName || "defineStructure";
	var result = {};
	
//	console.log(JSON.stringify(parsedFiles, null, 2));

	for(var fileIndex = 0; fileIndex < parsedFiles.length; fileIndex += 1)
	{
		var parsedFile = parsedFiles[fileIndex];
		for(var blockIndex = 0; blockIndex < parsedFile.length; blockIndex += 1)
		{
			var block = parsedFile[blockIndex];
			if(block["global"][defineStructureName])
			{
				var name = block["global"][defineStructureName];
				var version = "0.0.0";

				if(block.version)
				{
					version = block.version;
				}

				if( ! result[defineStructureName]) result[defineStructureName] = {};
				if( ! result[defineStructureName][name]) result[defineStructureName][name] = {};
				result[defineStructureName][name][version] = block.local;
			}
		} // for blockIndex
	} // for fileIndex
	return result;
} // preProcess

/**
 * PostProcess.
 *
 * @param {Object[]} parsedFiles
 * @param {String[]} filenames
 * @param {Object[]} preProcessResults
 * @param {String} structureName
 * @param {String} defineStructureName
 */
function postProcess(parsedFiles, filenames, preProcessResults, structureName, defineStructureName)
{
	structureName = structureName || "structure";
	defineStructureName = defineStructureName || "defineStructure";

	for(var fileIndex = 0; fileIndex < parsedFiles.length; fileIndex += 1)
	{
		var parsedFile = parsedFiles[fileIndex];
		for(var blockIndex = 0; blockIndex < parsedFile.length; blockIndex += 1)
		{
			var block = parsedFile[blockIndex];
			if(block["local"][structureName])
			{
				for(var structureIndex = 0; structureIndex < block["local"][structureName].length; structureIndex++)
				{
					var name = block["local"][structureName][structureIndex];
					var version = "0.0.0";

					if(block.version)
					{
						version = block.version;
					}

					if(preProcessResults[defineStructureName][name])
					{
						var matchedData = {};
						var matchedVersion = version;
						if(preProcessResults[defineStructureName][name][version])
						{
							// Exact Version
							matchedData = preProcessResults[defineStructureName][name][version];
						}
						else
						{
							// Find matching version
							var foundIndex = -1;
							var lastVersion = "0.0.0";

							var versionKeys = Object.keys(preProcessResults[defineStructureName][name]);
							for(var versionIndex = 0; versionIndex < versionKeys.length; versionIndex += 1)
							{
								var currentVersion = versionKeys[versionIndex];
								if(semver.gte(version, currentVersion) && semver.gte(currentVersion, lastVersion))
								{
									lastVersion = currentVersion;
									foundIndex = versionIndex;
								}
							} // for preIndex

							if(foundIndex === -1)
							{
								throw new Error("Name \"" + name + "\" in file \"" + filenames[fileIndex] +
									"\" block number " + block.index + " has no matching version. " +
									"Check if referenced definition block has a higher version number."
								);
							}
							var versionName = versionKeys[foundIndex];
							matchedData = preProcessResults[defineStructureName][name][versionName];
						}

						// Copy matched elements into parsed block
						_recursiveMerge(block.local, matchedData);
					}
					else
					{
						throw new Error("Name \"" + name + "\" in file \"" + filenames[fileIndex] +
							"\" block number " + block.index + " is not defined."
						);
					}
				} // for structureIndex

				// Remove Structure Key
				block["local"][structureName] = undefined;
			}
		} // for blockIndex
	} // for fileIndex
} // postProcess

/**
 * Recursive Merge of Objects with Arrays.
 *
 * @param block
 * @param matchedData
 * @todo Bad Hack - watch for something better
 */
function _recursiveMerge(block, matchedData)
{
	_.merge(block, matchedData, function(a, b) {
		if(a instanceof Array)
		{
			return a.concat(b);
		}
		if(_.isObject(a))
		{
			_recursiveMerge(a, b);
		}
		return a;
	});
} // _recursiveMerge

/**
 * Exports.
 */
module.exports = {
	preProcess: preProcess,
	postProcess: postProcess
};