/**
 * Test the writer module
 */
const assert = require('assert');
const path = require('path');

const Writer = require('../lib/writer');

describe('test writer module', function () {
  it('should return false in simulate mode', function (done) {
    const options = {
      simulate: true,
    }
    const app = {
      options: options,
      log: {
        warn: msg => {},
      },
    };

    const writer = new Writer({}, app);
    assert.strictEqual(writer.write(), false);
    done();
  });
});
