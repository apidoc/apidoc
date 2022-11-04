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
const { isObject, get, set, extend } = require('lodash');
const fs = require('fs');
const path = require('path');
const util = require('util');
const iconv = require('iconv-lite');

const findFiles = require('./utils/find_files');

const ParameterError = require('./errors/parameter_error');
const ParserError = require('./errors/parser_error');

let app = {};
let filterTag = null; // define the tag to filter by

function Parser (_app) {
  const self = this;

  // global variables
  app = _app;

  // class variables
  self.languages = {};
  self.parsers = {};
  self.parsedFileElements = [];
  self.parsedFiles = [];
  self.countDeprecated = {};

  // load languages
  const languages = Object.keys(app.languages);
  languages.forEach(function (language) {
    if (isObject(app.languages[language])) {
      app.log.debug('inject parser language: ' + language);
      self.addLanguage(language, app.languages[language]);
    } else {
      const filename = app.languages[language];
      app.log.debug('load parser language: ' + language + ', ' + filename);
      self.addLanguage(language, require(filename));
    }
  });

  // load parser
  const parsers = Object.keys(app.parsers);
  parsers.forEach(function (parser) {
    if (isObject(app.parsers[parser])) {
      app.log.debug('inject parser: ' + parser);
      self.addParser(parser, app.parsers[parser]);
    } else {
      const filename = app.parsers[parser];
      app.log.debug('load parser: ' + parser + ', ' + filename);
      self.addParser(parser, require(filename));
    }
  });

  // check app.options.filterBy and define the tag to filter by
  if (app.options.filterBy) {
    const tag = app.options.filterBy.split('=')[0];
    filterTag = tag.indexOf('api') !== -1 ? tag : null;
  }
}

/**
 * Inherit
 */
util.inherits(Parser, Object);

/**
 * Exports
 */
module.exports = Parser;

/**
 * Add a Language
 */
Parser.prototype.addLanguage = function (name, language) {
  this.languages[name] = language;
};

/**
 * Add a Parser
 */
Parser.prototype.addParser = function (name, parser) {
  this.parsers[name] = parser;
};

/**
 * Parse files in specified folder
 *
 * @param {Object} options The options used to parse and filder the files.
 * @param {Object[]} parsedFiles List of parsed files.
 * @param {String[]} parsedFilenames List of parsed files, with full path.
 */
Parser.prototype.parseFiles = function (options, parsedFiles, parsedFilenames) {
  const self = this;

  findFiles.setPath(options.src);
  findFiles.setExcludeFilters(options.excludeFilters);
  findFiles.setIncludeFilters(options.includeFilters);
  const files = findFiles.search();

  // Parser
  for (let i = 0; i < files.length; i += 1) {
    const filename = options.src + files[i];
    const parsedFile = self.parseFile(filename, options.encoding);
    if (parsedFile) {
      app.log.verbose('parse file: ' + filename);
      parsedFiles.push(parsedFile);
      // only push the filename without full path to prevent information disclosure
      parsedFilenames.push(files[i]);
    }
  }
};

/**
 * Execute Fileparsing
 */
Parser.prototype.parseFile = function (filename, encoding) {
  const self = this;

  if (typeof encoding === 'undefined') { encoding = 'utf8'; }

  app.log.debug('inspect file: ' + filename);

  self.filename = filename;
  self.extension = path.extname(filename).toLowerCase();
  // TODO: Not sure if this is correct. Without skipDecodeWarning we got string errors
  // https://github.com/apidoc/apidoc-core/pull/25
  const fileContent = fs.readFileSync(filename, { encoding: 'binary' });
  return self.parseSource(fileContent, encoding, filename);
};

/**
 * Execute Sourceparsing
 */
Parser.prototype.parseSource = function (fileContent, encoding, filename) {
  const self = this;
  iconv.skipDecodeWarning = true;
  self.src = iconv.decode(fileContent, encoding);
  app.log.debug('size: ' + self.src.length);

  // unify line-breaks
  self.src = self.src.replace(/\r\n/g, '\n');

  self.blocks = [];
  self.indexApiBlocks = [];

  // determine blocks
  self.blocks = self._findBlocks();
  if (self.blocks.length === 0) { return; }

  app.log.debug('count blocks: ' + self.blocks.length);

  // determine elements in blocks
  self.elements = self.blocks.map(function (block, i) {
    const elements = self.findElements(block, filename);
    app.log.debug('count elements in block ' + i + ': ' + elements.length);
    return elements;
  });
  if (self.elements.length === 0) { return; }

  // determine list of blocks with API elements
  self.indexApiBlocks = self._findBlockWithApiGetIndex(self.elements);
  if (self.indexApiBlocks.length === 0) { return; }

  const parsedBlocks = self._parseBlockElements(self.indexApiBlocks, self.elements, filename);
  _sanityChecks(parsedBlocks, app.log, filename);
  return parsedBlocks;
};

