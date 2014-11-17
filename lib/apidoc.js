var _ = require('lodash');
var path = require('path');
var semver = require('semver');
var PackageInfo = require('./package_info');
var Parser = require('./parser');
var Worker = require('./worker');
var Filter = require('./filter');
var colors = require('colors');var fs = require('fs-extra');
var logger = require('./utils/console_logger');
var FileError = require('./errors/file_error');
var ParameterError = require('./errors/parameter_error');
var ParserError = require('./errors/parser_error');
var WorkerError = require('./errors/worker_error');

// const
var APIDOC_SPECIFICATION_VERSION = '0.2.0';

// Options
var _defaultOptions = {
    excludeFilters: [],
    includeFilters: [ '.*\\.(coffee|cs|dart|erl|go|java|js|php?|py|rb|ts|pm)$' ],

    src: path.join(__dirname, '../example/'),
    dest: path.join(__dirname, '../doc/'),

    debug: false,
    silent: false,
    verbose: false,
    simulate: false,
    parse: false, // only parse and return the data, no file creation

    template: path.join(__dirname, '../template/'),

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

var app = {
    log: logger,
    options: options,
    filters: {
        apierror                 : './filters/api_error.js',
        apiheader                : './filters/api_header.js',
        apiparam                 : './filters/api_param.js',
        apisuccess               : './filters/api_success.js'
    },
    parsers: {
        api                      : './parsers/api.js',
        apidefine                : './parsers/api_define.js',
        apidefineerrorstructure  : './parsers/api_define_error_structure.js',
        apidefineheaderstructure : './parsers/api_define_header_structure.js',
        apidefinepermission      : './parsers/api_define_permission.js',
        apidefinestructure       : './parsers/api_define_structure.js',
        apidefinesuccessstructure: './parsers/api_define_success_structure.js',
        apigroupdescription      : './parsers/api_group_description.js',
        apidescription           : './parsers/api_description.js',
        apierror                 : './parsers/api_error.js',
        apierrorexample          : './parsers/api_error_example.js',
        apierrorstructure        : './parsers/api_error_structure.js',
        apierrortitle            : './parsers/api_error_title.js',
        apiexample               : './parsers/api_example.js',
        apiheader                : './parsers/api_header.js',
        apiheaderexample         : './parsers/api_header_example.js',
        apiheaderstructure       : './parsers/api_header_structure.js',
        apiheadertitle           : './parsers/api_header_title.js',
        apigroup                 : './parsers/api_group.js',
        apiname                  : './parsers/api_name.js',
        apiparam                 : './parsers/api_param.js',
        apiparamexample          : './parsers/api_param_example.js',
        apiparamtitle            : './parsers/api_param_title.js',
        apipermission            : './parsers/api_permission.js',
        apistructure             : './parsers/api_structure.js',
        apisuccess               : './parsers/api_success.js',
        apisuccessexample        : './parsers/api_success_example.js',
        apisuccessstructure      : './parsers/api_success_structure.js',
        apisuccesstitle          : './parsers/api_success_title.js',
        apiuse                   : './parsers/api_use.js',
        apiversion               : './parsers/api_version.js',
        apisamplerequest         : './parsers/api_sample_request.js'
    },
    workers: {
        apierrorstructure        : './workers/api_error_structure.js',
        apierrortitle            : './workers/api_error_title.js',
        apigroup                 : './workers/api_group.js',
        apiheaderstructure       : './workers/api_header_structure.js',
        apiheadertitle           : './workers/api_header_title.js',
        apiname                  : './workers/api_name.js',
        apiparamtitle            : './workers/api_param_title.js',
        apipermission            : './workers/api_permission.js',
        apisamplerequest         : './workers/api_sample_request.js',
        apistructure             : './workers/api_structure.js',
        apisuccessstructure      : './workers/api_success_structure.js',
        apisuccesstitle          : './workers/api_success_title.js',
        apiuse                   : './workers/api_use.js',

        deprecatedApiErrorTitle  : './workers/deprecated_api_error_title.js',
        deprecatedApiHeaderTitle : './workers/deprecated_api_header_title.js',
        deprecatedApiParamTitle  : './workers/deprecated_api_param_title.js',
        deprecatedApiSuccessTitle: './workers/deprecated_api_success_title.js'
    }
}; // app

// uncaughtException
process.on('uncaughtException', function(err) {
    console.error((new Date()).toUTCString() + ' uncaughtException:', err.message);
    console.error(err.stack);
    process.exit(1);
});

/**
 * Parser
 *
 * @param {Object} defaults Overwrite default options.
 * @returns {Mixed} False on error | 0 = nothing todo | 1 = everything ok | List of Parsed files (if parse is set).
 */
function parse(defaults) {
    // bin-parameters
    if (defaults)
        options = _.defaults(defaults, options);

    // Paths
    options.dest     = path.join(options.dest, './');
    options.template = path.join(options.template, './');

    // extend with custom functions
    app.filters = _.defaults(options.filters, app.filters);
    app.parsers = _.defaults(options.parsers, app.parsers);
    app.workers = _.defaults(options.workers, app.workers);

    // Options
    app.options = options;

    // Log
    app.log.setDebug(app.options.debug);
    app.log.setSilent(app.options.silent);
    app.log.setVerbose(app.options.verbose);

    var parsedFiles = [];
    var parsedFilenames = [];

    try {
        var packageInfo = new PackageInfo(app);
        var parser = new Parser(app);
        var worker = new Worker(app);
        var filter = new Filter(app);

        // If input option for source is an array of folders,
        // parse each folder in the order provided.
        if (options.src instanceof Array) {
            options.src.forEach(function(folder) {
                // Keep same options for each folder, but ensure the 'src' of options
                // is the folder currently being processed.
                var folderOptions = options;
                folderOptions.src = path.join(folder, './');
                parser.parseFiles(folderOptions, parsedFiles, parsedFilenames);
            });
        }
        else {
            // If the input option for source is a single folder, parse as usual.
            options.src = path.join(options.src, './');
            parser.parseFiles(options, parsedFiles, parsedFilenames);
        }

        if (parsedFiles.length > 0) {
            var packageInfos = packageInfo.get();

            // process transformations and assignments
            worker.process(parsedFiles, parsedFilenames, packageInfos);

            // cleanup
            var blocks = filter.process(parsedFiles, parsedFilenames);

            // create files
            var result = createOutputFiles(blocks, packageInfos);

            app.log.success('Done.');
            return result;
        } else {
            app.log.success('Nothing to do.');
            return 0;
        }
    } catch(e) {
        // display error by instance
        if (e instanceof FileError) {
            var extra = [];
            extra.push({ 'Path': e.path });
            app.log.error(e.message, extra);
        } else if (e instanceof ParserError) {
            var extra = e.extra;
            if (e.source)
                extra.unshift({ 'Source': e.source });
            if (e.element)
                extra.unshift({ 'Element': '@' + e.element });
            if (e.block)
                extra.unshift({ 'Block': e.block });
            if (e.file)
                extra.unshift({ 'File': e.file });
            app.log.error(e.message, extra);
        }
        else if (e instanceof WorkerError) {
            var extra = e.extra;
            if (e.definition)
                extra.push({ 'Definition': e.definition });
            if (e.example)
                extra.push({ 'Example': e.example });
            extra.unshift({ 'Element': '@' + e.element });
            extra.unshift({ 'Block': e.block });
            extra.unshift({ 'File': e.file });
            app.log.error(e.message, extra);
        }
        else {
            if (e.stack)
                app.log.debug(e.stack);
            app.log.error(e);
        }

        // bubble error
        throw e;
    }
    return;
}

/**
 * Output parsed content to files
 *
 * @param {Object[]} blocks
 * @param {String[]} filenames
 * @returns {Object}
 */
function createOutputFiles(blocks, packageInfos) {

    // TODO: sorting after filtering
    // sort by group ASC, name ASC, version DESC
    blocks.sort(function(a, b) {
        var nameA = a.group + a.name;
        var nameB = b.group + b.name;
        if (nameA === nameB) {
            if (a.version === b.version)
                return 0;
            return (semver.gte(a.version, b.version)) ? -1 : 1;
        }
        return (nameA < nameB) ? -1 : 1;
    });

    if (options.simulate)
        app.log.warning('!!! Simulation !!! No file or dir will be copied or created.');

    // api_data
    var apiData = JSON.stringify(blocks, null, 2);
    apiData = apiData.replace(/(\r\n|\n|\r)/g, '\r\n');

    // add apiDoc specification version
    packageInfos.apidoc = APIDOC_SPECIFICATION_VERSION;

    // api_project
    var apiProject = JSON.stringify(packageInfos, null, 2);
    apiProject = apiProject.replace(/(\r\n|\n|\r)/g, '\r\n');

    if (options.parse === true)
        return {
            apiData   : apiData,
            apiProject: apiProject
        };

    app.log.debug('create dir: ' + options.dest);
    if ( ! options.simulate)
        fs.mkdirsSync(options.dest);

    app.log.debug('copy template ' + options.template + ' to: ' + options.dest);
    if ( ! options.simulate)
        fs.copySync(options.template, options.dest);

    // Write api_data
    app.log.debug('write json file: ' + options.dest + 'api_data.json');
    if( ! options.simulate)
        fs.writeFileSync(options.dest + './api_data.json', apiData);

    app.log.debug('write js file: ' + options.dest + 'api_data.js');
    if( ! options.simulate)
        fs.writeFileSync(options.dest + './api_data.js', 'define({ api: ' + apiData + ' });');

    // Write api_project
    app.log.debug('write json file: ' + options.dest + 'api_project.json');
    if( ! options.simulate)
        fs.writeFileSync(options.dest + './api_project.json', apiProject);

    app.log.debug('write js file: ' + options.dest + 'api_project.js');
    if( ! options.simulate)
        fs.writeFileSync(options.dest + './api_project.js', 'define(' + apiProject + ');');

    return true;
}

/**
 * Exports
 */
module.exports = parse;

// Direct call
if (path.dirname(process.argv[1]) === __dirname) {
    try {
        parse();
    } catch (e) {}
}
