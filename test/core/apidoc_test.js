/* jshint unused:false, expr:true */

/**
 * Test: apiDoc full parse
 */

// node modules
const fs = require('fs');
const path = require('path');
const semver = require('semver');
const should = require('should');
const Markdown = require('markdown-it');

const versions = require('apidoc-example').versions;

// lib modules
const apidoc = require('../lib/index');

describe('apiDoc full parse', function () {
  // get latest example for the used apidoc-spec
  const latestExampleVersion = semver.maxSatisfying(versions, '~' + apidoc.getSpecificationVersion()); // ~0.2.0 = >=0.2.0 <0.3.0

  const exampleBasePath = 'node_modules/apidoc-example/' + latestExampleVersion;
  const fixturePath = exampleBasePath + '/fixtures';

  function log () {
    // can add an emitter here and capture it in the tests with chai-spies
  }

  const logger = {
    debug: log,
    verbose: log,
    info: log,
    warn: log,
    error: log,
  };

  const markdown = new Markdown({
    breaks: false,
    html: true,
    linkify: false,
    typographer: false,
  });

  const fixtureFiles = [
    { key: 'data', filename: 'api_data.json' },
    { key: 'project', filename: 'api_project.json' },
  ];

  let api = {};

  before(function (done) {
    done();
  });

  after(function (done) {
    done();
  });

  // version found
  it('should find latest example version', function (done) {
    should(latestExampleVersion).be.ok;
    done();
  });

  // create
  it('should create example in memory', function (done) {
    apidoc.setLogger(logger);
    apidoc.setGeneratorInfos({});
    apidoc.setMarkdownParser(markdown);
    apidoc.setPackageInfos({
      name: 'test',
      version: '0.5.0',
      description: 'RESTful web API Documentation Generator',
      url: 'https://api.github.com/v1',
      sampleUrl: 'https://api.github.com/v1',
      header: {
        title: 'My own header title',
        content: '<h1>Header .md File</h1>\n<p>Content of header.md file.</p>\n',
      },
      footer: {
        title: 'My own footer title',
        content: '<h1>Footer .md File</h1>\n<p>Content of footer.md file.</p>\n',
      },
      order: [
        'Error',
        'Define',
        'PostTitleAndError',
        'NotExistingEntry',
        'PostError',
        'GetParam',
      ],
    });

    api = apidoc.parse({
      src: exampleBasePath + '/src/',
      lineEnding: '\n',
    });

    if (api === false) { throw new Error('Parse failed.'); }

    done();
  });

  // compare
  it('memory should compare to fixtures', function (done) {
    const timeRegExp = /\"time\"\:\s\"(.*)\"/g;
    const versionRegExp = /\"version\"\:\s\"(.*)\"/g;
    const filenameRegExp = new RegExp('(?!"filename":\\s")(' + exampleBasePath + '/)', 'g');

    fixtureFiles.forEach(function (file) {
      const key = file.key;
      const name = fixturePath + '/' + file.filename;

      let fixtureContent = fs.readFileSync(name, 'utf8');
      let createdContent = api[key] + '\n'; // add linebreak at the end

      // creation time remove (never equal)
      fixtureContent = fixtureContent.replace(timeRegExp, '');
      createdContent = createdContent.replace(timeRegExp, '');

      // creation time remove (or fixtures must be updated every time the version change)
      fixtureContent = fixtureContent.replace(versionRegExp, '');
      createdContent = createdContent.replace(versionRegExp, '');

      // remove the base path
      createdContent = createdContent.replace(filenameRegExp, '');

      // split and compare each line
      // TODO: compare objects not line by line
      const fixtureLines = fixtureContent.split(/\n/);
      const createdLines = createdContent.split(/\n/);

      //            if (fixtureLines.length !== createdLines.length)
      //                throw new Error(key + ' not equals to ' + name);

      for (let lineNumber = 0; lineNumber < fixtureLines.length; lineNumber += 1) {
        if (fixtureLines[lineNumber] !== createdLines[lineNumber]) {
          throw new Error(key + ' not equals to ' + name + ' in line ' + (lineNumber + 1) +
                        '\nfixture: ' + fixtureLines[lineNumber] +
                        '\ncreated: ' + createdLines[lineNumber],
          );
        }
      }
    });
    done();
  });
});