/**
 * Parse API Elements with Plugins
 *
 * @param indexApiBlocks
 * @param detectedElements
 * @returns {Array}
 */
Parser.prototype._parseBlockElements = function (indexApiBlocks, detectedElements, filename) {
  const self = this;
  const parsedBlocks = [];

  for (let i = 0; i < indexApiBlocks.length; i += 1) {
    const blockIndex = indexApiBlocks[i];
    const elements = detectedElements[blockIndex];
    const blockData = {
      global: {},
      local: {},
    };
    let countAllowedMultiple = 0;

    for (let j = 0; j < elements.length; j += 1) {
      const element = elements[j];
      const elementParser = self.parsers[element.name];

      if (!elementParser) {
        app.log.warn(`parser plugin '${element.name}' not found in block: '${blockIndex}' in file: '${filename}'`);
      } else {
        app.log.debug('found @' + element.sourceName + ' in block: ' + blockIndex);

        // Deprecation warning
        if (elementParser.deprecated) {
          self.countDeprecated[element.sourceName] = self.countDeprecated[element.sourceName] ? self.countDeprecated[element.sourceName] + 1 : 1;

          let message = '@' + element.sourceName + ' is deprecated';
          if (elementParser.alternative) { message = '@' + element.sourceName + ' is deprecated, please use ' + elementParser.alternative; }

          if (self.countDeprecated[element.sourceName] === 1) {
          // show deprecated message only 1 time as warning
            app.log.warn(message);
          } else {
          // show deprecated message more than 1 time as verbose message
            app.log.verbose(message);
          }

          app.log.verbose('in file: ' + filename + ', block: ' + blockIndex);
        }

        let values = '';
        let preventGlobal = false;
        let allowMultiple = false;
        let pathTo = '';
        let attachMethod = '';
        try {
          // parse element and retrieve values
          values = elementParser.parse(element.content, element.source);

          // HINT: pathTo MUST be read after elementParser.parse, because of dynamic paths
          // Add all other options after parse too, in case of a custom plugin need to modify params.

          // check if it is allowed to add to global namespace
          preventGlobal = elementParser.preventGlobal === true;

          // allow multiple inserts into pathTo
          allowMultiple = true;

          // path to an array, where the values should be attached
          pathTo = '';
          if (elementParser.path) {
            if (typeof elementParser.path === 'string') { pathTo = elementParser.path; } else { pathTo = elementParser.path(); } // for dynamic paths
          }

          if (!pathTo) { throw new ParserError('pathTo is not defined in the parser file.', '', '', element.sourceName); }

          // method how the values should be attached (insert or push)
          attachMethod = elementParser.method || 'push';

          if (attachMethod !== 'insert' && attachMethod !== 'push') { throw new ParserError('Only push or insert are allowed parser method values.', '', '', element.sourceName); }

          // TODO: put this into "converters"
          if (values) {
            // Markdown.
            if (app.markdownParser &&
                             elementParser.markdownFields &&
                             elementParser.markdownFields.length > 0
            ) {
              for (let markdownIndex = 0; markdownIndex < elementParser.markdownFields.length; markdownIndex += 1) {
                const field = elementParser.markdownFields[markdownIndex];
                let value = get(values, field);
                if (value) {
                  value = app.markdownParser.render(value);
                  // remove line breaks, but not within <pre> tags
                  value = value.replace(/(?:^|<\/pre>)[^]*?(?:<pre>|$)/g, m => {
                    return m.replace(/(\r\n|\n|\r)/g, ' ');
                  });

                  value = value.trim();
                  set(values, field, value);

                  // TODO: Little hacky, not sure to handle this here or in template
                  if (elementParser.markdownRemovePTags &&
                                         elementParser.markdownRemovePTags.length > 0 &&
                                         elementParser.markdownRemovePTags.indexOf(field) !== -1
                  ) {
                    // Remove p-Tags
                    value = value.replace(/(<p>|<\/p>)/g, '');
                    set(values, field, value);
                  }
                }
              }
            }
          }
        } catch (e) {
          if (e instanceof ParameterError) {
            const extra = [];
            if (e.definition) { extra.push({ Definition: e.definition }); }
            if (e.example) { extra.push({ Example: e.example }); }
            throw new ParserError(e.message,
              self.filename, blockIndex + 1, element.sourceName, element.source, extra);
          }
          throw new ParserError('Undefined error.',
            self.filename, blockIndex + 1, element.sourceName, element.source);
        }

        if (!values) {
          throw new ParserError('Empty parser result.',
            self.filename, blockIndex + 1, element.sourceName, element.source);
        }

        if (preventGlobal) {
          // Check if count global namespace entries > count allowed
          // (e.g. @successTitle is global, but should co-exist with @apiErrorStructure)
          if (Object.keys(blockData.global).length > countAllowedMultiple) {
            throw new ParserError('Only one definition or usage is allowed in the same block.',
              self.filename, blockIndex + 1, element.sourceName, element.source);
          }
        }

        // only one global allowed per block
        if (pathTo === 'global' || pathTo.substr(0, 7) === 'global.') {
          if (allowMultiple) {
            countAllowedMultiple += 1;
          } else {
            if (Object.keys(blockData.global).length > 0) {
              throw new ParserError('Only one definition is allowed in the same block.',
                self.filename, blockIndex + 1, element.sourceName, element.source);
            }

            if (preventGlobal) {
              throw new ParserError('Only one definition or usage is allowed in the same block.',
                self.filename, blockIndex + 1, element.sourceName, element.source);
            }
          }
        }

        if (!blockData[pathTo]) { self._createObjectPath(blockData, pathTo, attachMethod); }

        const blockDataPath = self._pathToObject(pathTo, blockData);

        // insert Fieldvalues in Path-Array
        if (attachMethod === 'push') { blockDataPath.push(values); } else { extend(blockDataPath, values); }

        // insert Fieldvalues in Mainpath
        if (elementParser.extendRoot === true) { extend(blockData, values); }

        blockData.index = blockIndex + 1;
      }
    }
    if (blockData.index && blockData.index > 0) { parsedBlocks.push(blockData); }
  }
  return parsedBlocks;
};

