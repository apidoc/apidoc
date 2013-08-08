var fs = require("fs");
var util = require("util");
var _ = require("underscore");
var semver = require("semver");

var app = {};

function Parser(_app)
{
	var self = this;

	// Globale Variablen
	app = _app;

	// Klassenvariablen
	self.parsers = {};
	self.parsedFileElements = [];
	self.parsedFiles = [];

	// Parser laden
	var parsers = Object.keys(app.parsers);
	parsers.forEach(function(parser) {
		var filename = app.parsers[parser];
		app.debug("load parser: " + parser + ", " + filename);
		self.addParser(parser, require(filename));
	});
} // Parser

/**
 * Vererben.
 */
util.inherits(Parser, Object);

/**
 * Exports.
 */
module.exports = Parser;

/**
 * Parser hinzufügen.
 */
Parser.prototype.addParser = function(name, parser)
{
	this.parsers[name] = parser;
}; // addParser

/**
 * Ausführung.
 */
Parser.prototype.parseFile = function(filename)
{
	var self = this;

	app.debug("inspect file: " + filename);

	self.filename = filename;
	self.src = fs.readFileSync(filename, "utf8").toString();
	app.debug("size: " + self.src.length);

	// Zeilenumbrüche vereinheitlichen
	self.src = self.src.replace(/\r\n/g, "\n");

	self.blocks = [];
	self.elements = [];
	self.indexApiBlocks = [];

	// Blöcke ermitteln
	self.blocks = self._findBlocks();
	if(self.blocks.length === 0) return;
	app.debug("count blocks: " + self.blocks.length);

	// Elemente der Blöcke ermitteln
	for(var i = 0; i < self.blocks.length; i += 1)
	{
		var elements = self._findElements(self.blocks[i]);
		self.elements.push(elements);
		app.debug("count elements in block " + i + ": " + self.elements[i].length);
	} // for
	if(self.elements.length === 0) return;

	// Liste der Blöcke mit API-Elementen ermitteln
	self.indexApiBlocks = self._findBlockWithApiGetIndex(self.elements);
	if(self.indexApiBlocks.length === 0) return;

	return self._parseBlockElements(self.indexApiBlocks, self.elements);
}; // parseFile

/**
 * API Elemente durch Plugins parsen
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
		for(var j = 0; j < elements.length; j += 1)
		{
			var element = elements[j];
			if(self.parsers[element.name])
			{
				// Feldwerte ermitteln
				var result = null;
				try {
					result = self.parsers[element.name].parse(element.content, element.source);
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

				if(self.parsers[element.name].preventGlobal && self.parsers[element.name].preventGlobal === true)
				{
					preventGlobal = true;
					if(Object.keys(blockData.global).length > 0)
					{
						throw new Error("Can't set \"@" + element.sourceName + "\" in file \"" + self.filename +
							"\" block number " + (blockIndex + 1) + ", only one definition or use is allowed in the same block."
						);
					}
				}
				if(self.parsers[element.name].pushTo)
				{
					// Feldwerte werden zu einem Unterpfad hinzugefügt
					var pushTo = self.parsers[element.name].pushTo();

					// Only one global allowed per block
					if(pushTo === "global" || pushTo.substr(0, 7) === "global.")
					{
						var allowMultiple = self.parsers[element.name].allowMultiple || false;

						if( ! allowMultiple)
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
						// Pfad wird angelegt
						self._createObjectPath(blockData, pushTo);
					}

					var blockDataPath = _pathToObject(pushTo, blockData);
					// Feldwerte in Pfad-Array einfügen
					if(typeof(blockData[pushTo]) === "object")
					{
						_.extend(blockData[pushTo], result);
					}
					else
					{
						blockDataPath.push(result);
					}

					// Zusätzlich in Root einfügen
					if(self.parsers[element.name].extendRoot === true)
					{
						// Feldwerte in Hauptpfad einfügen
						_.extend(blockData, result);
					}
				}
				else
				{
					// Feldwerte in Hauptpfad einfügen
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
 * Blöcke ermitteln.
 */
Parser.prototype._findBlocks = function()
{
	var self = this;
	var blocks = [];
	var src = self.src;

	// Zeilenumbrüche durch Unicode ersetzen
	src = src.replace(/\n/g, "\uffff");

	// Entfernt in den gefundenen Blöcken die überflüssigen " * " und "   " am Anfang.
	//var starsRegExp = /^\s?(\*|\s)?\s?/gm;
	var starsRegExp = /^\s?(\*|\s)[ ]?/gm;

	// Findet die Dokumentblöcke zwischen "/**" und "*/"
	var docBlocksRegExp = /\/\*\*\uffff(.+?)\*\//g;
	var matches = docBlocksRegExp.exec(src);
	while(matches)
	{
		var block = matches[1];

		// Unicode Zeilenumbrüche zurückwandeln
		block = block.replace(/\uffff/g, "\n");

		block = block.replace(starsRegExp, "");

		blocks.push(block);

		// Nächsten Eintrag finden
		matches = docBlocksRegExp.exec(src);
	} // while
	return blocks;
}; // _findBlocks

/**
 * Prüfen ob es API-Elemente sind und liefert den Block-Index zurück.
 */
Parser.prototype._findBlockWithApiGetIndex = function(elements)
{
	var foundIndexes = [];
	for(var i = 0; i < elements.length; i += 1)
	{
		var foundIndex = -1;
		for(var j = 0; j < elements[i].length; j += 1)
		{
			if(elements[i][j].name.substr(0, 3) === "api")
			{
				foundIndex = j;
			}
			if(elements[i][j].name.substr(0, 9) === "apiignore")
			{
				foundIndex = -1;
				break;
			}
		} // for
		if(foundIndex >= 0)
		{
			foundIndexes.push(i);
			app.debug("api found in block: " + i);
		}
	} // for
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