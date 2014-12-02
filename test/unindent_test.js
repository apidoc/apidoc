var should = require('should');

var unindent = require('../lib/utils/unindent');

describe('unindent', function() {

    it('should strip common leading spaces', function(done) {
        unindent('  a\n    b\n   c').should.equal('a\n  b\n c');
        done();
    });

    it('should strip common leading tabs', function(done) {
        unindent('\t\ta\n\t\t\t\tb\n\t\t\tc').should.equal('a\n\t\tb\n\tc');
        done();
    });

    it('should strip all leading whitespace from a single line', function(done) {
        unindent('   \t   a').should.equal('a');
        done();
    });

    it('should not modify the empty string', function(done) {
        var s = '';
        unindent(s).should.equal(s);
        done();
    });

    it('should not modify if any line starts with non-whitespace', function(done) {
        var s = '    a\n   b\nc   d\n   e';
        unindent(s).should.equal(s);
        done();
    });
});