/**
 * Create a not existing Path in an Object
 *
 * @param src
 * @param path
 * @param {String} attachMethod Create last element as object or array: 'insert', 'push'
 * @returns {Object}
 */
Parser.prototype._createObjectPath = function (src, path, attachMethod) {
  if (!path) { return src; }
  const pathParts = path.split('.');
  let current = src;
  for (let i = 0; i < pathParts.length; i += 1) {
    const part = pathParts[i];
    if (!current[part]) {
      if (i === pathParts.length - 1 && attachMethod === 'push') { current[part] = []; } else { current[part] = {}; }
    }
    current = current[part];
  }
  return current;
};

/**
 * Return Path to Object
 */
Parser.prototype._pathToObject = function (path, src) {
  if (!path) { return src; }
  const pathParts = path.split('.');
  let current = src;
  for (let i = 0; i < pathParts.length; i += 1) {
    const part = pathParts[i];
    current = current[part];
  }
  return current;
};

/**
 * Determine Blocks
 */
Parser.prototype._findBlocks = function () {
  const self = this;
  const blocks = [];
  let src = self.src;

  // Replace Linebreak with Unicode
  src = src.replace(/\n/g, '\uffff');

  const regexForFile = this.languages[self.extension] || this.languages.default;
  let matches = regexForFile.docBlocksRegExp.exec(src);
  while (matches) {
    let block = matches[2] || matches[1];

    // Reverse Unicode Linebreaks
    block = block.replace(/\uffff/g, '\n');

    block = block.replace(regexForFile.inlineRegExp, '');
    blocks.push(block);

    // Find next
    matches = regexForFile.docBlocksRegExp.exec(src);
  }
  return blocks;
};

/**
 * Return block indexes with active API-elements
 *
 * An @apiIgnore ignores the block.
 * Other, non @api elements, will be ignored.
 */
