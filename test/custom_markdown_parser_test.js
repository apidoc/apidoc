/**
 * Test: apiDoc full parse
 */

// node modules
const apidoc = require('../lib/core/index');
const exec = require('child_process').exec;
const fs = require('fs-extra');
const path = require('path');
const semver = require('semver');
const should = require('should');

const versions = require('apidoc-example').versions;

describe('apiDoc custom markdown parser', function () {
  // get latest example for the used apidoc-spec
  const latestExampleVersion = semver.maxSatisfying(versions, '~' + apidoc.getSpecificationVersion()); // ~0.2.0 = >=0.2.0 <0.3.0

  const exampleBasePath = 'node_modules/apidoc-example/' + latestExampleVersion;
  const fixturePath = exampleBasePath + '/fixtures';

  const fixtureFiles = [
    'api_data.js',
    'api_data.json',
    'api_project.js',
    'api_project.json',
    'index.html',
  ];

  const markdownFile = './fixtures/custom_markdown_parser.js';
  const markdownFileBase = '../test/fixtures/custom_markdown_parser.js';
  const markdownFileBase1 = './test/fixtures/custom_markdown_parser.js';
  const markdownFileBase2 = 'test/fixtures/custom_markdown_parser.js';
  const markdownFileBase3 = path.join(process.cwd(), 'test/fixtures/custom_markdown_parser.js');

  before(function (done) {
    fs.removeSync('./tmp/');

    done();
  });

  after(function (done) {
    done();
  });

  // Render static text.
  it('should render static text with custom markdown parser', function (done) {
    const Markdown = require(markdownFile);
    const markdownParser = new Markdown();
    const text = markdownParser.render('some text');
    should(text).equal('Custom Markdown Parser: some text');
    done();
  });

  // create
  it('should create example in tmp/', function (done) {
    const cmd = 'node ./bin/apidoc -i ' + exampleBasePath + '/src/ -o tmp/ -t test/template/ --markdown ' + markdownFileBase + ' --silent';
    exec(cmd, function (err, stdout, stderr) {
      if (err) { throw err; }

      if (stderr) { throw stderr; }

      done();
    });
  });

  it('should create example in tmp/ with relative parser location', function (done) {
    const cmd = 'node ./bin/apidoc -i ' + exampleBasePath + '/src/ -o tmp/ -t test/template/ --markdown ' + markdownFileBase1 + ' --silent';
    exec(cmd, function (err, stdout, stderr) {
      if (err) { throw err; }

      if (stderr) { throw stderr; }

      done();
    });
  });

  it('should create example in tmp/ with cwd parser location', function (done) {
    const cmd = 'node ./bin/apidoc -i ' + exampleBasePath + '/src/ -o tmp/ -t test/template/ --markdown ' + markdownFileBase2 + ' --silent';
    exec(cmd, function (err, stdout, stderr) {
      if (err) { throw err; }

      if (stderr) { throw stderr; }

      done();
    });
  });

  it('should create example in tmp/ with absolute parser location', function (done) {
    const cmd = 'node ./bin/apidoc -i ' + exampleBasePath + '/src/ -o tmp/ -t test/template/ --markdown ' + markdownFileBase3 + ' --silent';
    exec(cmd, function (err, stdout, stderr) {
      if (err) { throw err; }

      if (stderr) { throw stderr; }

      done();
    });
  });

  // check
  it('should find created files', function (done) {
    fixtureFiles.forEach(function (name) {
      fs.existsSync(fixturePath + '/' + name).should.eql(true);
    });
    done();
  });

  // Count how many custom parser text inserts where found.
  it('created files should have custom text', function (done) {
    let countCustomText = 0;
    fixtureFiles.forEach(function (name) {
      const createdContent = fs.readFileSync('./tmp/' + name, 'utf8');

      const createdLines = createdContent.split(/\n/);

      for (let lineNumber = 0; lineNumber < createdLines.length; lineNumber += 1) {
        if (createdLines[lineNumber].indexOf('Custom Markdown Parser: ') !== -1) { countCustomText++; }
      }
    });

    should.notEqual(countCustomText, 0);

    done();
  });
});
