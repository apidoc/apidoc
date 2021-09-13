/**
 * Test: apiDoc full parse
 */

// node_modules
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const fs = require('fs-extra');
const path = require('path');
const assert = require('assert');

describe('apiDoc full example with no config path', function () {
  testFullExample();
});

describe('apiDoc full example with config path for .json file', function () {
  testFullExample('example/apidoc.json');
});

function testFullExample (config) {
  // tests will happen in this directory
  const outputPath = './tmp';

  // clear output dir before each test
  before(function (done) {
    fs.removeSync(outputPath);
    done();
  });

  after(function (done) {
    done();
  });

  // create
  it('should create example in ' + outputPath, async function () {
    const cmd = 'node ./bin/apidoc ' + (config ? '-c ' + config : '') + ' -i ' + 'example -o ' + outputPath + ' -q -d';
    const { stdout, stderr } = await exec(cmd);
  }).timeout(80000);

  // check we actually created output files
  it('should find created files', done => {
    const outputFiles = [
      'assets/main.bundle.js',
      'index.html',
    ];

    outputFiles.forEach(name => {
      const res = fs.existsSync(path.join(outputPath, name));
      assert.strictEqual(res, true);
    });
    done();
  });
}