Parser.prototype._findBlockWithApiGetIndex = function (blocks) {
  const foundIndexes = [];
  // get value to filter by
  const valueTofilter = filterTag ? app.options.filterBy.split('=')[1] : null;
  for (let i = 0; i < blocks.length; i += 1) {
    let found = false;
    let isToFilterBy = false;
    let isDefine = false;
    for (let j = 0; j < blocks[i].length; j += 1) {
      // check apiIgnore
      if (blocks[i][j].name.substr(0, 9) === 'apiignore') {
        app.log.debug('apiIgnore found in block: ' + i);
        found = false;
        break;
      }

      // check app.options.apiprivate and apiPrivate
      if (!app.options.apiprivate && blocks[i][j].name.substr(0, 10) === 'apiprivate') {
        app.log.debug('private flag is set to false and apiPrivate found in block: ' + i);
        found = false;
        break;
      }

      // check if the user want to filter by some specific tag
      if (filterTag) {
        // we need to add all apidefine
        if (blocks[i][j].name.substr(0, 9) === 'apidefine') {
          isDefine = true;
        }
        if (blocks[i][j].name.substr(0, filterTag.length) === filterTag && blocks[i][j].content === valueTofilter) {
          isToFilterBy = true;
        }
      }

      if (blocks[i][j].name.substr(0, 3) === 'api') { found = true; }
    }

    // add block if it's apidefine or the tag is equal to the value defined in options
    if (filterTag) {
      found = found && (isToFilterBy || isDefine);
    }

    if (found) {
      foundIndexes.push(i);
      app.log.debug('api found in block: ' + i);
    }
  }
  return foundIndexes;
};

/**
 * Get Elements of Blocks
 */
Parser.prototype.findElements = function (block, filename) {
  const elements = [];

  // Replace Linebreak with Unicode
  block = block.replace(/\n/g, '\uffff');

  // Elements start with @api
  const elementsRegExp = /(@(api\w*)\s?(.*?)(?=\uffff[\s*]*@api|$))/gm;
  let matches = elementsRegExp.exec(block);
  while (matches) {
    const element = {
      source: matches[1],
      name: matches[2].toLowerCase(),
      sourceName: matches[2],
      content: matches[3],
    };

    // reverse Unicode Linebreaks
    element.content = element.content.replace(/\uffff/g, '\n');
    element.source = element.source.replace(/\uffff/g, '\n');

    app.hook('parser-find-element-' + element.name, element, block, filename);

    elements.push(element);

    app.hook('parser-find-elements', elements, element, block, filename);

    // next Match
    matches = elementsRegExp.exec(block);
  }
  return elements;
};

/**
 * Emit warnings for inconsistent API doc elements
 */
function _sanityChecks (parsedBlocks, log, filename) {
  const definedBlocksByName = {};
  for (const block of parsedBlocks) {
    if (block.global.define && block.global.define.name) {
      definedBlocksByName[block.global.define.name] = block;
    }
  }
  for (const block of parsedBlocks) {
    const paramFields = _paramFieldsFromBlock(block);

    let paramFieldsDefinedOutside = [];
    if (block.local.use) {
      for (const define of block.local.use) {
        const definedBlock = definedBlocksByName[define.name];
        if (definedBlock) {
          paramFieldsDefinedOutside = paramFieldsDefinedOutside.concat(_paramFieldsFromBlock(definedBlock));
        }
      }
    }

    const urlParams = [];
    if (block.local.url) {
      // The dummy URL base is only used for parses of relative URLs.
      const url = new URL(block.local.url, 'https://dummy.base');

      // For API parameters in the URL parts delimited by `/` (e.g. `/:foo/:bar`).
      for (const pathnamePart of url.pathname.split('/')) {
        if (pathnamePart.charAt(0) === ':') {
          urlParams.push(pathnamePart.slice(1));
        }
      }
    }
    for (const urlParam of urlParams) {
      if (!paramFields.some(pf => pf.field === urlParam) && !paramFieldsDefinedOutside.some(pf => pf.field === urlParam)) {
        log.warn(`URL contains a parameter ':${urlParam}' that is not documented as @apiParam in @api '${block.local.title}' in file: '${filename}'`);
      }
    }
    if (!block.global.define) {
      for (const paramField of paramFields) {
        // Emit the warning only if the field is mandatory.
        if (!paramField.optional && !urlParams.some(up => up === paramField.field)) {
          log.warn(`@apiParam '${paramField.field}' was defined but does not appear in URL of @api '${block.local.title}' in file: '${filename}'`);
        }
      }
    }
  }
}

function _paramFieldsFromBlock (block) {
  let paramFields = [];
  if (block.local.parameter && block.local.parameter.fields) {
    // Loop all fields regardless of the field group. The default field group is `Parameter` but it could be provided by the developer.
    for (const key in block.local.parameter.fields) {
      paramFields = paramFields.concat(block.local.parameter.fields[key]);
    }
  }
  return paramFields;
}
