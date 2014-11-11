var colors = require('colors');

/**
 * Console logger.
 */
function Logger() {
    this.isSilent = false;
    this.isVerbose = true;
}

/**
 * Turn on/off log
 * @param {Boolean} isSilent
 */
Logger.prototype.setSilent = function(isSilent) {
    this.isSilent = (isSilent === true) ? true : false;
}

/**
 * Turn on/off verbose log
 * @param {Boolean} isVerbose
 */
Logger.prototype.setVerbose = function(isVerbose) {
    this.isVerbose = (isVerbose === true) ? true : false;
}

/**
 * Output debug message
 * @param {String} message
 */
Logger.prototype.debug = function(message, extra) {
    if ( ! this.isSilent && this.isVerbose) {
        console.log(colors.cyan('debug:   ') + message);
        if (extra)
            console.log(colors.white(this._getExtra(extra)));
    }
}

/**
 * Output error message
 * @param {String} message
 */
Logger.prototype.error = function(message, extra) {
    if ( ! this.isSilent) {
        console.error(colors.red('error:   ') + message);
        if (extra)
            console.error(colors.white(this._getExtra(extra)));
    }
}

/**
 * Output non important info message
 * @param {String} message
 */
Logger.prototype.info = function(message, extra) {
    if (this.isVerbose && ! this.isSilent) {
        console.info('info:    ' + message);
        if (extra)
            console.info(colors.white(this._getExtra(extra)));
    }
}

/**
 * Output success message
 * @param {String} message
 */
Logger.prototype.success = function(message, extra) {
    if ( ! this.isSilent) {
        console.log(colors.green('success: ') + message);
        if (extra)
            console.log(colors.white(this._getExtra(extra)));
    }
}

/**
 * Output warning message
 * @param {String} message
 */
Logger.prototype.warning = function(message, extra) {
    if ( ! this.isSilent) {
        console.warn(colors.yellow('warning: ') + message);
        if (extra)
            console.warn(colors.white(this._getExtra(extra)));
    }
}
/**
 * Output warning message
 * @param {Object[]} extra
 */
Logger.prototype._getExtra = function(extra) {
    var result = '';

    // get longest name for indention
    var longestName = extra.map(function(entry) {
        return Object.keys(entry)[0]; // get name
    }).reduce(function(last, now) {
        return (last.length > now.length) ? last : now;
    });

    extra.forEach(function(entry) {
        var keys = Object.keys(entry);
        var key = keys[0];
        var value = '' + entry[key];
        var padRight = Array(longestName.length - key.length + 1).join(' ');

        if (value.indexOf('\n') === -1)
            result += indent(key + ': ' + padRight + value) + '\n';
        else
            result += indent(key + ':' + '\n' + indent(value, longestName.length + 2)) + '\n'; // + 2 for (": ")
    })
    return result;
}

/**
 * Indent string.
 * @param  {String} text
 * @param  {Integer} length
 * @param  {Char} char
 * @return {String}
 */
function indent(text, length, char) {
    length = length ? length : 9;
    char = char ? char : ' ';
    var pad = Array((length + 1)).join(char);
    return text.replace(/^(.*)$/gm, pad + '$1');
}

/**
 * Exports
 */
module.exports = new Logger();
