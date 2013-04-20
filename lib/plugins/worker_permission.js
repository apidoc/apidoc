var _ = require("lodash"); // Because of _.merge
var semver = require("semver");

/**
 * PreProcess.
 *
 * @param {Object[]} parsedFiles
 * @param {String[]} filenames
 * @returns {Object}
 */
function preProcess(parsedFiles, filenames)
{
	return _preProcess(parsedFiles, filenames, "permission", "definePermission");
} // preProcess

/**
 * PostProcess.
 *
 * @param {Object[]} parsedFiles
 * @param {String[]} filenames
 * @param {Object[]} preProcessResults
 */
function postProcess(parsedFiles, filenames, preProcessResults)
{
	_postProcess(parsedFiles, filenames, preProcessResults, "permission", "definePermission");
} // postProcess

/**
 * PreProcess.
 *
 * @param {Object[]} parsedFiles
 * @param {String[]} filenames
 * @param {String} useName
 * @param {String} defineName
 * @returns {Object}
 */
function _preProcess(parsedFiles, filenames, useName, defineName)
{
	var result = {};
	for(var fileIndex = 0; fileIndex < parsedFiles.length; fileIndex += 1)
	{
		var parsedFile = parsedFiles[fileIndex];
		for(var blockIndex = 0; blockIndex < parsedFile.length; blockIndex += 1)
		{
			var block = parsedFile[blockIndex];
			if(block["global"][defineName])
			{
				var name = block["global"][defineName]["name"];
				var version = "0.0.0";

				if(block.version)
				{
					version = block.version;
				}
	
				if( ! result[name]) result[name] = {};
				result[name][version] = block["global"][defineName];
			}
		} // for blockIndex
	} // for fileIndex
	return result;
} // _preProcess

/**
 * PostProcess.
 *
 * @param {Object[]} parsedFiles
 * @param {String[]} filenames
 * @param {Object[]} preProcessResults
 * @param {String} findName
 * @param {String} defineName
 */
function _postProcess(parsedFiles, filenames, preProcessResults, findName, defineName)
{
	for(var fileIndex = 0; fileIndex < parsedFiles.length; fileIndex += 1)
	{
		var parsedFile = parsedFiles[fileIndex];
		for(var blockIndex = 0; blockIndex < parsedFile.length; blockIndex += 1)
		{
			var block = parsedFile[blockIndex];
			if(block["local"][findName])
			{
				var name = block["local"][findName];
				var version = "0.0.0";

				if(block.version)
				{
					version = block.version;
				}

				if(preProcessResults[name])
				{
					var matchedData = {};
					var matchedVersion = version;
					if(preProcessResults[name][version])
					{
						// Exact Version
						matchedData = preProcessResults[name][version];
					}
					else
					{
						// Find matching version
						var foundIndex = -1;
						var lastVersion = "0.0.0";

						var versionKeys = Object.keys(preProcessResults[name]);
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
						matchedData = preProcessResults[name][versionName];
					}

					// Copy matched elements into parsed block
					block.local[findName] = matchedData;
				}
//				else
//				{
//					// TODO: Show warning (no error).
//					throw new Error("Name \"" + name + "\" in file \"" + filenames[fileIndex] +
//						"\" block number " + block.index + " is not defined."
//					);
//				}
			}
		} // for blockIndex
	} // for fileIndex
} // _postProcess

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
		if(a instanceof Array) return a.concat(b);
		if(_.isObject(a))
		{
			return _recursiveMerge(a, b);
		}
		return a;
	});
} // _recursiveMerge

/**
 * Exports.
 */
module.exports = {
	preProcess: preProcess,
	postProcess: postProcess,
	_preProcess: _preProcess,
	_postProcess: _postProcess
};