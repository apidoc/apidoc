/*jshint unused:false, expr:true */

/**
 * Test: Send sample request utils
 */

var sendSampleRequestUtils = require('../template/utils/send_sample_request_utils');
var should = require('should');


describe('send sample request utils', function () {

    before(function (done) {
        done();
    });

    after(function (done) {
        done();
    });

    it('should handle nested fields', function (done) {
        var param = {
            'profile': '',
            'profile.name': 'john doe',
            'profile.birthday': '',
            'profile.birthday.day': 10,
            'profile.birthday.year': 2030,
        };
        var paramType = {
            'profile': 'Object',
            'profile.name': 'String',
            'profile.birthday': 'Object',
            'profile.birthday.day': 'Number',
            'profile.birthday.year': 'Number',
        };

        var expectedResult = {
            profile: {
                name: param['profile.name'],
                birthday: {
                    day: param['profile.birthday.day'],
                    year: param['profile.birthday.year']
                }
            }
        };

        var result = sendSampleRequestUtils.handleNestedAndParsingFields(param, paramType);
        should.deepEqual(result, expectedResult);
        done();
    });

    it('should not handle nested fields when the specified type different to "Object"', function (done) {
        var param = {
            'profile': '',
            'profile.name': 'john doe',
            'profile.birthday': '',
            'profile.birthday.day': 10,
            'profile.birthday.year': 2030,
        };
        var paramType = {
            'profile': 'String',
            'profile.name': 'String',
            'profile.birthday': 'Object',
            'profile.birthday.day': 'Number',
            'profile.birthday.year': 'Number',
        };

        var result = sendSampleRequestUtils.handleNestedAndParsingFields(param, paramType);
        should.deepEqual(result, param);
        done();
    });

    it('should not handle nested fields when an Object has a value', function (done) {
        var param = {
            'profile': 'randomValue',
            'profile.name': 'john doe',
            'profile.birthday': '',
            'profile.birthday.day': 10,
            'profile.birthday.year': 2030,
        };
        var paramType = {
            'profile': 'Object',
            'profile.name': 'String',
            'profile.birthday': 'Object',
            'profile.birthday.day': 'Number',
            'profile.birthday.year': 'Number',
        };

        var result = sendSampleRequestUtils.handleNestedAndParsingFields(param, paramType);
        should.deepEqual(result, param);
        done();
    });

    it('should handle array of strings field', function (done) {
        var param = {
            names: '["john","doe"]',
        };

        var paramType = {
            names: 'String[]',
        };

        var expectedResult = {
            names: ['john', 'doe'],
        };

        var result = sendSampleRequestUtils.handleNestedAndParsingFields(param, paramType);
        should.deepEqual(result, expectedResult);
        done();
    });

    it('should handle Object and array of objects field', function (done) {
        var param = {
            data: '{"a":1,"b":"b"}',
            arrayData: '[{"a":1},{"a":2}]'
        };

        var paramType = {
            data: 'Object',
            arrayData: 'Object[]',
        };

        var expectedResult = {
            data: {a: 1, b: "b"},
            arrayData: [{"a": 1}, {"a": 2}]
        };

        var result = sendSampleRequestUtils.handleNestedAndParsingFields(param, paramType);
        should.deepEqual(result, expectedResult);
        done();
    });

    it('should handle nested fields and parse array and object', function (done) {
        var param = {
            'profile': '',
            'profile.name': 'john doe',
            'profile.birthday': '',
            'profile.birthday.day': 10,
            'profile.birthday.year': 2030,
            'profile.info': '',
            'profile.info.skills': '["js","node"]',
            'profile.info.job': '{"company":"piedpiper"}',
        };
        var paramType = {
            'profile': 'Object',
            'profile.name': 'String',
            'profile.birthday': 'Object',
            'profile.birthday.day': 'Number',
            'profile.birthday.year': 'Number',
            'profile.info': 'Object',
            'profile.info.skills': 'String[]',
            'profile.info.job': 'Object',
        };

        var expectedResult = {
            profile: {
                name: param['profile.name'],
                birthday: {
                    day: param['profile.birthday.day'],
                    year: param['profile.birthday.year']
                },
                info: {
                    skills: ["js", "node"],
                    job: {company: 'piedpiper'}
                }
            }
        };

        var result = sendSampleRequestUtils.handleNestedAndParsingFields(param, paramType);
        should.deepEqual(result, expectedResult);
        done();
    });

    it('should convert path params to the accepted format', function (done) {
        var urls = [
            '/department/{dep}/employee/{emp}',
            '/employee/{emp}',
        ];
        
        var expectedResults = [
            '/department/:dep/employee/:emp',
            '/employee/:emp',
        ];

        var results = [];
        urls.forEach(function (url) {
            var result = sendSampleRequestUtils.convertPathParams(url);
            results.push(result);
        });
        should.deepEqual(results, expectedResults);
        done();
    });
});
