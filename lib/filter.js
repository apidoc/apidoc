var util = require("util");
var _ = require("underscore");
var semver = require("semver");

var app = {};

function Filter(_app)
{
	var self = this;

	// Globale Variablen
	app = _app;

	// Klassenvariablen
	this.filters = [];

	// Process laden
	var filters = Object.keys(app.filters);
	filters.forEach(function(filter) {
		var filename = app.filters[filter];
		app.debug("load filter: " + filter + ", " + filename);
		self.addFilter(filter, require(filename));
	});
} // Filter

/**
 * Vererben.
 */
util.inherits(Filter, Object);

/**
 * Exports.
 */
module.exports = Filter;

/**
 * Filter hinzufügen.
 */
Filter.prototype.addFilter = function(name, filter)
{
	this.filters.push(filter);
}; // addFiler

/**
 * Ausführung.
 */
Filter.prototype.process = function(parsedFiles, parsedFilenames)
{
	var self = this;
	// Post filters
	for(var i = 0; i < self.filters.length; i += 1)
	{
		var filter = self.filters[i];
		if(filter.postFilter)
		{
			try
			{
				filter.postFilter(parsedFiles, parsedFilenames);
			}
			catch(e)
			{
				throw e;
			}
		}
	} // for
}; // process