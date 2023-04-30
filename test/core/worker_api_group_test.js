/**
 * Test: Parser apiGroup
 */

// node modules
const assert = require('assert');

// lib modules
const worker = require('../../lib/core/workers/api_group');

describe('Worker: apiGroup', function () {

  const parsedFiles = [
    [
      {
        global: {},
        local: {
          group: 'Category_(official)',
        },
        version: '0.0.1'
      }
    ],
  ];

  const preProcess = {
    defineGroup: {}
  };

  // test parenthesis
  it('should handle parentheses correctly', function (done) {
    worker.postProcess (parsedFiles, undefined, preProcess);

    const rootBlock = parsedFiles[0][0];

    assert.strictEqual(rootBlock.local.group, 'Category_official');
    assert.strictEqual(rootBlock.local.groupTitle, 'Category_(official)');

    done();
  });

});
