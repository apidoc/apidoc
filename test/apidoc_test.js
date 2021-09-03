/**
 * Test: apiDoc full parse
 */

// core
const apidoc = require('../lib/core/index');
// node_modules
const exec = require('child_process').exec;
const fs = require('fs-extra');
const path = require('path');
const semver = require('semver');
const should = require('should');

const versions = require('apidoc-example').versions;

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
  testFullExample('./apidoc-test.json');
});

describe('apiDoc full example with config path for .js file', function () {
  testFullExample('./apidoc-test.config.js');
});

describe('apiDoc full example with config path for dir', function () {
  testFullExample('./apidoc-test/');
});

function testFullExample (config, mode) {
  let isJson = false;
  let isJs = false;
  let isConfigDir = false;
  if (config) {
    isJson = config.substr(-5) === '.json';
    isJs = config.substr(-3) === '.js';
    isConfigDir = !isJson && !isJs;
  }
  const configFilePath = isConfigDir ? path.join(config, 'apidoc.json') : config;

  // get latest example for the used apidoc-spec
  const latestExampleVersion = semver.maxSatisfying(versions, '~' + apidoc.getSpecificationVersion()); // ~0.2.0 = >=0.2.0 <0.3.0

  const exampleBasePath = 'node_modules/apidoc-example/' + latestExampleVersion;
  // todo: add es and commonJS files to apidoc-example
  const fixturePath = (mode ? './test/apidoc' : exampleBasePath) + '/fixtures';
  const filePath = exampleBasePath + '/src/apidoc.json';

  const apiData = 'api_data' + (mode ? '.' + mode : '') + '.js';
  const apiProject = 'api_project' + (mode ? '.' + mode : '') + '.js';

  const fixtureFiles = [
    apiData,
    'api_data.json',
    apiProject,
    'api_project.json',
    'index.html',
  ];

  before(function (done) {
    fs.removeSync('./tmp/');

    if (config) {
      if (isJs) {
        // Create .js config from apidoc.json.
        const jsonConfig = fs.readFileSync(filePath, 'utf8');
        fs.writeFileSync(configFilePath, 'module.exports = ' + jsonConfig + ';');
      } else {
        if (isConfigDir && !fs.existsSync(config)) {
          fs.mkdirSync(config);
        }
        fs.copyFileSync(filePath, configFilePath);
      }
    }

    done();
  });

  after(function (done) {
    if (config) {
      if (fs.existsSync(configFilePath)) {
        fs.unlinkSync(configFilePath);
      }
      if (isConfigDir && fs.existsSync(config)) {
        fs.rmdirSync(config);
      }
    }

    done();
  });

  // version found
  it('should find latest example version', function (done) {
    should(latestExampleVersion).be.ok;
    done();
  });

  // create
  it('should create example in tmp/', function (done) {
    let cmd = 'node ./bin/apidoc ' + (config ? ('-c ' + config) : '') + ' -i ' + exampleBasePath + '/src/ -o tmp/ -t test/template/ --silent';
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
    const timeRegExp = /\"time\"\:\s\"(.*)\"/g;
    const versionRegExp = /\"version\"\:\s\"(.*)\"/g;
    const filenameRegExp = new RegExp('(?!"filename":\\s")(' + exampleBasePath + '/)', 'g');

    fixtureFiles.forEach(function (name) {
      const outputName = mode ? name.replace('.' + mode, '') : name;
      let fixtureContent = fs.readFileSync(fixturePath + '/' + name, 'utf8');
      let createdContent = fs.readFileSync('./tmp/' + outputName, 'utf8');

      // creation time remove (never equal)
      fixtureContent = fixtureContent.replace(timeRegExp, '');
      createdContent = createdContent.replace(timeRegExp, '');

      // creation time remove (or fixtures must be updated every time the version change)
      fixtureContent = fixtureContent.replace(versionRegExp, '');
      createdContent = createdContent.replace(versionRegExp, '');

      // remove the base path
      createdContent = createdContent.replace(filenameRegExp, '');

      const fixtureLines = fixtureContent.split(/\r?\n|\r/);
      const createdLines = createdContent.split(/\r?\n|\r/);

      if (fixtureLines.length !== createdLines.length) { throw new Error('File ./tmp/' + outputName + ' not equals to ' + fixturePath + '/' + name); }

      for (let lineNumber = 0; lineNumber < fixtureLines.length; lineNumber += 1) {
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
