/*
 * apidoc
 * https://apidocjs.com
 *
 * Authors:
 * Peter Rottmann <rottmann@inveris.de>
 * Nicolas CARPi @ Deltablot
 * Copyright (c) 2013 inveris OHG
 * Licensed under the MIT license.
 */

/**
 * Test the writer module
 */
const assert = require('assert');
const logger = require('./silentlogger');
const Writer = require('../lib/writer');

describe('test writer module', function () {
  it('should work in dry run mode', async function () {
    const app = {
      options: {
        dryRun: true,
      },
      log: logger,
    };

    const writer = new Writer({}, app);
    return writer.write();
  });

  it('should work in dry run mode with debug option', async function () {
    const app = {
      options: {
        dryRun: true,
        debug: true,
      },
      log: logger,
    };
    const writer = new Writer({}, app);
    return writer.write();
  });

  it('getIndexContent() should throw an error if project (apiProject) is undefined', async function () {
    const app = {
      log: logger,
    };
    const writer = new Writer({}, app);
    assert.throws(writer.getIndexContent, Error);
  });
});
