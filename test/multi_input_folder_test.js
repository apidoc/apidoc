/* jshint unused:false, expr:true */

/**
 * Test: apiDoc creation from multiple folder
 */

const fs = require('fs-extra');
const exec = require('child_process').exec;
const path = require('path');
const should = require('should');

describe('apiDoc multiple folder input', function () {
  const fixturePath = 'test/multi_input_folder/fixtures';
  const projectBaseBath = 'test/multi_input_folder/testproject';

  const testTargetPath = './tmp/apidocmulti';

  const fixtureFiles = [
    'api_data.js',
    'api_data.json',
    'api_project.js',
    'api_project.json',
    'index.html',
  ];

  before(function (done) {
    fs.removeSync(testTargetPath);

    done();
  });

  after(function (done) {
    done();
  });

  it('should create apidoc in /tmp/apidocmulti with multiple input folders', function (done) {
    const commonDefinitions = path.join('', 'folder1');
    const historyDefinition = path.join('', 'folder2');
    const srcFolder = path.join('', 'src');

    let cmd = 'cd ' + projectBaseBath + ' && ';
    cmd += 'node ../../../bin/apidoc';
    cmd += ' -i ' + commonDefinitions;
    cmd += ' -i ' + historyDefinition;
    cmd += ' -i ' + srcFolder;
    cmd += ' -o ../../../tmp/apidocmulti';
    cmd += ' -t ../../template/';

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
      let createdContent = fs.readFileSync(path.join(testTargetPath, name), 'utf8');

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

      if (fixtureLines.length !== createdLines.length) { throw new Error('File ' + path.join(testTargetPath, name) + ' not equals to ' + fixturePath + '/' + name); }

      for (let lineNumber = 0; lineNumber < fixtureLines.length; lineNumber += 1) {
        if (fixtureLines[lineNumber] !== createdLines[lineNumber]) {
          throw new Error('File ' + path.join(testTargetPath, name) + ' not equals to ' + fixturePath + '/' + name + ' in line ' + (lineNumber + 1) +
                        '\nfixture: ' + fixtureLines[lineNumber] +
                        '\ncreated: ' + createdLines[lineNumber],
          );
        }
      }
    });
    done();
  });
});
