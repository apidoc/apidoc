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

describe('apiDoc custom markdown parser', function() {

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

    var markdownFile     = './fixtures/custom_markdown_parser.js';
    var markdownFileBase = '../test/fixtures/custom_markdown_parser.js';

    before(function(done) {
        fs.removeSync('./tmp/');

        done();
    });

    after(function(done) {
        done();
    });

    // Render static text.
    it('should render static text with custom markdown parser', function(done) {
        var Markdown = require(markdownFile);
        var markdownParser = new Markdown();
        var text = markdownParser.render('some text');
        should(text).equal('Custom Markdown Parser: some text');
        done();
    });

    // create
    it('should create example in tmp/', function(done) {
        var cmd = 'node ./bin/apidoc -i ' + exampleBasePath + '/src/ -o tmp/ -t test/template/ --markdown ' + markdownFileBase + ' --silent';
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

    // Count how many custom parser text inserts where found.
    it('created files should have custom text', function(done) {
        var countCustomText = 0;
        fixtureFiles.forEach(function(name) {
            var createdContent = fs.readFileSync('./tmp/' + name, 'utf8');

            var createdLines = createdContent.split(/\n/);

            for (var lineNumber = 0; lineNumber < createdLines.length; lineNumber += 1) {
                if (createdLines[lineNumber].indexOf('Custom Markdown Parser: ') !== -1)
                    countCustomText++;
            }
        });

        should.notEqual(countCustomText, 0);

        done();
    });

});
