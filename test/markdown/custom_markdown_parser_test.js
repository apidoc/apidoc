/**
 * Test: apiDoc custom markdown parser
 */
const apidoc = require('../../lib/core/index');

// node modules
const exec = require('child_process').exec;
const fs = require('fs-extra');
const path = require('path');
const assert = require('assert');

describe('apiDoc custom markdown parser', function () {
  const inputPath = './example';
  const outputPath = './tmp';
  const fixturePath = './test/markdown/fixtures';

  const fixtureFiles = [
    'api_data.js',
    'api_data.json',
    'api_project.js',
    'api_project.json',
    'index.html',
  ];

  const markdownParser = path.join(process.cwd(), 'test/markdown/custom_markdown_parser.js');
  const Markdown = require(markdownParser);

  before(function (done) {
    fs.removeSync(outputPath);
    done();
  });

  after(function (done) {
    done();
  });

  // Render static text.
  it('should render static text with custom markdown parser', function (done) {
    const markdownParser = new Markdown();
    const text = markdownParser.render('some text');
    assert.strictEqual(text, 'Custom Markdown Parser: some text');
    done();
  });

  // create
  it('should create example in ' + outputPath, function (done) {
    const cmd = 'node ./bin/apidoc -i ' + inputPath + ' -o ' + outputPath + ' -t test/template/ --markdown ' + markdownParser + ' --silent';
    exec(cmd, function (err, stdout, stderr) {
      if (err) { throw err; }

      if (stderr) { throw stderr; }

      done();
    });
  });

  // check
  it('should find created files', function (done) {
    fixtureFiles.forEach(function (name) {
      const res = fs.existsSync(fixturePath + '/' + name);
      assert.strictEqual(res, true);
    });
    done();
  });

  // Count how many custom parser text inserts where found.
  it('created files should have custom text', function (done) {
    let countCustomText = 0;
    fixtureFiles.forEach(function (name) {
      const createdContent = fs.readFileSync(path.join(outputPath, name), 'utf8');

      const createdLines = createdContent.split(/\n/);

      for (let lineNumber = 0; lineNumber < createdLines.length; lineNumber += 1) {
        if (createdLines[lineNumber].indexOf('Custom Markdown Parser: ') !== -1) { countCustomText++; }
      }
    });

    assert.notEqual(countCustomText, 0);

    done();
  });
});
