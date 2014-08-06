var fs = require("fs");
var path = require("path");
var util = require("util");
var _ = require("underscore");
var markdown = require("marked");

var app = {};

function Parser(_app)
{
	var self = this;

	// Global Variables
	app = _app;

	// Class Variables
	self.parsers = {};
	self.parsedFileElements = [];
	self.parsedFiles = [];

	// Markdown settings
	markdown.setOptions(app.options.marked);

	// Parser laden
	var parsers = Object.keys(app.parsers);
	parsers.forEach(function(parser) {
		var filename = app.parsers[parser];
		app.debug("load parser: " + parser + ", " + filename);
		self.addParser(parser, require(filename));
	});
} // Parser

/**
 * Inherit
 */
util.inherits(Parser, Object);

/**
 * Exports
 */
module.exports = Parser;

/**
 * Add a Parser
 */
Parser.prototype.addParser = function(name, parser)
{
	this.parsers[name] = parser;
}; // addParser

/**
 * Execute Fileparsing
 */
Parser.prototype.parseFile = function(filename)
{
	var self = this;

	app.debug("inspect file: " + filename);

	self.filename = filename;
	self.extension = path.extname(filename).toLowerCase();
	self.src = fs.readFileSync(filename, "utf8").toString();
	app.debug("size: " + self.src.length);

	// Unify Linebreaks
	self.src = self.src.replace(/\r\n/g, "\n");

	self.blocks = [];
	self.elements = [];
	self.indexApiBlocks = [];

	// Determine Blocks
	self.blocks = self._findBlocks();
	if(self.blocks.length === 0) return;
	app.debug("count blocks: " + self.blocks.length);

	// Determine Elements of Blocks
	for(var i = 0; i < self.blocks.length; i += 1)
	{
		var elements = self._findElements(self.blocks[i]);
		self.elements.push(elements);
		app.debug("count elements in block " + i + ": " + self.elements[i].length);
	} // for
	if(self.elements.length === 0) return;

	// Determine List of Blocks with API-Elements
	self.indexApiBlocks = self._findBlockWithApiGetIndex(self.elements);
	if(self.indexApiBlocks.length === 0) return;

	return self._parseBlockElements(self.indexApiBlocks, self.elements);
}; // parseFile

/**
 * Parse API Elements with Plugins
 *
 * @param indexApiBlocks
 * @param detectedElements
 * @returns {___anonymous2249_2250}
 */
Parser.prototype._parseBlockElements = function(indexApiBlocks, detectedElements)
{
	var self = this;
	var parsedBlocks = [];
	for(var i = 0; i < indexApiBlocks.length; i += 1)
	{
		var blockIndex = indexApiBlocks[i];
		var elements = detectedElements[blockIndex];
		var blockData = {
			global: {},
			local: {}
		};
		var preventGlobal = false;
		var countAllowedMultiple = 0;
		for(var j = 0; j < elements.length; j += 1)
		{
			var element = elements[j];
			if(self.parsers[element.name])
			{
				// Determine Fieldvalues
				var result = null;
				try {
					result = self.parsers[element.name].parse(element.content, element.source);

					// Markdown
					// TODO: Evaluate if better add a function in specific worker_{name}.js
					if(app.options.marked.gfm &&
						 self.parsers[element.name].markdownFields &&
						 self.parsers[element.name].markdownFields.length > 0
					)
					{
						for(var markdownIndex = 0; markdownIndex < self.parsers[element.name].markdownFields.length; markdownIndex += 1)
						{
							var markdownField = self.parsers[element.name].markdownFields[markdownIndex];
							if(result[markdownField])
							{
								result[markdownField] = markdown(result[markdownField]);
								// remove line breaks.
								result[markdownField] = result[markdownField].replace(/(\r\n|\n|\r)/g, "");
							}
						} // for
					}
				}
				catch(e)
				{
					throw new Error("\"@" + element.sourceName + "\" in file \"" + self.filename +
						"\" block number " + (blockIndex + 1) + " " + e
					);
				}

				if( ! result)
				{
					throw new Error("Empty result for \"@" + element.sourceName + "\" in file \"" + self.filename +
						"\" block number " + (blockIndex + 1) + "."
					);
				}

				// Check if it is allowed to add to global namespace.
				if(self.parsers[element.name].preventGlobal && self.parsers[element.name].preventGlobal === true)
				{
					preventGlobal = true;
					// Check if count global namespace entries > count allowed
					// (e.g. @successTitle is global, but should co-exist with @apiErrorStructure)
					if(Object.keys(blockData.global).length > countAllowedMultiple)
					{
						throw new Error("Can't set \"@" + element.sourceName + "\" in file \"" + self.filename +
							"\" block number " + (blockIndex + 1) + ", only one definition or use is allowed in the same block."
						);
					}
				}
				if(self.parsers[element.name].pushTo)
				{
					// Fieldvalues will be inserted into subpath
					var pushTo = self.parsers[element.name].pushTo();

					// Only one global allowed per block
					if(pushTo === "global" || pushTo.substr(0, 7) === "global.")
					{
						var allowMultiple = self.parsers[element.name].allowMultiple || false;

						if(allowMultiple)
						{
							countAllowedMultiple += 1;
						}
						else
						{
							if(Object.keys(blockData.global).length > 0)
							{
								throw new Error("Can't set \"@" + element.sourceName + "\" in file \"" + self.filename +
									"\" block number " + (blockIndex + 1) + ", only one definition per block allowed."
								);
							}

							if(preventGlobal === true)
							{
								throw new Error("Can't set \"@" + element.sourceName + "\" in file \"" + self.filename +
									"\" block number " + (blockIndex + 1) + ", only one definition or use is allowed in the same block."
								);
							}
						}
					}

					if( ! blockData[pushTo])
					{
						// Create path
						self._createObjectPath(blockData, pushTo);
					}

					var blockDataPath = _pathToObject(pushTo, blockData);

					// Insert Fieldvalues in Path-Array
					if(typeof(blockData[pushTo]) === "object")
					{
						_.extend(blockData[pushTo], result);
					}
					else
					{
						blockDataPath.push(result);
					}

					if(self.parsers[element.name].extendRoot === true)
					{
						// Insert Fieldvalues in Mainpath
						_.extend(blockData, result);
					}
				}
				else
				{
					// Insert Fieldvalues in Mainpath
					_.extend(blockData, result);
				}
				blockData.index = blockIndex + 1;
			}
			else
			{
				app.logWarn("parser plugin \"" + element.name + "\" not found.");
			}
		} // for
		parsedBlocks.push(blockData);
	} // for
	return parsedBlocks;
};

