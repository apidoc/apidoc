/**
 * Test: parseSource
 */
const apidoc = require('../../lib/core/index');
const assert = require('assert');

class LogCatcher {
  constructor () {
    this.logs = {
      debug: [],
      verbose: [],
      info: [],
      warn: [],
      error: [],
    };
  }
  debug(msg) {
    this.logs.debug.push(msg);
  }
  verbose(msg) {
    this.logs.verbose.push(msg);
  }
  info(msg) {
    this.logs.info.push(msg);
  }
  warn(msg) {
    this.logs.warn.push(msg);
  }
  error(msg) {
    this.logs.error.push(msg);
  }
}

describe('parseSource', function () {
  const testCases = [
    {
      source:
        `/**
          * @api                   {post}   /api/school/students/:studentId/:name/cloth  getStudentCloth
          * @apiName                        createCloth
          * @apiGroup                       cloth
          * @apiParam                       id
          * @apiParam (body)       {String} name
          * @apiParam (pagination) {Number} [offset]
          * @apiSuccess            {Number} code  200
          * @apiSuccessExample     {json} Success-Response:
          * {
          *     status: 200
          * }
          */`,
      expected: {
        global: {},
        local: {
          type: 'post',
          url: '/api/school/students/:studentId/:name/cloth',
          title: 'getStudentCloth',
          name: 'createCloth',
          group: 'cloth',
          parameter: {
            fields: {
              Parameter: [
                {
                  allowedValues: undefined,
                  defaultValue: undefined,
                  description: '',
                  field: 'id',
                  group: 'Parameter',
                  optional: false,
                  size: undefined,
                  type: undefined,
                }
              ],
              body: [
                {
                  allowedValues: undefined,
                  defaultValue: undefined,
                  description: '',
                  field: 'name',
                  group: 'body',
                  optional: false,
                  size: undefined,
                  type: 'String',
                },
              ],
              pagination: [
                {
                  allowedValues: undefined,
                  defaultValue: undefined,
                  description: '',
                  field: 'offset',
                  group: 'pagination',
                  optional: true,
                  size: undefined,
                  type: 'Number',
                },
              ],
            },
          },
          success: {
            fields: {
              'Success 200': [
                {
                  allowedValues: undefined,
                  defaultValue: undefined,
                  group: 'Success 200',
                  type: 'Number',
                  optional: false,
                  field: 'code',
                  description: '200',
                  size: undefined,
                },
              ],
            },
            examples: [
              {
                title: 'Success-Response:',
                content: '{\n    status: 200\n}',
                type: 'json',
              },
            ],
          },
        },
        index: 1,
      },
      logs: {
        warn: [
          "URL contains a parameter ':studentId' that is not documented as @apiParam in @api 'getStudentCloth' in file: 'app.js'",
          "@apiParam 'id' was defined but does not appear in URL of @api 'getStudentCloth' in file: 'app.js'",
        ],
      }
    },
  ];
  it('case 1: should pass all test cases', function (done) {
    testCases.forEach(function (testCase) {
      const logCatcher = new LogCatcher();
      apidoc.setLogger(logCatcher);
      const parsed = apidoc.parseSource(Buffer.from(testCase.source), {filename: 'app.js'});
      assert.deepEqual(parsed[0], testCase.expected);
      assert.deepEqual(logCatcher.logs.info, testCase.logs.info || []);
      assert.deepEqual(logCatcher.logs.warn, testCase.logs.warn || []);
      assert.deepEqual(logCatcher.logs.error, testCase.logs.error || []);
    });
    done();
  });
});
