/**
 * PostProcess.
 */
function postProcess(parsedFiles, filenames, preProcessResults, packageInfos)
{
    parsedFiles.forEach(function(parsedFile, parsedFileIndex) {
        parsedFile.forEach(function(block) {
            if (block.local["sampleRequest"]) {
                var newBlock = [];
                block.local["sampleRequest"].forEach(function(entry) {
                    if(entry.url !== "off") {
                        // Check if is an internal url
                        if (packageInfos.sampleUrl && entry.url.length >= 4 && entry.url.substr(0, 4).toLowerCase() !== "http") {
                            // Prepend sampleUrl
                            entry.url = packageInfos.sampleUrl + entry.url;
                        }
                        newBlock.push(entry);
                    }
                }); // forEach

                if(newBlock.length === 0) delete block.local["sampleRequest"];
                else block.local["sampleRequest"] = newBlock;
            } else {
                if (packageInfos.sampleUrl && block.local && block.local["url"]) {
                    block.local["sampleRequest"] = [{
                        "url": packageInfos.sampleUrl + block.local["url"]
                    }];
                }
            }
        }); // forEach
    }); // forEach
}

/**
 * Exports.
 */
module.exports = {
	postProcess: postProcess
};