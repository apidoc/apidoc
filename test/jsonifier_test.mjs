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
        'parentInfo': {path: 'bbb', type: 'Object'},
        'field': 'bbb.some',
        'type': 'String',
        'defaultValue': 'bbbsomedefault',
      },
      {
        'parentInfo': {path: 'bbb', type: 'Object'},
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
        'parentInfo': {path: 'ccc', type: 'Object[]'},
        'field': 'ccc.some',
        'type': 'String',
        'defaultValue': 'cccsomedefault',
      },
      {
        'parentInfo': {path: 'ccc', type: 'Object[]'},
        'field': 'ccc.somebool',
        'type': 'Boolean',
        'defaultValue': true,
      },
      // ----------
      {
        type: 'Object',
        parentInfo: undefined,
        field: 'A'
      },
      {
        type: 'Number',
        parentInfo: { path: 'A', type: 'Object' },
        field: 'A.b'
      },
      {
        type: 'Object[]',
        parentInfo: { path: 'A', type: 'Object' },
        field: 'A.c'
      },
      {
        type: 'String',
        parentInfo: { path: 'A.c', type: 'Object[]' },
        field: 'A.c.b'
      },
      {
        type: 'Object[]',
        parentInfo: { path: 'A.c', type: 'Object[]' },
        field: 'A.c.c'
      },
      {
        type: 'String',
        parentInfo: { path: 'A.c.c', type: 'Object[]' },
        field: 'A.c.c.a'
      },
      {
        type: 'Number[]',
        parentInfo: { path: 'A.c.c', type: 'Object[]' },
        field: 'A.c.c.b'
      },
      {
        type: 'Object[]',
        parentInfo: { path: 'A.c.c', type: 'Object[]' },
        field: 'A.c.c.c'
      },
      {
        type: 'String',
        parentInfo: { path: 'A.c.c.c', type: 'Object[]' },
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
