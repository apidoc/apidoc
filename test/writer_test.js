/**
 * Test the writer module
 */
const assert = require('assert');
const path = require('path');

const logger = require('./silentlogger');
const Writer = require('../lib/writer');

describe('test writer module', function () {
  it('should return false in dry run mode', function (done) {
    const app = {
      options: {
        dryRun: true,
      },
      log: logger,
    };

    const writer = new Writer({}, app);
    assert.strictEqual(writer.write(), false);
    done();
  });
});
