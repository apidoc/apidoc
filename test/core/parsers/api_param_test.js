/**
 * Test: Parser apiParam
 */
const assert = require('assert');

// lib modules
const parser = require('../../../lib/core/parsers/api_param');

describe('Parser: apiParam', function () {
  // TODO: Add 1.000 more possible cases ;-)
  const testCases = [
    {
      title: 'Simple fieldname only',
      content: 'simple',
      expected: {
        group: 'Parameter',
        type: undefined,
        size: undefined,
        allowedValues: undefined,
        optional: false,
        parentInfo: undefined,
        field: 'simple',
        defaultValue: undefined,
        description: '',
      },
    },
    {
      title: 'Type, Fieldname, Description',
      content: '{String} name The users name.',
      expected: {
        group: 'Parameter',
        type: 'String',
        size: undefined,
        allowedValues: undefined,
        optional: false,
        parentInfo: undefined,
        field: 'name',
        defaultValue: undefined,
        description: 'The users name.',
      },
    },
    {
      title: 'Type, Fieldname, Description',
      content: '{String|String[]} name The users name.',
      expected: {
        group: 'Parameter',
        type: 'String|String[]',
        size: undefined,
        allowedValues: undefined,
        optional: false,
        parentInfo: undefined,
        field: 'name',
        defaultValue: undefined,
        description: 'The users name.',
      },
    },
    {
      title: '$Simple fieldname only',
      content: '$simple',
      expected: {
        group: 'Parameter',
        type: undefined,
        size: undefined,
        allowedValues: undefined,
        optional: false,
        parentInfo: undefined,
        field: '$simple',
        defaultValue: undefined,
        description: '',
      },
    },
    {
      title: 'All options, with optional defaultValue',
      content: ' ( MyGroup ) { \\Object\\String.uni-code_char[] { 1..10 } = \'abc\', \'def\' }  ' +
                     '[ \\MyClass\\field.user_first-name = \'John Doe\' ] Some description.',
      expected: {
        group: 'MyGroup',
        type: '\\Object\\String.uni-code_char[]',
        size: '1..10',
        allowedValues: ['\'abc\'', '\'def\''],
        optional: true,
        parentInfo: undefined,
        field: '\\MyClass\\field.user_first-name',
        defaultValue: 'John Doe',
        description: 'Some description.',
      },
    },
    {
      title: 'All options, without optional-marker',
      content: ' ( MyGroup ) { \\Object\\String.uni-code_char[] { 1..10 } = \'abc\', \'def\' }  ' +
                     '\\MyClass\\field.user_first-name = \'John Doe\' Some description.',
      expected: {
        group: 'MyGroup',
        type: '\\Object\\String.uni-code_char[]',
        size: '1..10',
        allowedValues: ['\'abc\'', '\'def\''],
        optional: false,
        parentInfo: undefined,
        field: '\\MyClass\\field.user_first-name',
        defaultValue: 'John Doe',
        description: 'Some description.',
      },
    },
    {
      title: 'All options, without optional-marker, without default value quotes',
      content: ' ( MyGroup ) { \\Object\\String.uni-code_char[] { 1..10 } = \'abc\', \'def\' }  ' +
                     '\\MyClass\\field.user_first-name = John_Doe Some description.',
      expected: {
        group: 'MyGroup',
        type: '\\Object\\String.uni-code_char[]',
        size: '1..10',
        allowedValues: ['\'abc\'', '\'def\''],
        optional: false,
        parentInfo: undefined,
        field: '\\MyClass\\field.user_first-name',
        defaultValue: 'John_Doe',
        description: 'Some description.',
      },
    },
  ];

  // create
  it('case 1: should pass all regexp test cases', function (done) {
    testCases.forEach(function (testCase) {
      const parsed = parser.parse(testCase.content);
      // TODO
      //(parsed !== null).should.equal(true, 'Title: ' + testCase.title + ', Source: ' + testCase.content);
      assert.deepEqual(parsed, testCase.expected);
    });
    done();
  });
});
