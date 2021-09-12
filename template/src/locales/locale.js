define([
  './ca.js',
  './cs.js',
  './de.js',
  './es.js',
  './fr.js',
  './it.js',
  './nl.js',
  './pl.js',
  './pt_br.js',
  './ro.js',
  './ru.js',
  './tr.js',
  './vi.js',
  './zh.js',
  './zh_cn.js',
], function () {
  const langId = (navigator.language || navigator.userLanguage).toLowerCase().replace('-', '_');
  let language = langId.substr(0, 2);
  const locales = {};

  for (const index in arguments) {
    for (const property in arguments[index]) { locales[property] = arguments[index][property]; }
  }
  if (!locales.en) { locales.en = {}; }

  if (!locales[langId] && !locales[language]) { language = 'en'; }

  let locale = locales[langId] ? locales[langId] : locales[language];

  function __ (text) {
    const index = locale[text];
    if (index === undefined) { return text; }
    return index;
  }

  function setLanguage (language) {
    locale = locales[language];
  }

  return {
    __: __,
    langId,
    locales: locales,
    locale: locale,
    setLanguage: setLanguage,
  };
});
