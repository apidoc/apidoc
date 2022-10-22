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
const path = require('path');

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

  it('getIndexContent shouldn\'t throws error', async function () {
    const app = {
      log: logger,
    };
    const writer = new Writer({}, app);
    assert.throws(writer.getIndexContent, Error);
  });

  it('should generate inline source maps if debug option is true', async function () {
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
});
