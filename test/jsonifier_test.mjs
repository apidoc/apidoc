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
      // ----------
      {
        'field': 'aaa',
        'type': 'String',
        'defaultValue': 'aaaDefault',
      },
      // ----------
      {
        'field': 'bbb',
        'type': 'Object'
      },
      {
        'parentInfos': {path: 'bbb', type: 'Object'},
        'field': 'bbb.some',
        'type': 'String',
        'defaultValue': 'bbbsomedefault',
      },
      {
        'parentInfos': {path: 'bbb', type: 'Object'},
        'field': 'bbb.somebool',
        'type': 'Boolean',
        'defaultValue': true,
      },
      // ----------
      {
        'field': 'ccc',
        'type': 'Object[]'
      },
      {
        'parentInfos': {path: 'ccc', type: 'Object[]'},
        'field': 'ccc.some',
        'type': 'String',
        'defaultValue': 'cccsomedefault',
      },
      {
        'parentInfos': {path: 'ccc', type: 'Object[]'},
        'field': 'ccc.somebool',
        'type': 'Boolean',
        'defaultValue': true,
      },
      // ----------
      {
        type: 'Object',
        parentInfos: undefined,
        field: 'A'
      },
      {
        type: 'Number',
        parentInfos: { path: 'A', type: 'Object' },
        field: 'A.b'
      },
      {
        type: 'Object[]',
        parentInfos: { path: 'A', type: 'Object' },
        field: 'A.c'
      },
      {
        type: 'String',
        parentInfos: { path: 'A.c', type: 'Object[]' },
        field: 'A.c.b'
      },
      {
        type: 'Object[]',
        parentInfos: { path: 'A.c', type: 'Object[]' },
        field: 'A.c.c'
      },
      {
        type: 'String',
        parentInfos: { path: 'A.c.c', type: 'Object[]' },
        field: 'A.c.c.a'
      },
      {
        type: 'Number[]',
        parentInfos: { path: 'A.c.c', type: 'Object[]' },
        field: 'A.c.c.b'
      },
      {
        type: 'Object[]',
        parentInfos: { path: 'A.c.c', type: 'Object[]' },
        field: 'A.c.c.c'
      },
      {
        type: 'String',
        parentInfos: { path: 'A.c.c.c', type: 'Object[]' },
        field: 'A.c.c.c.b'
      }
    ];

    const fixture = {
      "aaa": "aaaDefault",
      "bbb": {
        "some": "bbbsomedefault",
        "somebool": true
      },
      "ccc":
      [
        {
          "some": "cccsomedefault",
          "somebool": true
        }
      ],
      "A": {
        "b": 0,
        "c":
        [
          {
            "b": "",
            "c":
            [
              {
                "a": "",
                "b": [],
                "c":
                [
                  {
                    "b": ""
                  }
                ]
              }
            ]
          }
        ]
      }
    };

    assert.strictEqual(body2json(context), beautify(fixture));
    return;
  });
});
