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

/**
 * Helper functions for HandleBars
 */
import Handlebars from 'handlebars';
import { __ } from './locales/locale';
import $ from 'jquery';
import { body2json } from './jsonifier';

// this will register all helpers
export function register () {
  /**
   * Return a text as markdown.
   * Currently only a little helper to replace apidoc-inline Links (#Group:Name).
   * Should be replaced with a full markdown lib.
   * @param string text
   */
  Handlebars.registerHelper('markdown', function (text) {
    if (!text) {
      return text;
    }
    text = text.replace(/((\[(.*?)\])?\(#)((.+?):(.+?))(\))/mg, function (match, p1, p2, p3, p4, p5, p6) {
      const link = p3 || p5 + '/' + p6;
      return '<a href="#api-' + p5 + '-' + p6 + '">' + link + '</a>';
    });
    return text;
  });

  /**
   * Transform the parsed input type into html input type value
   */
  Handlebars.registerHelper('setInputType', function (text) {
    switch (text) {
      case 'File':
      case 'Email':
      case 'Color':
      case 'Number':
      case 'Date':
        return text[0].toLowerCase() + text.substring(1);
      case 'Boolean':
        return 'checkbox';
      default:
        return 'text';
    }
  });

  /**
     * start/stop timer for simple performance check.
     */
  let timer;
  Handlebars.registerHelper('startTimer', function (text) {
    timer = new Date();
    return '';
  });

  Handlebars.registerHelper('stopTimer', function (text) {
    console.log(new Date() - timer);
    return '';
  });

  /**
     * Return localized Text.
     * @param string text
     */
  Handlebars.registerHelper('__', function (text) {
    return __(text);
  });

  /**
     * Console log.
     * @param mixed obj
     */
  Handlebars.registerHelper('cl', function (obj) {
    console.log(obj);
    return '';
  });

  /**
     * Replace underscore with space.
     * @param string text
     */
  Handlebars.registerHelper('underscoreToSpace', function (text) {
    return text.replace(/(_+)/g, ' ');
  });

  /**
   * Remove double quotes.
   * @param string text
   */
  Handlebars.registerHelper('removeDblQuotes', function (text) {
    return text.replace(/"/g, '');
  });

  /**
     *
     */
  Handlebars.registerHelper('assign', function (name) {
    if (arguments.length > 0) {
      const type = typeof arguments[1];
      let arg = null;
      if (type === 'string' || type === 'number' || type === 'boolean') arg = arguments[1];
      Handlebars.registerHelper(name, function () { return arg; });
    }
    return '';
  });

  /**
     *
     */
  Handlebars.registerHelper('nl2br', function (text) {
    return _handlebarsNewlineToBreak(text);
  });

  // Test conditions
  // Usage: {{#ifCond var1 '===' var2}}something{{/ifCond}}
  Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {
    switch (operator) {
      case '==':
        return v1 == v2 ? options.fn(this) : options.inverse(this); // eslint-disable-line eqeqeq
      case '===':
        return v1 === v2 ? options.fn(this) : options.inverse(this);
      case '!=':
        return v1 != v2 ? options.fn(this) : options.inverse(this); // eslint-disable-line eqeqeq
      case '!==':
        return v1 !== v2 ? options.fn(this) : options.inverse(this);
      case '<':
        return v1 < v2 ? options.fn(this) : options.inverse(this);
      case '<=':
        return v1 <= v2 ? options.fn(this) : options.inverse(this);
      case '>':
        return v1 > v2 ? options.fn(this) : options.inverse(this);
      case '>=':
        return v1 >= v2 ? options.fn(this) : options.inverse(this);
      case '&&':
        return v1 && v2 ? options.fn(this) : options.inverse(this);
      case '||':
        return v1 || v2 ? options.fn(this) : options.inverse(this);
      default:
        return options.inverse(this);
    }
  });

  /**
     *
     */
  const templateCache = {};
  Handlebars.registerHelper('subTemplate', function (name, sourceContext) {
    if (!templateCache[name]) {
      templateCache[name] = Handlebars.compile(document.getElementById('template-' + name).innerHTML);
    }

    const template = templateCache[name];
    const templateContext = $.extend({}, this, sourceContext.hash);
    return new Handlebars.SafeString(template(templateContext));
  });

  Handlebars.registerHelper('toLowerCase', function (value) {
    return value && typeof value === 'string' ? value.toLowerCase() : '';
  });

  /**
     *
     */
  Handlebars.registerHelper('splitFill', function (value, splitChar, fillChar) {
    const splits = value.split(splitChar);
    return new Array(splits.length).join(fillChar) + splits[splits.length - 1];
  });

  /**
     * Convert Newline to HTML-Break (nl2br).
     *
     * @param {String} text
     * @returns {String}
     */
  function _handlebarsNewlineToBreak (text) {
    return ('' + text).replace(/(?:^|<\/pre>)[^]*?(?:<pre>|$)/g, m => {
      return m.replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + '<br>' + '$2');
    });
  }

  /**
     *
     */
  Handlebars.registerHelper('each_compare_list_field', function (source, compare, options) {
    const fieldName = options.hash.field;
    const newSource = [];
    if (source) {
      source.forEach(function (entry) {
        const values = entry;
        values.key = entry[fieldName];
        newSource.push(values);
      });
    }

    const newCompare = [];
    if (compare) {
      compare.forEach(function (entry) {
        const values = entry;
        values.key = entry[fieldName];
        newCompare.push(values);
      });
    }
    return _handlebarsEachCompared('key', newSource, newCompare, options);
  });

  /**
     *
     */
  Handlebars.registerHelper('each_compare_keys', function (source, compare, options) {
    const newSource = [];
    if (source) {
      const sourceFields = Object.keys(source);
      sourceFields.forEach(function (name) {
        const values = {};
        values.value = source[name];
        values.key = name;
        newSource.push(values);
      });
    }

    const newCompare = [];
    if (compare) {
      const compareFields = Object.keys(compare);
      compareFields.forEach(function (name) {
        const values = {};
        values.value = compare[name];
        values.key = name;
        newCompare.push(values);
      });
    }
    return _handlebarsEachCompared('key', newSource, newCompare, options);
  });

  Handlebars.registerHelper('body2json', function (context, options) {
    return body2json(context);
  });

  Handlebars.registerHelper('each_compare_field', function (source, compare, options) {
    return _handlebarsEachCompared('field', source, compare, options);
  });

  Handlebars.registerHelper('each_compare_title', function (source, compare, options) {
    return _handlebarsEachCompared('title', source, compare, options);
  });

  Handlebars.registerHelper('reformat', function (source, type) {
    if (type === 'json') {
      try {
        return JSON.stringify(JSON.parse(source.trim()), null, '    ');
      } catch (e) {

      }
    }
    return source;
  });

  Handlebars.registerHelper('showDiff', function (source, compare, options) {
    let ds = '';
    if (source === compare) {
      ds = source;
    } else {
      if (!source) { return compare; }

      if (!compare) { return source; }

      /*
      const d = diffMatchPatch.diff_main(stripHtml(compare), stripHtml(source));
      diffMatchPatch.diff_cleanupSemantic(d);
      ds = diffMatchPatch.diff_prettyHtml(d);
      ds = ds.replace(/&para;/gm, '');
      */
      // TODO FIXME
      // const ds = '';
    }
    if (options === 'nl2br') { ds = _handlebarsNewlineToBreak(ds); }

    return ds;
  });

  function _handlebarsEachCompared (fieldname, source, compare, options) {
    const dataList = [];
    let index = 0;
    if (source) {
      source.forEach(function (sourceEntry) {
        let found = false;
        if (compare) {
          compare.forEach(function (compareEntry) {
            if (sourceEntry[fieldname] === compareEntry[fieldname]) {
              const data = {
                typeSame: true,
                source: sourceEntry,
                compare: compareEntry,
                index: index,
              };
              dataList.push(data);
              found = true;
              index++;
            }
          });
        }
        if (!found) {
          const data = {
            typeIns: true,
            source: sourceEntry,
            index: index,
          };
          dataList.push(data);
          index++;
        }
      });
    }

    if (compare) {
      compare.forEach(function (compareEntry) {
        let found = false;
        if (source) {
          source.forEach(function (sourceEntry) {
            if (sourceEntry[fieldname] === compareEntry[fieldname]) { found = true; }
          });
        }
        if (!found) {
          const data = {
            typeDel: true,
            compare: compareEntry,
            index: index,
          };
          dataList.push(data);
          index++;
        }
      });
    }

    let ret = '';
    const length = dataList.length;
    for (const index in dataList) {
      if (parseInt(index, 10) === length - 1) { dataList[index]._last = true; }
      ret = ret + options.fn(dataList[index]);
    }
    return ret;
  }

  // TODO FIXME
  // const diffMatchPatch = new DiffMatchPatch();

  /**
   * Overwrite Colors
   */
  /*
  DiffMatchPatch.prototype.diff_prettyHtml = function (diffs) {
    const html = [];
    const patternAmp = /&/g;
    const patternLt = /</g;
    const patternGt = />/g;
    const patternPara = /\n/g;
    for (let x = 0; x < diffs.length; x++) {
      const op = diffs[x][0]; // Operation (insert, delete, equal)
      const data = diffs[x][1]; // Text of change.
      const text = data.replace(patternAmp, '&amp;').replace(patternLt, '&lt;')
        .replace(patternGt, '&gt;').replace(patternPara, '&para;<br>');
      switch (op) {
        case diffMatchPatch.DIFF_INSERT:
          html[x] = '<ins>' + text + '</ins>';
          break;
        case diffMatchPatch.DIFF_DELETE:
          html[x] = '<del>' + text + '</del>';
          break;
        case diffMatchPatch.DIFF_EQUAL:
          html[x] = '<span>' + text + '</span>';
          break;
      }
    }
    return html.join('');
  };
  */

  /**
     * Fixes html after comparison (#506, #538, #616, #825)
     * TODO FIXME commented because only used in tmp commented function
  function stripHtml (html) {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  }
  */
}
