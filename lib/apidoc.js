var _ = require("underscore");
var path = require("path");
var semver = require("semver");
var findFiles = require("./utils/find_files");
var path = require("path");
var PackageInfo = require("./package_info");
var Parser = require("./parser");
var Worker = require("./worker");
var Filter = require("./filter");
var colors = require("colors");
var fs = require("fs-extra");

// Options
var _defaultOptions = {
	excludeFilters: [],
	includeFilters: [ ".*\\.(coffee|cs|dart|erl|go|java|js|php?|py|rb|ts|pm)$" ],

	src: path.join(__dirname, "../example/"),
	dest: path.join(__dirname, "../doc/"),

	debug: false,
	log: true,
	simulate: false,

	template: path.join(__dirname, "../template/"),

	filters: {},
	parsers: {},
	workers: {},

	marked: {
		gfm:         true,
		tables:      true,
		breaks:      false,
		pedantic:    false,
		sanitize:    false,
		smartLists:  false,
		smartypants: false
	}
};

var options = {};
_.defaults(options, _defaultOptions);

// uncaughtException
process.on("uncaughtException", function(err) {
	console.error((new Date()).toUTCString() + " uncaughtException:", err.message);
	console.error(err.stack);
	process.exit(1);
});

/**
 * Output Debug-Messages
 *
 * @param {String} message
 */
function debug(message)
{
	if(options.debug) console.log("apidoc: " + message);
} // debug

/**
 * Output Log-Messages
 *
 * @param {String} message
 */
function log(message)
{
	if(options.log) console.log("apidoc: " + message);
} // log

/**
 * Output Error-Log-Messages
 *
 * @param {String} message
 */
function logWarn(message)
{
	if(options.log) console.warn("apidoc: " + message.yellow);
} // logWarn

var app = {
	debug: debug,
	log: log,
	logWarn: logWarn,
	options: options,
	filters: {
		apierror                 : "./filters/api_error.js",
		apiinfo                  : "./filters/api_info.js",
		apiparam                 : "./filters/api_param.js",
		apisuccess               : "./filters/api_success.js"
	},
	parsers: {
		api                      : "./parsers/api.js",
		apidefineerrorstructure  : "./parsers/api_define_error_structure.js",
		apidefineheaderstructure : "./parsers/api_define_header_structure.js",
		apidefinepermission      : "./parsers/api_define_permission.js",
		apidefinestructure       : "./parsers/api_define_structure.js",
		apidefinesuccessstructure: "./parsers/api_define_success_structure.js",
		apigroupdescription      : "./parsers/api_group_description.js",
		apidescription           : "./parsers/api_description.js",
		apierror                 : "./parsers/api_error.js",
		apierrorexample          : "./parsers/api_error_example.js",
		apierrorstructure        : "./parsers/api_error_structure.js",
		apierrortitle            : "./parsers/api_error_title.js",
		apiexample               : "./parsers/api_example.js",
		apiheader                : "./parsers/api_header.js",
		apiheaderexample         : "./parsers/api_header_example.js",
		apiheaderstructure       : "./parsers/api_header_structure.js",
		apiheadertitle           : "./parsers/api_header_title.js",
		apigroup                 : "./parsers/api_group.js",
		apiinfo                  : "./parsers/api_info.js",
		apiinfoexample           : "./parsers/api_info_example.js",
		apiinfotitle             : "./parsers/api_info_title.js",
		apiname                  : "./parsers/api_name.js",
		apiparam                 : "./parsers/api_param.js",
		apiparamtitle            : "./parsers/api_param_title.js",
		apipermission            : "./parsers/api_permission.js",
		apistructure             : "./parsers/api_structure.js",
		apisuccess               : "./parsers/api_success.js",
		apisuccessexample        : "./parsers/api_success_example.js",
		apisuccessstructure      : "./parsers/api_success_structure.js",
		apisuccesstitle          : "./parsers/api_success_title.js",
		apiversion               : "./parsers/api_version.js"
	},
	workers: {
		workererrorstructure     : "./workers/error_structure.js",
		workererrortitle         : "./workers/error_title.js",
		workerheaderstructure    : "./workers/header_structure.js",
		workerheadertitle        : "./workers/header_title.js",
		workerparamtitle         : "./workers/param_title.js",
		workerpermission         : "./workers/permission.js",
		workerstructure          : "./workers/structure.js",
		workersuccessstructure   : "./workers/success_structure.js",
		workersuccesstitle       : "./workers/success_title.js"
	}
}; // app

/**
 * Output parsed content to files
 *
 * @param {Object[]} parsedFiles
 * @param {String[]} filenames
 * @returns {Object}
 */
