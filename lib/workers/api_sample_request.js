/**
 * PostProcess
 *
 * @param {Object[]} parsedFiles
 * @param {String[]} filenames
 * @param {Object[]} preProcess
 * @param {Object}   packageInfos
 */
function postProcess(parsedFiles, filenames, preProcess, packageInfos) {
    var targetName = 'sampleRequest';

    parsedFiles.forEach(function(parsedFile, parsedFileIndex) {
        parsedFile.forEach(function(block) {
            if (block.local[targetName]) {
                var newBlock = [];
                block.local[targetName].forEach(function(entry) {
                    if (entry.url !== 'off') {
                        // Check if is an internal url
                        if (packageInfos.sampleUrl && entry.url.length >= 4 && entry.url.substr(0, 4).toLowerCase() !== 'http') {
                            // Prepend sampleUrl
                            entry.url = packageInfos.sampleUrl + entry.url;
                        }
                        newBlock.push(entry);
                    }
                }); // forEach

                if (newBlock.length === 0)
                    delete block.local[targetName];
                else
                    block.local[targetName] = newBlock;
            } else {
                if (packageInfos.sampleUrl && block.local && block.local['url']) {
                    block.local[targetName] = [{
                        'url': packageInfos.sampleUrl + block.local['url']
                    }];
                }
            }
        });
    });
}

/**
 * Exports
 */
module.exports = {
    postProcess: postProcess
};
