/**
 * Test: apiDoc full parse
 */

// core
const apidoc = require('../lib/core/index');
// node_modules
const exec = require('child_process').exec;
const fs = require('fs-extra');
const path = require('path');
const assert = require('assert');

describe('apiDoc full example with no config path', function () {
  testFullExample();
});

describe('apiDoc full example with no config path for es output', function () {
  testFullExample(false, 'es');
});

describe('apiDoc full example with no config path for commonJS output', function () {
  testFullExample(false, 'commonJS');
});

describe('apiDoc full example with config path for .json file', function () {
  testFullExample('example/apidoc.json');
});

/* TODO
describe('apiDoc full example with config file in javascript', function () {
  testFullExample('./apidoc-test.config.js');
});

describe('apiDoc full example with config path for dir', function () {
  testFullExample('./apidoc-test/');
});
*/

function testFullExample (config, mode) {
  // find out which kind of config we have
  let isJson = false;
  let isJs = false;
  let isConfigDir = false;
  if (config) {
    isJson = config.substr(-5) === '.json';
    isJs = config.substr(-3) === '.js';
    isConfigDir = !isJson && !isJs;
  }
  //const configFilePath = isConfigDir ? path.join(config, 'apidoc.json') : config;

  // tests will happen in this directory
  const outputPath = './tmp';
  let fixturePath = './test/apidoc/fixtures';

  // adjust fixture path for different tests
  if (mode) {
    fixturePath += '-' + mode;
  }
  if (config) {
    fixturePath += '-withconfig';
  }

  const fixtureFiles = [
    'api_data.js',
    'api_data.json',
    'api_project.js',
    'api_project.json',
    'index.html',
  ];

  // clear output dir before each test
  before(function (done) {
    fs.removeSync(outputPath);
    done();
  });

  after(function (done) {
    done();
  });

  // create
  it('should create example in ' + outputPath, function (done) {
    let cmd = 'node ./bin/apidoc ' + (config ? ('-c ' + config) : '') + ' -i ' + 'example -o ' + outputPath + ' -t test/template/ -q';
    if (mode) {
      cmd += ' -m ' + mode;
    }

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

  // compare
  it('created files should equal to fixtures', function (done) {
    fixtureFiles.forEach(function (name) {
      let fixtureContent = fs.readFileSync(path.join(fixturePath, name), 'utf8');
      let createdContent = fs.readFileSync(path.join(outputPath,  name), 'utf8');

      const fixtureLines = fixtureContent.split(/\r?\n|\r/);
      const createdLines = createdContent.split(/\r?\n|\r/);

      // lines count should be the same
      if (fixtureLines.length !== createdLines.length) {
        throw new Error('File ./tmp/' + name + ' not equals to ' + fixturePath + '/' + name);
      }

      // now go over each line and compare them
      for (let lineNumber = 0; lineNumber < fixtureLines.length; lineNumber += 1) {
        // don't consider the time as it will always be different
        if (createdLines[lineNumber].trim().startsWith('"time"')) {
          continue;
        }
        if (createdLines[lineNumber].trim().startsWith('"version"')) {
          continue;
        }
        if (fixtureLines[lineNumber] !== createdLines[lineNumber]) {
          throw new Error('File ./tmp/' + name + ' not equals to ' + fixturePath + '/' + name + ' in line ' + (lineNumber + 1) +
                      '\nfixture: ' + fixtureLines[lineNumber] +
                      '\ncreated: ' + createdLines[lineNumber],
          );
        }
      }
    });
    done();
  });
}
