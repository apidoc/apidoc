/**
 * Test: apidoc.js
 */

// Node Module
var should = require('should');
var fs = require('fs');
var sys = require('sys');
var exec = require('child_process').exec;

/* --------------------------------------------------------------------------------
 * Tests
 * -------------------------------------------------------------------------------- */
describe('apiDoc full example', function() {

    var fixtureFiles = [
        'api_data.js',
        'api_data.json',
        'api_project.js',
        'api_project.json',
        'index.html'
    ];

    before(function(done) {
        done();
    });

    after(function(done) {
        done();
    });

    // create
    it('case 1: should create example in tmp/', function(done) {
        exec('node ./bin/apidoc -i test/fixtures/example/ -o tmp/ -t test/template/ --silent', function(err, stdout, stderr) {
            if (err) throw err;
            if (stderr) throw stderr;
            done();
        });
    });

    // check
    it('case 1: should find created files', function(done) {
        fixtureFiles.forEach(function(name) {
            fs.existsSync('./tmp/' + name).should.eql(true);
        });
        done();
    });

    // compare
    it('case 1: created files should equal to fixtures', function(done) {
        var timeRegExp = /'time'\:\s'(.*)'/g;
        var versionRegExp = /'version'\:\s'(.*)'/g;
        fixtureFiles.forEach(function(name) {
            var fixtureContent = fs.readFileSync('test/fixtures/' + name, 'utf8');
            var createdContent = fs.readFileSync('./tmp/' + name, 'utf8');

            // creation time remove (never equal)
            fixtureContent = fixtureContent.replace(timeRegExp, '');
            createdContent = createdContent.replace(timeRegExp, '');

            // creation time remove (or fixtures must be updated every time the version change)
            fixtureContent = fixtureContent.replace(versionRegExp, '');
            createdContent = createdContent.replace(versionRegExp, '');

            var fixtureLines = fixtureContent.split(/\r\n/);
            var createdLines = createdContent.split(/\r\n/);

            if (fixtureLines.length !== createdLines.length)
                throw new Error('File ./tmp/' + name + ' not equals to test/fixutres/' + name);

            for (var lineNumber = 0; lineNumber < fixtureLines.length; lineNumber += 1) {
                if (fixtureLines[lineNumber] !== createdLines[lineNumber])
                    throw new Error('File ./tmp/' + name + ' not equals to test/fixutres/' + name + ' in line ' + (lineNumber + 1));
            }
        });
        done();
    });

});
