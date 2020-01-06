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

        var result = sendSampleRequestUtils.handleNestedFields(param, paramType);
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

        var result = sendSampleRequestUtils.handleNestedFields(param, paramType);
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

        var result = sendSampleRequestUtils.handleNestedFields(param, paramType);
        should.deepEqual(result, param);
        done();
    });

});
