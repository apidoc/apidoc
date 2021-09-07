/**
 * Test: apiDoc custom markdown parser
 */
const apidoc = require('../../lib/core/index');

// node modules
const exec = require('child_process').exec;
const fs = require('fs-extra');
const path = require('path');
const assert = require('assert');

describe('test a custom markdown parser', () => {
  const markdownParser = path.join(process.cwd(), 'test/markdown/custom_markdown_parser.js');
  const Markdown = require(markdownParser);

  // Render static text.
  it('should render static text with custom markdown parser', function (done) {
    const markdownParser = new Markdown();
    const text = markdownParser.render('some text');
    assert.strictEqual(text, 'Custom Markdown Parser: some text');
    done();
  });
});
