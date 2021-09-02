const deepEqual = require('deep-equal');
const parser = require('../../lib/parsers/api_param');

const supportedSpecialCharacters = [
  '#',
  '@',
  '.',
];

function getTestDataForCharacter (character) {
  return [
    {
      input: '(params) {String} [' + character + 'id] Id of the product',
      expected: {
        group: 'params',
        type: 'String',
        size: undefined,
        allowedValues: undefined,
        optional: true,
        field: character + 'id',
        defaultValue: undefined,
        description: 'Id of the product',
      },
    },
    {
      input: '(params) {String} [' + character + 'i' + character + 'd] Id of the product',
      expected: {
        group: 'params',
        type: 'String',
        size: undefined,
        allowedValues: undefined,
        optional: true,
        field: character + 'i' + character + 'd',
        defaultValue: undefined,
        description: 'Id of the product',
      },
    },
    {
      input: '(params) {String} ' + character + 'id Id of the product',
      expected: {
        group: 'params',
        type: 'String',
        size: undefined,
        allowedValues: undefined,
        optional: false,
        field: character + 'id',
        defaultValue: undefined,
        description: 'Id of the product',
      },
    },
    {
      input: '(params) {String=foo,bar} ' + character + 'id="foo" Id of the product',
      expected: {
        group: 'params',
        type: 'String',
        size: undefined,
        allowedValues: [
          'foo',
          'bar',
        ],
        optional: false,
        field: character + 'id',
        defaultValue: 'foo',
        description: 'Id of the product',
      },
    },
  ];
}

describe('api param parser', function () {
  supportedSpecialCharacters.forEach(function (character) {
    it('Should be able to correctly parse params with special character ' + character, function (done) {
      const dataObjects = getTestDataForCharacter(character);

      dataObjects.forEach(function (data) {
        const result = parser.parse(data.input);

        if (!deepEqual(result, data.expected)) {
          done(new Error('Expected result to be:\n' + JSON.stringify(data.expected, undefined, '\t') + '\n got:\n ' + JSON.stringify(result, undefined, '\t')));
        }
      });

      done();
    });
  });
});
