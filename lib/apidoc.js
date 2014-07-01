var _ = require("underscore");
var path = require("path");
var semver = require("semver");
var findFiles = require("./utils/find_files");
var path = require("path");
var Parser = require("./parser");
var Worker = require("./worker");
var Filter = require("./filter");
var markdown = require("marked");
var colors = require("colors");
var fs = require("fs-extra");

// Options
var _defaultOptions = {
	excludeFilters: [],
	includeFilters: [ ".*\\.(coffee|cs|dart|erl|go|java|js|php?|py|rb|ts)$" ],

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
	filters: {
		apierror                 : "./plugins/filter_api_error.js",
		apiinfo                  : "./plugins/filter_api_info.js",
		apiparam                 : "./plugins/filter_api_param.js",
		apisuccess               : "./plugins/filter_api_success.js"
	},
	parsers: {
		api                      : "./plugins/parser_api.js",
		apidefineerrorstructure  : "./plugins/parser_api_define_error_structure.js",
		apidefineheaderstructure : "./plugins/parser_api_define_header_structure.js",
		apidefinepermission      : "./plugins/parser_api_define_permission.js",
		apidefinestructure       : "./plugins/parser_api_define_structure.js",
		apidefinesuccessstructure: "./plugins/parser_api_define_success_structure.js",
		apigroupdescription      : "./plugins/parser_api_group_description.js",
		apidescription           : "./plugins/parser_api_description.js",
		apierror                 : "./plugins/parser_api_error.js",
		apierrorexample          : "./plugins/parser_api_error_example.js",
		apierrorstructure        : "./plugins/parser_api_error_structure.js",
		apierrortitle            : "./plugins/parser_api_error_title.js",
		apiexample               : "./plugins/parser_api_example.js",
		apiheader                : "./plugins/parser_api_header.js",
		apiheaderexample         : "./plugins/parser_api_header_example.js",
		apiheaderstructure       : "./plugins/parser_api_header_structure.js",
		apiheadertitle           : "./plugins/parser_api_header_title.js",
		apigroup                 : "./plugins/parser_api_group.js",
		apiinfo                  : "./plugins/parser_api_info.js",
		apiinfoexample           : "./plugins/parser_api_info_example.js",
		apiinfotitle             : "./plugins/parser_api_info_title.js",
		apiname                  : "./plugins/parser_api_name.js",
		apiparam                 : "./plugins/parser_api_param.js",
		apiparamtitle            : "./plugins/parser_api_param_title.js",
		apipermission            : "./plugins/parser_api_permission.js",
		apistructure             : "./plugins/parser_api_structure.js",
		apisuccess               : "./plugins/parser_api_success.js",
		apisuccessexample        : "./plugins/parser_api_success_example.js",
		apisuccessstructure      : "./plugins/parser_api_success_structure.js",
		apisuccesstitle          : "./plugins/parser_api_success_title.js",
		apiversion               : "./plugins/parser_api_version.js"
	},
	workers: {
		workererrorstructure     : "./plugins/worker_error_structure.js",
		workererrortitle         : "./plugins/worker_error_title.js",
		workerheaderstructure    : "./plugins/worker_header_structure.js",
		workerheadertitle        : "./plugins/worker_header_title.js",
		workerparamtitle         : "./plugins/worker_param_title.js",
		workerpermission         : "./plugins/worker_permission.js",
		workerstructure          : "./plugins/worker_structure.js",
		workersuccessstructure   : "./plugins/worker_success_structure.js",
		workersuccesstitle       : "./plugins/worker_success_title.js"
	}
}; // app

/**
 * Read package.json Data and optianl descriptions
 */
function getPackageData()
{
	var packageInfos = {};
	try
	{
		var filename = path.join(options.src, "package.json");
		if( ! fs.existsSync(filename))
		{
			filename = "./package.json";
		}
		var json = JSON.parse( fs.readFileSync(filename, "utf8") );
		app.debug("read: " + filename);

		packageInfos.name        = json.name;
		packageInfos.version     = json.version;
		packageInfos.description = json.description;
		packageInfos.title       = json.apidoc.title;

		// HINT: url could be replaced in the future with an @apiVariable, so versioning could be used.
		packageInfos.url         = json.apidoc.url;

		if(json.apidoc.header && json.apidoc.header.filename)
		{
			var filename = path.join(options.src, json.apidoc.header.filename);
			if( ! fs.existsSync(filename))
			{
				filename = path.join("./", json.apidoc.header.filename);
			}
			packageInfos.header = {
				title  : json.apidoc.header.title,
				content: markdown( fs.readFileSync(filename, "utf8") )
			};
			app.debug("read: " + filename);
		}

		if(json.apidoc.footer && json.apidoc.footer.filename)
		{
			var filename = path.join(options.src, json.apidoc.footer.filename);
			if( ! fs.existsSync(filename))
			{
				filename = path.join("./", json.apidoc.footer.filename);
			}
			packageInfos.footer = {
				title  : json.apidoc.footer.title,
				content: markdown( fs.readFileSync(filename, "utf8") )
			};
			app.debug("read: " + filename);
		}
	}
	catch(e) {
		app.debug("No package.json found!");
	}

	// Generator Information
	try
	{
		var apidocPath = path.join(__dirname, "../");
		var json = JSON.parse( fs.readFileSync(apidocPath + "package.json", "utf8") );
		packageInfos.generator = {
			version: json.version,
			time: new Date()
		};
	}
	catch(e) {}

	return packageInfos;
} // getPackageData

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
}

/**
 * Main
 *
 * @return {Number} Count parsed files.
 */
function main(defaults)
{
	// bin-parameters
	if(defaults) options = _.defaults(defaults, options);

	// marked (markdown) Settings.
	markdown.setOptions(options.marked);

	// Paths
	options.dest     = path.join(options.dest, "./");
	options.template = path.join(options.template, "./");

	// Funktionen erweitern / ersetzen
	_.defaults(options.logger, app.logger);
	_.defaults(options.filters, app.filters);
	_.defaults(options.parsers, app.parsers);
	_.defaults(options.workers, app.workers);

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

			var packageInfos = getPackageData();
			createOutputFiles(parsedFiles, parsedFilenames, packageInfos);

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
