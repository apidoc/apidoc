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

const fieldsToJson = items => {
  const obj = {};

  const _get = (obj, path) => {
    return path.split('.').reduce((o, key) => {
      if (o) {
        if (o[key]) {
          return o[key];
        } else if (Array.isArray(o) && o[0] && o[0][key]) {
          return o[0][key];
        }
      }
      return null;
    }, obj);
  };

  const _set = (paren, key, value) => {
    if (paren) {
      if (Array.isArray(paren)) {
        if (!paren.length) {
          paren.push({ [key]: value });
        } else {
          paren[0][key] = value;
        }
      } else {
        paren[key] = value;
      }
    } else {
      obj[key] = value;
    }
  };

  items.forEach(item => {
    const { parentInfos, field, type } = item[0];
    const paren = parentInfos ? _get(obj, parentInfos.path) : undefined;
    const key = paren ? field.substring(parentInfos.path.length + 1) : field;
    const isArray = type.indexOf('[]') !== -1;
    // Object / array of Object
    if (type.indexOf('Object') !== -1) {
      _set(paren, key, isArray ? [] : {});
    // all types / array of types
    } else {
      _set(paren, key, isArray ? [] : item[1]);
    }
  });
  return beautify(obj);
};

/**
 * Stringify an obj to JSON with spaces
 */
export function beautify (obj) {
  return JSON.stringify(obj, null, 4);
}

export function body2json (context) {
  // build an array of fields with their type
  const fields = [];
  context.forEach(entry => {
    let val;
    switch (entry.type.toLowerCase()) {
      case 'string':
        val = entry.defaultValue || '';
        break;
      case 'boolean':
        val = Boolean(entry.defaultValue) || false;
        break;
      case 'number':
        val = parseInt(entry.defaultValue || 0, 10);
        break;
      case 'date':
        // date field will have default value or formatted date of today in current locale
        val = entry.defaultValue || new Date().toLocaleDateString(window.navigator.language);
        break;
    }
    fields.push([entry, val]);
  });
  return fieldsToJson(fields);
}
