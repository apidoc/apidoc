/**
 * Test the options module
 */
const assert = require('assert');
const path = require('path');

const optionsProcessor = require('../lib/options');

describe('test options module', function () {
  it('should provide default options when no options are given', function (done) {
    const processedOptions = optionsProcessor.process({});
    assert.deepEqual(processedOptions, optionsProcessor.defaultOptions);
    done();
  });

  it('should provide correct options when options are given', function (done) {
    const options = {
      src: [path.join('some', 'path')],
      dest: path.join('output', 'path'),
      debug: true,
    };
    const processedOptions = optionsProcessor.process(options);
    assert.strictEqual(processedOptions.src, options.src);
    assert.strictEqual(processedOptions.dest, options.dest + path.sep);
    assert.strictEqual(processedOptions.debug, options.debug);
    done();
  });

  it('should read input/output paths from config file', function (done) {
    const options = {
      config: 'example/apidoc.json',
    };
    // read the apidoc.json file
    const apidocJson = require('../example/apidoc.json');
    // convert path to platform variant
    apidocJson.output = path.resolve(apidocJson.output.replace(/[\\\/]/g, path.sep));
    const processedOptions = optionsProcessor.process(options);

    assert.deepEqual(processedOptions.src, apidocJson.input.map(p => path.resolve(p) + path.sep));
    assert.strictEqual(processedOptions.dest, path.resolve(apidocJson.output) + path.sep);
    done();
  });
});
