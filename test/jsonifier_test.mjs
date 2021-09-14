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
 * Test the jsonifier
 */
import assert from 'assert';

import { body2json, beautify } from '../template/src/jsonifier.mjs';

describe('test jsonifier', function () {
  it('should convert properly fields to json', async function () {
    const context = [
      {
        'field': 'aaa',
        'type': 'String',
        'defaultValue': 'aaaDefault',
      },
      {
        'field': 'bbb.some',
        'type': 'String',
        'defaultValue': 'bbbsomedefault',
      },
      {
        'field': 'bbb.somebool',
        'type': 'Boolean',
        'defaultValue': true,
      },
    ];

    const fixture = {
      "aaa": "aaaDefault",
      "bbb": {
        "some": "bbbsomedefault",
        "somebool": true
      }
    };

    assert.strictEqual(body2json(context), beautify(fixture));
    return;
  });
});
