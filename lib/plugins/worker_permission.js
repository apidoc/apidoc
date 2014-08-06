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
            if(block.global[defineName])
            {
                name = block.global[defineName].name;
                version = block.version || "0.0.0";

                if( ! result[defineName]) result[defineName] = {};
                if( ! result[defineName][name]) result[defineName][name] = {};

                result[defineName][name][version] = block.global[defineName];
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

    var name;
    var version;
    var matchedData;
    var matchedVersion;
    var foundIndex;
    var lastVersion;
    var versionKeys;
    var versionName;
    parsedFiles.forEach(function(parsedFile, parsedFileIndex){
        parsedFile.forEach(function(block){

            if(block.local[findName])
            {
                name = block.local[findName];
                version = block.version || "0.0.0";
            }

            if(preProcessResults[defineName] && preProcessResults[defineName][name])
            {
                matchedData = {};
                matchedVersion = version;
                if(preProcessResults[defineName][name][version])
                {
                    // Exact Version
                    matchedData = preProcessResults[defineName][name][version];
                }
                else
                {
                    // Find matching version
                    foundIndex = -1;
                    lastVersion = "0.0.0";

                    versionKeys = Object.keys(preProcessResults[defineName][name]);
                    versionKeys.forEach(function(versionKey, i){
                        if(semver.gte(version, versionKey) && semver.gte(versionKey, lastVersion))
                        {
                            lastVersion = versionKey;
                            foundIndex = i;
                        }
                    });

                    if(foundIndex === -1)
                    {
                        throw new Error("Name \"" + name + "\" in file \"" + filenames[parsedFileIndex] +
                                "\" block number " + block.index + " has no matching version. " +
                                "Check if referenced definition block has a higher version number."
                        );
                    }
                    versionName = versionKeys[foundIndex];
                    matchedData = preProcessResults[defineName][name][versionName];
                }

                // Copy matched elements into parsed block
                block.local[findName] = matchedData;
            }
//			else
//				{
//					// TODO: Show warning (no error).
//					throw new Error("Name \"" + name + "\" in file \"" + filenames[parsedFileIndex] +
//						"\" block number " + block.index + " is not defined."
//					);
//				}

        });
    });
}

/**
 * Exports.
 */
module.exports = {
	preProcess: preProcess,
	postProcess: postProcess
};
