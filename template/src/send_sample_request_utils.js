import { get, set } from 'lodash';

function handleNestedFields (object, key, params, paramType) {
  const attributes = key.split('.');
  const field = attributes[0];
  params.push(field);
  if (attributes.length > 1 && paramType[params.join('.')] === 'Object') {
    const nestedField = attributes.slice(1).join('.');
    if (!object[field]) { object[field] = {}; }
    if (typeof object[field] === 'object') {
      object[field][nestedField] = object[key];
      delete object[key];
      handleNestedFields(object[field], nestedField, params, paramType);
    }
  }
}

function handleNestedFieldsForAllParams (param, paramType) {
  const result = Object.assign({}, param);
  Object.keys(result).forEach(function (key) {
    handleNestedFields(result, key, [], paramType);
  });
  return result;
}

function handleArraysAndObjectFields (param, paramType) {
  const result = Object.assign({}, param);
  Object.keys(paramType).forEach(function (key) {
    if (result[key] && (paramType[key].endsWith('[]') || paramType[key] === 'Object')) {
      try {
        result[key] = JSON.parse(result[key]);
      } catch (e) {}
    }
  });
  return result;
}

function tryParsingAsType (object, path, type) {
  const val = get(object, path);
  if (val !== undefined) {
    if (type === 'Boolean') {
      if (val === 'true') {
        set(object, path, true);
      } else if (val === 'false') {
        set(object, path, false);
      } else {
        console.warn('Failed to parse object value at path [' + path + ']. Value: (' + val + '). Type: (' + type + ')');
      }
    } else if (type === 'Number') {
      const parsedInt = parseInt(val, 10);
      if (!isNaN(parsedInt)) {
        set(object, path, parsedInt);
      } else {
        console.warn('Failed to parse object value at path [' + path + ']. Value: (' + val + '). Type: (' + type + ')');
      }
    }
  }
}

export function handleNestedAndParsingFields (param, paramType) {
  let result = handleArraysAndObjectFields(param, paramType);
  result = handleNestedFieldsForAllParams(result, paramType);
  return result;
}

export function tryParsingWithTypes (param, paramType) {
  const result = Object.assign({}, param);
  Object.keys(paramType).forEach(function (key) {
    tryParsingAsType(result, key, paramType[key]);
  });
  return result;
}

// Converts path params in the {param} format to the accepted :param format, used before inserting the URL params.
export function convertPathParams (url) {
  return url.replace(/{(.+?)}/g, ':$1');
}
