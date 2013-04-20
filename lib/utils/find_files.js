var wrench = require("wrench");

/**
 * Sucht rekursiv nach Dateien im Source-Verzeichnis und filtert die gewünschten Dateien aus.
 *
 * @param {Object[]} options                Programmoptionen.
 * @param {String}   options.src            Pfad zu den Quelldateien.
 * @param {String[]} options.includeFilters Filterregeln zu verwendende Dateien.
 * @returns {String[]}
 */
function findFiles(options)
{
	var files = [];
	try {
		// Dateien rekursiv finden
		files = wrench.readdirSyncRecursive(options.src);

		// RegExp-Filterregeln erstellen
		var regExpFilters = [];
		filters = options.includeFilters;
		if(typeof(filters) === "string") filters = [ filters ];
		filters.forEach(function(filter) {
			regExpFilters.push( new RegExp(filter) );
		}); // forEach

		// Filtern mit RegExp-Filterregeln
		var length = regExpFilters.length;
		files = files.filter(function(filename) {
			for(var i = 0; i < length; i += 1)
			{
				if(regExpFilters[i].test(filename)) return 1;
			} // for
			return 0;
		}); // files.filter
	} // try
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
 * Exports.
 */
module.exports = findFiles;