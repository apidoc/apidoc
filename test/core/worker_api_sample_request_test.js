/**
 * Test: Parser apiSampleRequest
 */

// node modules
const assert = require('assert');

// lib modules
const worker = require('../../lib/core/workers/api_sample_request');

describe('Worker: apiSampleRequest', function () {

  const packageInfos = { sampleUrl: 'http://example.com' };
 
  const parsedFiles = [
    {
      title: 'should handle off value',
      expected: {},
      testBlock: {
        global: {},
        local: { sampleRequest: [ { url: 'off' } ] },
        version: '0.0.1'
      }
    },
    {
      title: 'should handle absolute url',
      expected: {sampleRequest: [ {url: 'http://example.com'} ]},
      testBlock: {
        global: {},
        local: { sampleRequest: [ { url: 'http://example.com' } ] },
        version: '0.0.1'
      }
    },
    {
      title: 'case 1: should handle relative url',
      expected: {sampleRequest: [ {url: 'http://example.com/api'} ]},
      testBlock: {
        global: {},
        local: { sampleRequest: [ { url: '/api' } ] },
        version: '0.0.1'
      }
    },
    {
      title: 'case 2: should handle relative url',
      expected: {sampleRequest: [ {url: 'http://example.com/ap'} ]},
      testBlock: {
        global: {},
        local: { sampleRequest: [ { url: '/ap' } ] },
        version: '0.0.1'
      }
    }

  ];

  parsedFiles.forEach(testCase => {
    it(testCase.title, done => {
      const blocks = [[testCase.testBlock]];
      worker.postProcess (blocks, undefined, undefined, packageInfos);

      const rootBlock = blocks[0][0];
      assert.deepEqual(rootBlock.local, testCase.expected);

      done();
    });
  });
});
