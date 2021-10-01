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
import pathToRegexp from 'path-to-regexp';

export default class UrlProcessor {
  // Replace parameters from url (:id) by the parameters from input values
  hydrate (url, queryParameters) {
    // convert/the:path to regexp
    // this array will hold the results
    const keys = [];
    pathToRegexp(url, keys);
    // loop over all the keys and replace them in the url
    keys.forEach(key => {
      url = url.replace(':' + key.name, encodeURIComponent(queryParameters[key.name]));
    });
    return url;
  }
}
