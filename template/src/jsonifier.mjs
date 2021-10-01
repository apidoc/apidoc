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
import pkg from 'lodash';
const { defaultsDeep } = pkg;

const setValueToField = (fields, value) => {
  const reducer = (acc, item, index, arr) => ({ [item]: index + 1 < arr.length ? acc : value });
  return fields.reduceRight(reducer, {});
};

const fieldsToJson = fields => {
  let obj = {};
  fields.forEach(field => {
    const line = setValueToField(field[0].split('.'), field[1]);
    obj = defaultsDeep(obj, line);
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
    fields.push([entry.field, val]);
  });
  return fieldsToJson(fields);
}
