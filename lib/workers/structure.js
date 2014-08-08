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
    defineStructureName = defineStructureName || "defineStructure";
    var result = {};

    var name;
    var version;
    parsedFiles.forEach(function(parsedFile){
        parsedFile.forEach(function(block){
            if(block.global[defineStructureName])
            {
                name = block.global[defineStructureName];
                version = block.version || "0.0.0";

                if( ! result[defineStructureName]) result[defineStructureName] = {};
                if( ! result[defineStructureName][name]) result[defineStructureName][name] = {};

                result[defineStructureName][name][version] = block.local;
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
 * @param {String} structureName
 * @param {String} defineStructureName
 */
function postProcess(parsedFiles, filenames, preProcessResults, structureName, defineStructureName)
{
    structureName = structureName || "structure";
    defineStructureName = defineStructureName || "defineStructure";

    var version;
    var matchedData;
    var matchedVersion;
    var foundIndex;
    var lastVersion;
    var versionName;
    var versionKeys;
    parsedFiles.forEach(function(parsedFile, parsedFileIndex){
        parsedFile.forEach(function(block){

            if(block.local[structureName])
            {

                block.local[structureName].forEach(function(name){

                    var version = block.version || "0.0.0";

                    if(preProcessResults[defineStructureName][name])
                    {
                        matchedData = {};
                        matchedVersion = version;
                        if(preProcessResults[defineStructureName][name][version])
                        {
                            // Exact Version
                            matchedData = preProcessResults[defineStructureName][name][version];
                        }
                        else
                        {
                            // Find matching version
                            foundIndex = -1;
                            lastVersion = "0.0.0";

                            versionKeys = Object.keys(preProcessResults[defineStructureName][name]);
                            versionKeys.map(function(currentVersion, versionIndex){
                                if(semver.gte(version, currentVersion) && semver.gte(currentVersion, lastVersion))
                                {
                                    lastVersion = currentVersion;
                                    foundIndex = versionIndex;
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
                            matchedData = preProcessResults[defineStructureName][name][versionName];
                        }

                        // Copy matched elements into parsed block
                        _recursiveMerge(block.local, matchedData);
                    }
                    else
                    {
                        throw new Error("Name \"" + name + "\" in file \"" + filenames[parsedFileIndex] +
                                "\" block number " + block.index + " is not defined."
                        );
                    }

                });

                block.local[structureName] = undefined;

            }

        });

    });

}

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