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
import assert from 'assert';
import UrlProcessor from '../template/src/sampreq_url_processor.mjs';

const UrlProc = new UrlProcessor();

describe('test sample request url processor', () => {
  it('should hydrate correctly a complete url', done => {
    const dryUrl = 'https://api.example.org/user/:id/:group/:city';
    const parameters = {};
    parameters['id'] = '3';
    parameters['group'] = 'blah';
    parameters['city'] = 'paris';
    const url = UrlProc.hydrate(dryUrl, parameters);
    assert.strictEqual(url, 'https://api.example.org/user/3/blah/paris');
    done();
  });

  it('should hydrate correctly an empty url', done => {
    const dryUrl = 'https://api.example.org/user/';
    const parameters = {};
    parameters['id'] = '3';
    const url = UrlProc.hydrate(dryUrl, parameters);
    assert.strictEqual(url, 'https://api.example.org/user/');
    done();
  });

  it('should hydrate correctly an url with optional parameter', done => {
    const dryUrl = 'https://api.example.org/user/:id/:group/:city';
    const parameters = {};
    parameters['id'] = '3';
    parameters['group'] = 'blah';
    parameters['city'] = '';
    const url = UrlProc.hydrate(dryUrl, parameters);
    assert.strictEqual(url, 'https://api.example.org/user/3/blah/');
    done();
  });
});
