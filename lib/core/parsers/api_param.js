const unindent = require('../utils/unindent');

let group = '';

// Search: group, type, optional, fieldname, defaultValue, size, description
// Example: {String{1..4}} [user.name='John Doe'] Users fullname.
//
// Naming convention:
//     b -> begin
//     e -> end
//     name -> the field value
//     oName -> wrapper for optional field
//     wName -> wrapper for field
const regExp = {
  b: '^', // start
  oGroup: { // optional group: (404)
    b: '\\s*(?:\\(\\s*', // starting with '(', optional surrounding spaces
    group: '(.+?)', // 1
    e: '\\s*\\)\\s*)?', // ending with ')', optional surrounding spaces
  },
  oType: { // optional type: {string}
    b: '\\s*(?:\\{\\s*', // starting with '{', optional surrounding spaces
    type: '([a-zA-Z0-9()#:\\.\\/\\\\\\[\\]_|-]+)', // 2
    oSize: { // optional size within type: {string{1..4}}
      b: '\\s*(?:\\{\\s*', // starting with '{', optional surrounding spaces
      size: '(.+?)', // 3
      e: '\\s*\\}\\s*)?', // ending with '}', optional surrounding spaces
    },
    oAllowedValues: { // optional allowed values within type: {string='abc','def'}
      b: '\\s*(?:=\\s*', // starting with '=', optional surrounding spaces
      possibleValues: '(.+?)', // 4
      e: '(?=\\s*\\}\\s*))?', // ending with '}', optional surrounding spaces
    },
    e: '\\s*\\}\\s*)?', // ending with '}', optional surrounding spaces
  },
  wName: {
    b: '(\\[?\\s*', // 5 optional optional-marker
    name: '([#@a-zA-Z0-9\\$\\:\\.\\/\\\\_-]+', // 6
    withArray: '(?:\\[[a-zA-Z0-9\\.\\/\\\\_-]*\\])?)', // https://github.com/apidoc/apidoc-core/pull/4
    oDefaultValue: { // optional defaultValue
      b: '(?:\\s*=\\s*(?:', // starting with '=', optional surrounding spaces
      withDoubleQuote: '"([^"]*)"', // 7
      withQuote: '|\'([^\']*)\'', // 8
      withoutQuote: '|(.*?)(?:\\s|\\]|$)', // 9
      e: '))?',
    },
    e: '\\s*\\]?\\s*)',
  },
  description: '(.*)?', // 10
  e: '$|@',
};

function _objectValuesToString (obj) {
  let str = '';
  for (const el in obj) {
    if (typeof obj[el] === 'string') { str += obj[el]; } else { str += _objectValuesToString(obj[el]); }
  }
  return str;
}

const parseRegExp = new RegExp(_objectValuesToString(regExp));

const allowedValuesWithDoubleQuoteRegExp = /"[^"]*[^"]"/g;
const allowedValuesWithQuoteRegExp = /'[^']*[^']'/g;
const allowedValuesRegExp = /[^,\s]+/g;

function parse (content, source, defaultGroup) {
  content = content.trim();

  // replace Linebreak with Unicode
  content = content.replace(/\n/g, '\uffff');

  const matches = parseRegExp.exec(content);

  if (!matches) { return null; }

  // reverse Unicode Linebreaks
  matches.forEach(function (val, index, array) {
    if (val) {
      array[index] = val.replace(/\uffff/g, '\n');
    }
  });

  let allowedValues = matches[4];
  if (allowedValues) {
    let regExp;
    if (allowedValues.charAt(0) === '"') { regExp = allowedValuesWithDoubleQuoteRegExp; } else if (allowedValues.charAt(0) === '\'') { regExp = allowedValuesWithQuoteRegExp; } else { regExp = allowedValuesRegExp; }

    let allowedValuesMatch;
    const list = [];

    while ((allowedValuesMatch = regExp.exec(allowedValues))) { // eslint-disable-line no-extra-parens
      list.push(allowedValuesMatch[0]);
    }
    allowedValues = list;
  }

  // Set global group variable
  group = matches[1] || defaultGroup || 'Parameter';

  return {
    group: group,
    type: matches[2],
    size: matches[3],
    allowedValues: allowedValues,
    optional: !!((matches[5] && matches[5][0] === '[')), // eslint-disable-line no-extra-parens
    field: matches[6],
    defaultValue: matches[7] || matches[8] || matches[9],
    description: unindent(matches[10] || ''),
  };
}

function path () {
  return 'local.parameter.fields.' + getGroup();
}

function getGroup () {
  return group;
}

/**
 * Exports
 */
module.exports = {
  parse: parse,
  path: path,
  method: 'push',
  getGroup: getGroup,
  markdownFields: ['description', 'type'],
  markdownRemovePTags: ['type'],
};
