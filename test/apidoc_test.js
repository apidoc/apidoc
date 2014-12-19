/*jshint unused:false, expr:true */

/**
 * Test: apiDoc full parse
 */

// node modules
var apidoc = require('apidoc-core');
var exec   = require('child_process').exec;
var fs     = require('fs-extra');
var path   = require('path');
var semver = require('semver');
var should = require('should');

var versions = require('apidoc-example').versions;

describe('apiDoc full example', function() {

    // get latest example for the used apidoc-spec
    var latestExampleVersion = semver.maxSatisfying(versions, '~' + apidoc.getSpecificationVersion()); // ~0.2.0 = >=0.2.0 <0.3.0

    var exampleBasePath = 'node_modules/apidoc-example/' + latestExampleVersion;
    var fixturePath = exampleBasePath + '/fixtures';

    var fixtureFiles = [
        'api_data.js',
        'api_data.json',
        'api_project.js',
        'api_project.json',
        'index.html'
    ];

    before(function(done) {
        fs.removeSync('./tmp/');

        done();
    });

    after(function(done) {
        done();
    });

    // version found
    it('should find latest example version', function(done) {
        should(latestExampleVersion).be.ok;
        done();
    });

    // create
    it('should create example in tmp/', function(done) {
        var cmd = 'node ./bin/apidoc -i ' + exampleBasePath + '/src/ -o tmp/ -t test/template/ --silent';
        exec(cmd, function(err, stdout, stderr) {
            if (err)
                throw err;

            if (stderr)
                throw stderr;

            done();
        });
    });

    // check
    it('should find created files', function(done) {
        fixtureFiles.forEach(function(name) {
            fs.existsSync(fixturePath + '/' + name).should.eql(true);
        });
        done();
    });

    // compare
    it('created files should equal to fixtures', function(done) {
        var timeRegExp = /\"time\"\:\s\"(.*)\"/g;
        var versionRegExp = /\"version\"\:\s\"(.*)\"/g;
        var filenameRegExp = new RegExp('(?!"filename":\\s")(' + exampleBasePath + '/)', 'g');

        fixtureFiles.forEach(function(name) {
            var fixtureContent = fs.readFileSync(fixturePath + '/' + name, 'utf8');
            var createdContent = fs.readFileSync('./tmp/' + name, 'utf8');

            // creation time remove (never equal)
            fixtureContent = fixtureContent.replace(timeRegExp, '');
            createdContent = createdContent.replace(timeRegExp, '');

            // creation time remove (or fixtures must be updated every time the version change)
            fixtureContent = fixtureContent.replace(versionRegExp, '');
            createdContent = createdContent.replace(versionRegExp, '');

            // remove the base path
            createdContent = createdContent.replace(filenameRegExp, '');

            var fixtureLines = fixtureContent.split(/\r\n/);
            var createdLines = createdContent.split(/\r\n/);

            if (fixtureLines.length !== createdLines.length)
                throw new Error('File ./tmp/' + name + ' not equals to ' + fixturePath + '/' + name);

            for (var lineNumber = 0; lineNumber < fixtureLines.length; lineNumber += 1) {
                if (fixtureLines[lineNumber] !== createdLines[lineNumber])
                    throw new Error('File ./tmp/' + name + ' not equals to ' + fixturePath + '/' + name + ' in line ' + (lineNumber + 1) +
                        '\nfixture: ' + fixtureLines[lineNumber] +
                        '\ncreated: ' + createdLines[lineNumber]
                    );
            }
        });
        done();
    });

});
