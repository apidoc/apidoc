var _ = require("lodash"); // Because of _.merge
var semver = require("semver");

/**
 * PreProcess.
 *
 * @param {Object[]} parsedFiles
 * @param {String[]} filenames
 * @param {String} useName
 * @param {String} defineName
 * @returns {Object}
 */
function preProcess(parsedFiles, filenames, useName, defineName)
{
    defineName = defineName || "definePermission";

    var result = {};
    var name, version;
    parsedFiles.forEach(function(parsedFile){
        parsedFile.forEach(function(block){
            if(block["global"][defineName])
            {
                name = block["global"][defineName]["name"];
                version = block.version || "0.0.0";

                if( ! result[defineName]) result[defineName] = {};
                if( ! result[defineName][name]) result[defineName][name] = {};

                result[defineName][name][version] = block["global"][defineName];
            }
        });
    });
    return result;
}

/**
 * PostProcess.
 *
 * @param {Object[]} parsedFiles
 * @param {String[]} filenames
 * @param {Object[]} preProcessResults
 * @param {String} findName
 * @param {String} defineName
 */
function postProcess(parsedFiles, filenames, preProcessResults, findName, defineName)
{
	findName = findName || "permission";
	defineName = defineName || "definePermission";
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

				if(preProcessResults[defineName] && preProcessResults[defineName][name])
				{
					var matchedData = {};
					var matchedVersion = version;
					if(preProcessResults[defineName][name][version])
					{
						// Exact Version
						matchedData = preProcessResults[defineName][name][version];
					}
					else
					{
						// Find matching version
						var foundIndex = -1;
						var lastVersion = "0.0.0";

						var versionKeys = Object.keys(preProcessResults[defineName][name]);
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
						matchedData = preProcessResults[defineName][name][versionName];
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
} // postProcess

/**
 * Exports.
 */
module.exports = {
	preProcess: preProcess,
	postProcess: postProcess
};
