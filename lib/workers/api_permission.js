var semver = require('semver');
var WorkerError = require('../errors/worker_error');

// Additional information for error log
var _messages = {
    common: {
        element: 'apiPermission',
        usage  : '@apiPermission group',
        example: '@apiDefine MyValidPermissionGroup Some title\n@apiPermission MyValidPermissionGroup'
    }
};

/**
 * PreProcess
 *
 * @param {Object[]} parsedFiles
 * @param {String[]} filenames
 * @param {Object}   packageInfos
 * @param {String}   target       Target path in preProcess-Object (returned result), where the data should be set.
 * @returns {Object}
 */
function preProcess(parsedFiles, filenames, packageInfos, target) {
    target = target || 'definePermission';
    var source = 'define'; // relative path to the tree (global.), from where the data should be fetched.

    var result = {};
    result[target] = {};

    parsedFiles.forEach(function(parsedFile) {
        parsedFile.forEach(function(block) {
            if (block.global[source]) {
                var name = block.global[source].name;
                var version = block.version || '0.0.0';

                if ( ! result[target][name])
                    result[target][name] = {};

                // fetch from local
                result[target][name][version] = block.global[source];
            }
        });
    });

    if (result[target].length === 0)
        delete result[target];

    return result;
}

/**
 * PostProcess
 *
 * @param {Object[]} parsedFiles
 * @param {String[]} filenames
 * @param {Object[]} preProcess
 * @param {Object}   packageInfos
 * @param {String}   source       Source path in preProcess-Object
 * @param {String}   target       Relative path to the tree (local.), where the data should be modified.
 * @param {String}   messages
 */
function postProcess(parsedFiles, filenames, preProcess, packageInfos, source, target, messages) {
    source = source || 'definePermission';
    target = target || 'permission';
    messages = messages || _messages;

    parsedFiles.forEach(function(parsedFile, parsedFileIndex) {
        parsedFile.forEach(function(block) {
            if ( ! block.local[target])
                return;

            var newPermissions = [];
            block.local[target].forEach(function(definition) {
                var name = definition.name;
                var version = block.version || '0.0.0';
                var matchedData = {};

                if ( ! preProcess[source] || ! preProcess[source][name]) {
// TODO: Enable in the next version
// At the moment the (groupname) is optional and must not be defined.
/*
                    var extra = [
                       { 'Groupname': name }
                    ];
                    throw new WorkerError('Referenced groupname does not exist / it is not defined with @apiDefine.',
                                            filenames[parsedFileIndex],
                                            block.index,
                                            messages.common.element,
                                            messages.common.usage,
                                            messages.common.example,
                                            extra);
*/
// TODO: Remove in the next version
matchedData.name = name;
matchedData.title = definition.title;
matchedData.description = definition.description;

                    }

// TODO: Remove in the next version
else {

                if (preProcess[source][name][version]) {
                    // found the version
                    matchedData = preProcess[source][name][version];
                } else {
                    // find nearest matching version
                    var foundIndex = -1;
                    var lastVersion = '0.0.0';

                    var versionKeys = Object.keys(preProcess[source][name]);
                    versionKeys.forEach(function(currentVersion, versionIndex) {
                        if (semver.gte(version, currentVersion) && semver.gte(currentVersion, lastVersion)) {
                            lastVersion = currentVersion;
                            foundIndex = versionIndex;
                        }
                    });

                    if (foundIndex === -1) {
                        var extra = [
                            { 'Groupname': name },
                            { 'Version': version },
                            { 'Defined versions': versionKeys },
                        ];
                        throw new WorkerError('Referenced definition has no matching or a higher version. ' +
                                              'Check version number in referenced define block.',
                                              filenames[parsedFileIndex],
                                              block.index,
                                              messages.common.element,
                                              messages.common.usage,
                                              messages.common.example,
                                              extra);
                    }

                    var versionName = versionKeys[foundIndex];
                    matchedData = preProcess[source][name][versionName];
                }

// TODO: Remove in the next version
}

                newPermissions.push(matchedData);
            });

            // replace permissions with new permissions
            // TODO: reduce complexity and remove group
            block.local[target] = newPermissions;
        });
    });
}

/**
 * Exports
 */
module.exports = {
    preProcess : preProcess,
    postProcess: postProcess
};
