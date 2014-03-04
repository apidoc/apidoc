var fs = require("fs");
var path = require("path");
var wrench = require("wrench");

/**
 * Search files recursivly and filter by include / exlude filters.
 *
 * @param {Object[]} options                  Options.
 * @param {String}   options.src              Path to source-files.
 * @param {String[]} [options.excludeFilters] Exclude Filters.
 * @param {String[]} options.includeFilters   Include Filters.
 * @returns {String[]}
 */
function findFiles(options)
{
	var files = [];
	try {
		// Find Files
		files = wrench.readdirSyncRecursive(options.src);

		// Create RegExp Include Filter List
		var regExpIncludeFilters = [];
		filters = options.includeFilters;
		if(typeof(filters) === "string") filters = [ filters ];
		filters.forEach(function(filter) {
			if(filter.length > 0) regExpIncludeFilters.push( new RegExp(filter) );
		}); // forEach

		// RegExp Include Filter
		var length = regExpIncludeFilters.length;
		files = files.filter(function(filename) {
			// Not include Directories like "dirname.js"
			var fullFilename = path.join(options.src, filename);
			if(fs.statSync(fullFilename).isDirectory()) return 0;
			// Apply every filter
			for(var i = 0; i < length; i += 1)
			{
				if(regExpIncludeFilters[i].test(filename)) return 1;
			} // for
			return 0;
		}); // files.filter

		// Create RegExp Exclude Filter List
		var regExpExcludeFilters = [];
		filters = options.excludeFilters;
		if(typeof(filters) === "string") filters = [ filters ];
		filters.forEach(function(filter) {
			if(filter.length > 0) regExpExcludeFilters.push( new RegExp(filter) );
		}); // forEach

		// RegExp Exclude Filter
		length = regExpExcludeFilters.length;
		files = files.filter(function(filename) {
			// Apply every filter
			for(var i = 0; i < length; i += 1)
			{
				if(regExpExcludeFilters[i].test(filename)) return 0;
			} // for
			return 1;
		}); // files.filter
	} // try
	catch (e) {
		console.warn(e);
	} // catch
	finally
	{
		if( ! files || files.length === 0)
		{
			console.log("apidoc: no files found in " + options.src);
			process.exit(0);
		}
	} // finally
	return files;
} // findFiles

/**
 * Exports
 */
module.exports = findFiles;
