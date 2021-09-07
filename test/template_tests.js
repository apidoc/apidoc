/**
 * Test: Send sample request utils
 * TODO FIXME this is not running because the filename ends with an s
 * and this will need cleanup once all the send sample stuff is cleaned up too
 */

const sendSampleRequestUtils = require('../template/src/send_sample_request_utils');
const assert = require('assert');

describe('send sample request utils', function () {
  before(function (done) {
    done();
  });

  after(function (done) {
    done();
  });

  it('should handle nested fields', function (done) {
    const param = {
      profile: '',
      'profile.name': 'john doe',
      'profile.birthday': '',
      'profile.birthday.day': '10',
      'profile.birthday.year': '2030',
    };
    const paramType = {
      profile: 'Object',
      'profile.name': 'String',
      'profile.birthday': 'Object',
      'profile.birthday.day': 'Number',
      'profile.birthday.year': 'Number',
    };

    const expectedResult = {
      profile: {
        name: param['profile.name'],
        birthday: {
          day: param['profile.birthday.day'],
          year: param['profile.birthday.year'],
        },
      },
    };

    const result = sendSampleRequestUtils.handleNestedAndParsingFields(param, paramType);
    assert.deepEqual(result, expectedResult);
    done();
  });

  it('should not handle nested fields when the specified type different to "Object"', function (done) {
    const param = {
      profile: '',
      'profile.name': 'john doe',
      'profile.birthday': '',
      'profile.birthday.day': '10',
      'profile.birthday.year': '2030',
    };
    const paramType = {
      profile: 'String',
      'profile.name': 'String',
      'profile.birthday': 'Object',
      'profile.birthday.day': 'Number',
      'profile.birthday.year': 'Number',
    };

    const result = sendSampleRequestUtils.handleNestedAndParsingFields(param, paramType);
    assert.deepEqual(result, param);
    done();
  });

  it('should not handle nested fields when an Object has a value', function (done) {
    const param = {
      profile: 'randomValue',
      'profile.name': 'john doe',
      'profile.birthday': '',
      'profile.birthday.day': '10',
      'profile.birthday.year': '2030',
    };
    const paramType = {
      profile: 'Object',
      'profile.name': 'String',
      'profile.birthday': 'Object',
      'profile.birthday.day': 'Number',
      'profile.birthday.year': 'Number',
    };

    const result = sendSampleRequestUtils.handleNestedAndParsingFields(param, paramType);
    assert.deepEqual(result, param);
    done();
  });

  it('should handle array of strings field', function (done) {
    const param = {
      names: '["john","doe"]',
    };

    const paramType = {
      names: 'String[]',
    };

    const expectedResult = {
      names: ['john', 'doe'],
    };

    const result = sendSampleRequestUtils.handleNestedAndParsingFields(param, paramType);
    assert.deepEqual(result, expectedResult);
    done();
  });

  it('should handle Object and array of objects field', function (done) {
    const param = {
      data: '{"a":1,"b":"b"}',
      arrayData: '[{"a":1},{"a":2}]',
    };

    const paramType = {
      data: 'Object',
      arrayData: 'Object[]',
    };

    const expectedResult = {
      data: { a: 1, b: 'b' },
      arrayData: [{ a: 1 }, { a: 2 }],
    };

    const result = sendSampleRequestUtils.handleNestedAndParsingFields(param, paramType);
    assert.deepEqual(result, expectedResult);
    done();
  });

  it('should handle nested fields and parse array and object', function (done) {
    const param = {
      profile: '',
      'profile.name': 'john doe',
      'profile.birthday': '',
      'profile.birthday.day': '10',
      'profile.birthday.year': '2030',
      'profile.info': '',
      'profile.info.skills': '["js","node"]',
      'profile.info.job': '{"company":"piedpiper"}',
    };
    const paramType = {
      profile: 'Object',
      'profile.name': 'String',
      'profile.birthday': 'Object',
      'profile.birthday.day': 'Number',
      'profile.birthday.year': 'Number',
      'profile.info': 'Object',
      'profile.info.skills': 'String[]',
      'profile.info.job': 'Object',
    };

    const expectedResult = {
      profile: {
        name: param['profile.name'],
        birthday: {
          day: param['profile.birthday.day'],
          year: param['profile.birthday.year'],
        },
        info: {
          skills: ['js', 'node'],
          job: { company: 'piedpiper' },
        },
      },
    };

    const result = sendSampleRequestUtils.handleNestedAndParsingFields(param, paramType);
    assert.deepEqual(result, expectedResult);
    done();
  });

  it('should properly parse boolean and number fields on a parsed object', function (done) {
    const parsedJson = {
      profile: {
        name: 'john doe',
        birthday: {
          day: '10',
          year: '2030',
        },
        info: {
          skills: ['js', 'node'],
          job: { company: 'piedpiper' },
          registered: 'true',
        },
      },
      active: 'true',
    };
    const paramType = {
      active: 'Boolean',
      profile: 'Object',
      'profile.name': 'String',
      'profile.birthday': 'Object',
      'profile.birthday.day': 'Number',
      'profile.birthday.year': 'Number',
      'profile.info': 'Object',
      'profile.info.skills': 'String[]',
      'profile.info.job': 'Object',
      'profile.info.registered': 'Boolean',
    };
    const expectedJson = {
      profile: {
        name: parsedJson.profile.name,
        birthday: {
          day: 10,
          year: 2030,
        },
        info: {
          skills: parsedJson.profile.info.skills,
          job: parsedJson.profile.info.job,
          registered: true,
        },
      },
      active: true,
    };

    const result = sendSampleRequestUtils.tryParsingWithTypes(parsedJson, paramType);
    assert.deepEqual(result, expectedJson);
    done();
  });

  it('should not affect boolean and number fields which cannot be parsed', function (done) {
    const parsedJson = {
      profile: {
        name: 'john doe',
        birthday: {
          day: 'invalid-date',
          year: '2030',
        },
        info: {
          skills: ['js', 'node'],
          job: { company: 'piedpiper' },
          registered: 'true',
        },
      },
      active: 'n/a',
    };
    const paramType = {
      active: 'Boolean',
      profile: 'Object',
      'profile.name': 'String',
      'profile.birthday': 'Object',
      'profile.birthday.day': 'Number',
      'profile.birthday.year': 'Number',
      'profile.info': 'Object',
      'profile.info.skills': 'String[]',
      'profile.info.job': 'Object',
      'profile.info.registered': 'Boolean',
    };
    const expectedJson = {
      profile: {
        name: parsedJson.profile.name,
        birthday: {
          // when Number field cannot be parsed, don't touch original field
          day: parsedJson.profile.birthday.day,
          year: 2030,
        },
        info: {
          skills: parsedJson.profile.info.skills,
          job: parsedJson.profile.info.job,
          registered: true,
        },
      },
      // when boolean field cannot be parsed as 'true' or 'false', don't touch original field
      active: parsedJson.active,
    };

    // disable console log
    sendSampleRequestUtils.setLogger({ warn: function () {} });

    const result = sendSampleRequestUtils.tryParsingWithTypes(parsedJson, paramType);
    assert.deepEqual(result, expectedJson);
    done();
  });

  it('should convert path params to the accepted format', function (done) {
    const urls = [
      '/department/{dep}/employee/{emp}',
      '/employee/{emp}',
    ];

    const expectedResults = [
      '/department/:dep/employee/:emp',
      '/employee/:emp',
    ];

    const results = [];
    urls.forEach(function (url) {
      const result = sendSampleRequestUtils.convertPathParams(url);
      results.push(result);
    });
    assert.deepEqual(results, expectedResults);
    done();
  });
});
