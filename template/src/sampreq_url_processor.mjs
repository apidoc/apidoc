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
export default class UrlProcessor {
  // Replace parameters from url (:id) by the parameters from input values
  hydrate (url, queryParameters) {
    // The dummy URL base is only used for parses of relative URLs in Node.js.
    const parsedUrl = new URL(url, typeof window === 'undefined' ? 'https://dummy.base' : window.location.origin);
    const queryParametersChangedInPathname = {};

    // For API parameters in the URL parts delimited by `/` (e.g. `/:foo/:bar`).
    parsedUrl.pathname.split('/').forEach((pathnamePart, i) => {
      if (pathnamePart.charAt(0) === ':') {
        const realPathnamePart = pathnamePart.slice(1);

        if (typeof queryParameters[realPathnamePart] !== 'undefined') {
          parsedUrl.pathname = parsedUrl.pathname.replace(pathnamePart, encodeURIComponent(queryParameters[realPathnamePart]));
          queryParametersChangedInPathname[realPathnamePart] = queryParameters[realPathnamePart];
        }
      }
    });

    // For API parameters in the URL query string (e.g. `?foo=:foo&bar=:bar`).
    for (const key in queryParameters) {
      if (
        typeof queryParametersChangedInPathname[key] === 'undefined' || // Avoid adding query parameter if it has already been changed in pathname.
        parsedUrl.searchParams.has(key)
      ) {
        parsedUrl.searchParams.set(key, queryParameters[key]);
      }
    }

    return parsedUrl.toString();
  }
}
