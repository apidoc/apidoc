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
  let obj = {};

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

  const _set = (parentPtr, key, value) => {
    if (parentPtr) {
      if (Array.isArray(parentPtr)) {
        if (!parentPtr.length) {
          parentPtr.push({ [key]: value });
        } else {
          parentPtr[0][key] = value;
        }
      } else {
        parentPtr[key] = value;
      }
    } else {
      obj[key] = value;
    }
  };

  items.forEach(item => {
    const { parentNode, field, type } = item[0];
    const parentPtr = parentNode ? _get(obj, parentNode.path) : undefined;
    const key = parentPtr ? field.substring(parentNode.path.length + 1) : field;
    const isArray = type.indexOf('[]') !== -1;
    // Object / array of Object
    if (type.indexOf('Object') !== -1) {
      _set(parentPtr, key, isArray ? [] : {});
    // all types / array of types
    } else {
      _set(parentPtr, key, isArray ? [] : item[1]);
    }
  });

  // if result contains only one property that is optional, and this is an
  // array of objects, remove the key
  const objKeys = Object.keys(obj);
  if (objKeys.length === 1 && items[0][0].optional) { obj = obj[objKeys[0]]; }

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
