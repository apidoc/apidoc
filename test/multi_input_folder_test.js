/*jshint unused:false, expr:true */

/**
 * Test: apiDoc creation from multiple folder
 */

var fs = require('fs-extra');
var exec = require('child_process').exec;
var path = require('path');
var should = require('should');

describe('apiDoc multiple folder input', function() {

    var fixturePath = 'test/multi_input_folder/fixtures';
    var projectBaseBath = 'test/multi_input_folder/testproject';

    var testTargetPath = "./tmp/apidocmulti";

    var fixtureFiles = [
        'api_data.js',
        'api_data.json',
        'api_project.js',
        'api_project.json',
        'index.html'
    ];

    before(function(done) {
        fs.removeSync(testTargetPath);

        done();
    });

    after(function(done) {
        done();
    });

    it('should create apidoc in /tmp/apidocmulti with multiple input folders', function(done) {

        var commonDefinitions = path.join('', 'folder1');
        var historyDefinition = path.join('', 'folder2');
        var srcFolder = path.join('', 'src');

        var cmd = 'cd ' + projectBaseBath + ' && ';
        cmd += 'node ../../../bin/apidoc';
        cmd += ' -i ' + commonDefinitions;
        cmd += ' -i ' + historyDefinition;
        cmd += ' -i ' + srcFolder;
        cmd += ' -o ../../../tmp/apidocmulti';
        cmd += ' -t ../../template/';

        exec(cmd, function(err, stdout, stderr) {
            if (err)
                throw err;

            if (stderr)
                throw stderr;

            done();
        });
    });

    it('created files should equal to fixtures', function(done) {
        var timeRegExp = /\"time\"\:\s\"(.*)\"/g;
        var versionRegExp = /\"version\"\:\s\"(.*)\"/g;
        var filenameRegExp = new RegExp('(?!"filename":\\s")(' + projectBaseBath + '/)', 'g');

        fixtureFiles.forEach(function(name) {
            var fixtureContent = fs.readFileSync(path.join(fixturePath, name), 'utf8');
            var createdContent = fs.readFileSync(path.join(testTargetPath, name), 'utf8');

            // creation time remove (never equal)
            fixtureContent = fixtureContent.replace(timeRegExp, '');
            createdContent = createdContent.replace(timeRegExp, '');

            // creation time remove (or fixtures must be updated every time the version change)
            fixtureContent = fixtureContent.replace(versionRegExp, '');
            createdContent = createdContent.replace(versionRegExp, '');

            // remove the base path
            createdContent = createdContent.replace(filenameRegExp, '');

            var fixtureLines = fixtureContent.split(/\n/);
            var createdLines = createdContent.split(/\n/);

            if (fixtureLines.length !== createdLines.length)
                throw new Error('File ' + path.join(testTargetPath, name) + ' not equals to ' + fixturePath + '/' + name);

            for (var lineNumber = 0; lineNumber < fixtureLines.length; lineNumber += 1) {
                if (fixtureLines[lineNumber] !== createdLines[lineNumber])
                    throw new Error('File ' + path.join(testTargetPath, name) + ' not equals to ' + fixturePath + '/' + name + ' in line ' + (lineNumber + 1) +
                        '\nfixture: ' + fixtureLines[lineNumber] +
                        '\ncreated: ' + createdLines[lineNumber]
                    );
            }
        });
        done();
    });
});