function createOutputFiles(parsedFiles, parsedFilenames, packageInfos)
{
	var blocks = [];
	// Reduce to get only local blocks.
	for(var fileIndex = 0; fileIndex < parsedFiles.length; fileIndex += 1)
	{
		var parsedFile = parsedFiles[fileIndex];
		for(var blockIndex = 0; blockIndex < parsedFile.length; blockIndex += 1)
		{
			var block = parsedFile[blockIndex];
			// "<= 1" if successTitle gets removed, empty Object remain.
			if(Object.keys(block.global).length <= 1 && Object.keys(block.local).length > 0)
			{
				// Add needed Elements for sorting
				if( ! block.local.group) block.local.group = path.basename( parsedFilenames[fileIndex] );
				if( ! block.local.type) block.local.type = "";
				if( ! block.local.url) block.local.url = "";
				if( ! block.local.version) block.local.version = "0.0.0";

				// Info Element
				if( ! block.local.filename) block.local.filename = parsedFilenames[fileIndex];
				// Convert dir delimeter \\ to /
				block.local.filename = block.local.filename.replace(/\\/g, "/");

				blocks.push(block.local);
			}
		} // for blockIndex
	} // for fileIndex

	// Empty
	parsedFiles = null;
	parsedFilenames = null;

	// Sort by group ASC, name ASC, version DESC
	blocks.sort(function(a, b) {
		var nameA = a.group + a.name;
		var nameB = b.group + b.name;

		if(nameA === nameB)
		{
			if(a.version === b.version) return 0;
			return (semver.gte(a.version, b.version)) ? -1 : 1;
		}
		return (nameA < nameB) ? -1 : 1;
	});

	if(options.simulate)
	{
		app.debug("");
		app.debug("!!! Simulation !!! No file or dir will be copied or created.");
		app.debug("");
	}

	app.debug("create dir: " + options.dest);
	if( ! options.simulate) fs.mkdirsSync(options.dest);

	app.debug("copy template " + options.template + " to: " + options.dest);
	if( ! options.simulate) fs.copySync(options.template, options.dest);

	// api_data
	var json = JSON.stringify(blocks, null, 2);
	json = json.replace(/(\r\n|\n|\r)/g, "\r\n");
	app.debug("write json file: " + options.dest + "api_data.json");
	if( ! options.simulate) fs.writeFileSync(options.dest + "./api_data.json", json);

	app.debug("write js file: " + options.dest + "api_data.js");
	if( ! options.simulate) fs.writeFileSync(options.dest + "./api_data.js", "define({ api: " + json + " });");

	// api_project
	var json = JSON.stringify(packageInfos, null, 2);
	json = json.replace(/(\r\n|\n|\r)/g, "\r\n");
	app.debug("write json file: " + options.dest + "api_project.json");
	if( ! options.simulate) fs.writeFileSync(options.dest + "./api_project.json", json);

	app.debug("write js file: " + options.dest + "api_project.js");
	if( ! options.simulate) fs.writeFileSync(options.dest + "./api_project.js", "define(" + json + ");");
} // createOutputFiles


/**
 * Parse files in specified folder.
 * @param {Object} parser Util to parse the files.
 * @param {Object} options The options used to parse and filder the files.
 * @param {Object[]} parsedFiles List of parsed files.
 * @param {String[]} parsedFilenames List of parsed files, with full path.
 */
function parseFiles(parser, options, parsedFiles, parsedFilenames)
{
	var files = findFiles(options);
	// Parser
	for(var i = 0; i < files.length; i += 1)
	{
		var filename = options.src + files[i];
		var parsedFile = parser.parseFile(filename);
		if(parsedFile)
		{
			app.log("parse file: " + filename);
			parsedFiles.push(parsedFile);
			parsedFilenames.push(filename);
		}
	} // for
} // parseFiles

/**
 * Main
 *
 * @return {Number} Count parsed files.
 */
function main(defaults)
{
	// bin-parameters
	if(defaults) options = _.defaults(defaults, options);

	// Paths
	options.dest     = path.join(options.dest, "./");
	options.template = path.join(options.template, "./");

	// Funktionen erweitern / ersetzen
	_.defaults(options.logger, app.logger);
	_.defaults(options.filters, app.filters);
	_.defaults(options.parsers, app.parsers);
	_.defaults(options.workers, app.workers);

	// Options
	app.options = options;

	var packageInfo = new PackageInfo(app);
	var parser = new Parser(app);
	var parsedFiles = [];
	var parsedFilenames = [];
	var worker = new Worker(app);
	var filter = new Filter(app);

	try
	{
		// If input option for source is an array of folders, 
		// parse each folder in the order provided.
		if (options.src instanceof Array)
		{
			options.src.forEach(function(folder)
			{
				// Keep same options for each folder, but ensure the "src" of options 
				// is the folder currently being processed.
				var folderOptions = options;
				folderOptions.src = path.join(folder, "./");
				parseFiles(parser, folderOptions, parsedFiles, parsedFilenames);
			});
		}
		else
		{
			// If the input option for source is a single folder, parse as usual.
			options.src = path.join(options.src, "./");
			parseFiles(parser, options, parsedFiles, parsedFilenames);
		}

		// Worker / Filter
		if(parsedFiles.length > 0)
		{
			worker.process(parsedFiles, parsedFilenames);
			filter.process(parsedFiles, parsedFilenames);

			createOutputFiles(parsedFiles, parsedFilenames, packageInfo.get());

			return parsedFiles.length;
		}
		else
		{
			app.log("Nothing to do.");
			return 0;
		}
	}
	catch(e)
	{
		if(e.stack) app.debug(e.stack);
		app.log(e);
	}
	return;
} // main

/**
 * Exports
 */
module.exports = main;

// Direct call
if(path.dirname(process.argv[1]) === __dirname) main();
