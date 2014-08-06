var util = require("util");

var app = {};

function Filter(_app)
{
	var self = this;

	// Global Variables
	app = _app;

	// Class Variables
	this.filters = [];

	// Load Filters
	var filters = Object.keys(app.filters);
	filters.forEach(function(filter) {
		var filename = app.filters[filter];
		app.debug("load filter: " + filter + ", " + filename);
		self.addFilter(filter, require(filename));
	});
} // Filter

/**
 * Inherit
 */
util.inherits(Filter, Object);

/**
 * Exports
 */
module.exports = Filter;

/**
 * Add Filter
 */
Filter.prototype.addFilter = function(name, filter)
{
	this.filters.push(filter);
}; // addFiler

/**
 * Execute filter
 */
Filter.prototype.process = function(parsedFiles, parsedFilenames)
{
    var self = this;
    self.filters.forEach(function(filter){
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
    });

}; // process
