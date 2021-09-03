/**
 * Test: apiDoc full parse
 */

// core
const apidoc = require('../lib/core/index');
// node_modules
const exec = require('child_process').exec;
const fs = require('fs-extra');
const path = require('path');
const should = require('should');

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
  testFullExample('apidoc.json');
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
  const configFilePath = isConfigDir ? path.join(config, 'apidoc.json') : config;

  // tests will happen in this directory
  const outputPath = './tmp';
  const fixturePath = './test/apidoc/fixtures';

  // es and commonJS modes will get different fixture files in js
  let extension = '';
  if (mode) {
    extension =  '.' + mode;
  }
  const apiData = 'api_data' + extension + '.js';
  const apiProject = 'api_project' + extension + '.js';

  const fixtureFiles = [
    apiData,
    'api_data.json',
    apiProject,
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
    let cmd = 'node ./bin/apidoc ' + (config ? ('-c ' + config) : '') + ' -i ' + 'example -o ' + outputPath + ' -t test/template/ --silent';
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
      fs.existsSync(fixturePath + '/' + name).should.eql(true);
    });
    done();
  });

  // compare
  it('created files should equal to fixtures', function (done) {
    fixtureFiles.forEach(function (name) {
      // with a config the fixture name is not the same
      let configext = '';
      if (config) {
        configext = 'withconfig';
      }
      const outputFixName = config ? name.replace('.js', '.withconfig.js') : name;
      let fixtureContent = fs.readFileSync(fixturePath + '/' + outputFixName, 'utf8');

      const outputName = mode ? name.replace('.' + mode, '') : name;
      let createdContent = fs.readFileSync('./tmp/' + outputName, 'utf8');

      const fixtureLines = fixtureContent.split(/\r?\n|\r/);
      const createdLines = createdContent.split(/\r?\n|\r/);

      // lines count should be the same
      if (fixtureLines.length !== createdLines.length) {
        throw new Error('File ./tmp/' + outputName + ' not equals to ' + fixturePath + '/' + name);
      }

      // now go over each line and compare them
      for (let lineNumber = 0; lineNumber < fixtureLines.length; lineNumber += 1) {
        // don't consider the time as it will always be different
        if (createdLines[lineNumber].trim().startsWith('"time"')) {
          continue;
        }
        if (fixtureLines[lineNumber] !== createdLines[lineNumber]) {
          throw new Error('File ./tmp/' + outputName + ' not equals to ' + fixturePath + '/' + name + ' in line ' + (lineNumber + 1) +
                      '\nfixture: ' + fixtureLines[lineNumber] +
                      '\ncreated: ' + createdLines[lineNumber],
          );
        }
      }
    });
    done();
  });
}