/**
 * Return Path to Object.
 */
function _pathToObject(path, src) {
	if( ! path) return src;
	var pathParts = path.split(".");
	var current = src;
	for(var i = 0; i < pathParts.length; i += 1)
	{
		var part = pathParts[i];
		current = current[part];
	} // for
  return current;
} // _pathToObject

/**
 * Create a not existing Path in an Object.
 *
 * @param src
 * @param path
 * @returns {Object}
 */
Parser.prototype._createObjectPath = function(src, path)
{
	if( ! path) return src;
	var pathParts = path.split(".");
	var current = src;
	for(var i = 0; i < pathParts.length; i += 1)
	{
		var part = pathParts[i];
		if( ! current[part])
		{
			if(i === (pathParts.length - 1) ) current[part] = [];
			else current[part] = {};
		}
		current = current[part];
	} // for
	return current;
}; // _createObjectPath

/**
 * Determine Blocks
 */
Parser.prototype._findBlocks = function()
{
    var self = this;
    var blocks = [];
    var src = self.src;

    // Replace Linebreak with Unicode
    src = src.replace(/\n/g, "\uffff");

    var regexs = {
        '.coffee': {
            // Find document blocks between "###" and "###"
            docBlocksRegExp: /###\uffff?(.+?)###/g,
            // Remove not needed "	" (tabs) at the beginning
            inlineRegExp: /^(\t+)?[ ]?/gm
        },
        '.erl': {
            // Find document blocks between "%{" and "%}"
            docBlocksRegExp: /\%\{\uffff?(.+?)\%\}/g,
            // Remove not needed " % " and "	" (tabs) at the beginning
            // HINT: Not sure if erlang developer use the %, but i think it should be no problem
            inlineRegExp: /^(\t+)?(\%)[ ]?/gm
        },
        '.py': {
            // Find document blocks between """ and """
            docBlocksRegExp: /\"\"\"\uffff?(.+?)\"\"\"/g,
            // Remove not needed "	" (tabs) at the beginning
            inlineRegExp: /^(\t+)?[ ]?/gm
        },
        '.rb': {
            // Find document blocks between "=begin" and "=end"
            docBlocksRegExp: /\=begin\uffff?(.+?)\=end/g,
            // Remove not needed "	" (tabs) at the beginning
            inlineRegExp: /^(\t+)?[ ]?/gm
        },
        '.pm': {
            // Find document blocks between "#**" and "#*"
            docBlocksRegExp: /#\*\*\uffff?(.+?)#\*/g,
            // Remove not needed " # " and "    " (tabs) at the beginning
            inlineRegExp: /^(\s+)?(#)[ ]?/gm
        },
        'default': {
            // Find document blocks between "#**" and "#*"
            docBlocksRegExp: /\/\*\*\uffff?(.+?)\*\//g,
            // Remove not needed " # " and "	" (tabs) at the beginning
            inlineRegExp: /^(\s+)?(\*)[ ]?/gm
        }
    };
    var regexForFile = regexs[self.extension] || regexs['default'];
    var matches = regexForFile.docBlocksRegExp.exec(src);
    while(matches)
    {
        var block = matches[1];

        // Reverse Unicode Linebreaks
        block = block.replace(/\uffff/g, "\n");

        block = block.replace(regexForFile.inlineRegExp, "");

        blocks.push(block);

        // Find next
        matches = regexForFile.docBlocksRegExp.exec(src);
    } // while
    return blocks;

}; // _findBlocks

/**
 * Check if block has API elements and return block indexes.
 */
Parser.prototype._findBlockWithApiGetIndex = function(blocks)
{
    var foundIndexes = [];
    blocks.forEach(function(block, i){
        var add;
        block.forEach(function(element)
        {
            if(add !== false){
                add = element.name.substr(0, 3) == "api" && element.name.substr(0, 9) != "apiignore";
            }
        });
        if(add)
        {
            foundIndexes.push(i);
            app.debug("api found in block: " + i);
        }
    });
    return foundIndexes;
}; // _findBlockWithApiGetIndex

/**
 * Get Elements of Blocks.
 */
Parser.prototype._findElements = function(block)
{
	var self = this;
	var elements = [];

	// Replace Linebreak with Unicode
	block = block.replace(/\n/g, "\uffff");

	// Elements start with @
	var elementsRegExp = /(@(\w*)\s?(.+?)(?=\uffff[\s\*]*@|$))/gm;
	var matches = elementsRegExp.exec(block);
	while(matches)
	{
		var element = {
			source: matches[1],
			name: matches[2].toLowerCase(),
			sourceName: matches[2],
			content: matches[3]
		};

		// Reverse Unicode Linebreaks
		element.content = element.content.replace(/\uffff/g, "\n");
		element.source = element.source.replace(/\uffff/g, "\n");

		elements.push(element);

		// Next Match
		matches = elementsRegExp.exec(block);
	}
	return elements;
}; // _findElements
