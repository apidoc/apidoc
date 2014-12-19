define([
    './locales/de.js',
    './locales/nl.js',
    './locales/zh.js'
], function() {
    var locales = {};
    for(index in arguments) {
        for(property in arguments[index]) {
            locales[property] = arguments[index][property];
        }
    }

    var language = ((navigator.language) ? navigator.language : navigator.userLanguage).substr(0, 2).toLowerCase();
    if( ! locales['en'])
        locales['en'] = {};
    if( ! locales[language])
        language = 'en';

    var locale = locales[language];

    var __ = function(text) {
        var index = locale[text];
        if(index === undefined) return text;
        return index;
    };

    return {
        __     : __,
        locales: locales,
        locale : locale
    };
});
