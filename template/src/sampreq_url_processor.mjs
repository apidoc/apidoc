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
import URL from 'url-parse';
import { pathToRegexp } from 'path-to-regexp';

export default class UrlProcessor {
  // Replace parameters from url (:id) by the parameters from input values
  hydrate (url, queryParameters) {
    const urlOrig = url;
    // path-to-regexp only wants a path not a full url, so we split it
    const parsedUrl = new URL(url);
    // convert/the:path to regexp
    // this array will hold the results
    const keys = [];
    pathToRegexp(parsedUrl.pathname, keys);
    // loop over all the keys and replace them in the url
    keys.forEach(key => {
      url = url.replace(':' + key.name, encodeURIComponent(queryParameters[key.name]));
    });

    // if some parameters do not have url pattern, add them as standard query
    // string parameters (key=value)
    url += url.indexOf('?') === -1 ? '?' : '&';
    Object.keys(queryParameters).forEach(key => {
      if (urlOrig.indexOf(':' + key) === -1) {
        url += key + '=' + encodeURIComponent(queryParameters[key]) + '&';
      }
    });

    return url.replace(/[?&]$/, '');
  }
}
