/**
 * Test: Util unindent
 */
const assert = require('assert');

// lib modules
const unindent = require('../../lib/core/utils/unindent');

describe('Util: unindent', function () {
  it('should strip common leading spaces', function (done) {
    assert.strictEqual(unindent('  a\n    b\n   c'), 'a\n  b\n c');
    done();
  });

  it('should strip common leading tabs', function (done) {
    assert.strictEqual(unindent('\t\ta\n\t\t\t\tb\n\t\t\tc'), 'a\n\t\tb\n\tc');
    done();
  });

  it('should strip all leading whitespace from a single line', function (done) {
    assert.strictEqual(unindent('   \t   a'), 'a');
    done();
  });

  it('should not modify the empty string', function (done) {
    const s = '';
    assert.strictEqual(unindent(s), s);
    done();
  });

  it('should not modify if any line starts with non-whitespace', function (done) {
    const s = '    a\n   b\nc   d\n   e';
    assert.strictEqual(unindent(s), s);
    done();
  });

  it('should strip common leading tabs and keep spaces', function (done) {
    assert.strictEqual(unindent('\ta\n\t  b\n\t c'), 'a\n  b\n c');
    done();
  });

  it('should strip common leading tabs and 1 space on each line', function (done) {
    assert.strictEqual(unindent('\t  a\n\t  b\n\t c'), ' a\n b\nc');
    done();
  });
});
