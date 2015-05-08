define([
    './locales/de.js',
    './locales/fr.js',
    './locales/nl.js',
    './locales/pl.js',
    './locales/pt_br.js',
    './locales/ru.js',
    './locales/zh.js'
], function() {
    var langId = (navigator.language || navigator.userLanguage).toLowerCase();
    var language = langId.substr(0, 2);
    var locales = {};

    for (index in arguments) {
        for (property in arguments[index])
            locales[property] = arguments[index][property];
    }
    if ( ! locales['en'])
        locales['en'] = {};

    if ( ! locales[langId] && ! locales[language])
        language = 'en';

    var locale = (locales[langId] ? locales[langId] : locales[language]);

    var __ = function(text) {
        var index = locale[text];
        if (index === undefined)
            return text;
        return index;
    };

    return {
        __     : __,
        locales: locales,
        locale : locale
    };
});
