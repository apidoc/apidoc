/**
 * PostProcess
 *
 * @param {Object[]} parsedFiles
 * @param {String[]} filenames
 * @param {Object[]} preProcess
 * @param {Object}   packageInfos
 */
function postProcess (parsedFiles, filenames, preProcess, packageInfos) {
  const targetName = 'sampleRequest';

  parsedFiles.forEach(function (parsedFile) {
    parsedFile.forEach(function (block) {
      if (block.local[targetName]) {
        const newBlock = [];
        block.local[targetName].forEach(function (entry) {
          if (entry.url !== 'off') {
            // Check if is an internal url
            if (packageInfos.sampleUrl && typeof packageInfos.sampleUrl === 'string' && !entry.url.match(/^http/i)) {
              // Prepend sampleUrl
              entry.url = packageInfos.sampleUrl + entry.url;
            }
            newBlock.push(entry);
          }
        }); // forEach

        if (newBlock.length === 0) { delete block.local[targetName]; } else { block.local[targetName] = newBlock; }
      } else {
        let url;
        if (packageInfos.sampleUrl && block.local && block.local.url) {
          // if the block local url is relative, append to the sampleUrl
          if (typeof packageInfos.sampleUrl === 'string' && !block.local.url.match(/^http/i)) {
            url = packageInfos.sampleUrl + block.local.url;
          } else {
            url = block.local.url;
          }

          block.local[targetName] = [{
            url: url,
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
  postProcess: postProcess,
};
