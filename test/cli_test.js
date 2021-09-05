/**
 * CLI tests
 */
const exec = require('child_process').exec;
const pkgjson = require('../package.json');
const assert = require('assert');

describe('test cli options', function () {
  it('should show correct version', function (done) {
    const cmd = 'node ./bin/apidoc -V';

    exec(cmd, function (err, stdout, stderr) {
      if (err) { throw err; }

      if (stderr) { throw stderr; }
      assert.strictEqual(stdout.trim('\n'), pkgjson.version);

      done();
    });
  });

});
