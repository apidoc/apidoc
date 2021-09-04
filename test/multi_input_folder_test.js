/**
 * Test: apiDoc creation from multiple folder
 */

const fs = require('fs-extra');
const exec = require('child_process').exec;
const path = require('path');

describe('apiDoc multiple folder input', function () {
  const fixturePath = 'test/multi_input_folder/fixtures';
  const projectBaseBath = 'test/multi_input_folder/testproject';

  const outputPath = './tmp';

  const fixtureFiles = [
    'api_data.js',
    'api_data.json',
    'api_project.js',
    'api_project.json',
    'index.html',
  ];

  before(function (done) {
    fs.removeSync(outputPath);

    done();
  });

  after(function (done) {
    done();
  });

  it('should create apidoc in ' + outputPath + ' with multiple input folders', function (done) {
    const commonDefinitions = path.join('./test/multi_input_folder/testproject', 'folder1');
    const historyDefinition = path.join('./test/multi_input_folder/testproject', 'folder2');
    const srcFolder = path.join('./test/multi_input_folder/testproject', 'src');
    const configFilePath = path.join('./test/multi_input_folder/testproject', 'apidoc.json');

    let cmd = 'node ./bin/apidoc';
    cmd += ' -c ' + configFilePath;
    cmd += ' -i ' + commonDefinitions;
    cmd += ' -i ' + historyDefinition;
    cmd += ' -i ' + srcFolder;
    cmd += ' -o ' + outputPath;
    cmd += ' -t ./test/template/';

    exec(cmd, function (err, stdout, stderr) {
      if (err) { throw err; }

      if (stderr) { throw stderr; }

      done();
    });
  });

  it('created files should equal to fixtures', function (done) {
    const timeRegExp = /\"time\"\:\s\"(.*)\"/g;
    const versionRegExp = /\"version\"\:\s\"(.*)\"/g;
    const filenameRegExp = new RegExp('(?!"filename":\\s")(' + projectBaseBath + '/)', 'g');

    fixtureFiles.forEach(function (name) {
      let fixtureContent = fs.readFileSync(path.join(fixturePath, name), 'utf8');
      let createdContent = fs.readFileSync(path.join(outputPath, name), 'utf8');

      // creation time remove (never equal)
      fixtureContent = fixtureContent.replace(timeRegExp, '');
      createdContent = createdContent.replace(timeRegExp, '');

      // creation time remove (or fixtures must be updated every time the version change)
      fixtureContent = fixtureContent.replace(versionRegExp, '');
      createdContent = createdContent.replace(versionRegExp, '');

      // remove the base path
      createdContent = createdContent.replace(filenameRegExp, '');

      const fixtureLines = fixtureContent.split(/\r?\n|\r/);
      const createdLines = createdContent.split(/\r?\n|\r/);

      if (fixtureLines.length !== createdLines.length) { throw new Error('File ' + path.join(outputPath, name) + ' not equals to ' + fixturePath + '/' + name); }

      for (let lineNumber = 0; lineNumber < fixtureLines.length; lineNumber += 1) {
        if (fixtureLines[lineNumber] !== createdLines[lineNumber]) {
          throw new Error('File ' + path.join(outputPath, name) + ' not equals to ' + fixturePath + '/' + name + ' in line ' + (lineNumber + 1) +
                        '\nfixture: ' + fixtureLines[lineNumber] +
                        '\ncreated: ' + createdLines[lineNumber],
          );
        }
      }
    });
    done();
  });
});
