({
  baseUrl: '../../template',
  name: 'main',
  out: '../../template-single/tmp/main.js',
  optimize: 'none',

  paths: {
    requirejs: './vendor/require.min',
    polyfill: './vendor/polyfill',
    bootstrap: './vendor/bootstrap.min',
    diffMatchPatch: './vendor/diff_match_patch.min',
    handlebars: './vendor/handlebars.min',
    handlebarsExtended: './utils/handlebars_helper',
    jquery: './vendor/jquery.min',
    locales: './locales/locale',
    lodash: './vendor/lodash.custom.min',
    pathToRegexp: './vendor/path-to-regexp/index',
    prettify: './vendor/prettify/prettify',
    semver: './vendor/semver.min',
    utilsSampleRequest: './utils/send_sample_request',
    webfontloader: './vendor/webfontloader',
    list: './vendor/list.min',
    apiData: '../template-single/scripts/api_data',
    apiProject: '../template-single/scripts/api_project',
  },
  shim: {
    jquery: {
      deps: ['polyfill', 'requirejs']
    },
    bootstrap: {
      deps: ['jquery']
    },
    diffMatchPatch: {
      exports: 'diff_match_patch'
    },
    handlebars: {
      exports: 'Handlebars'
    },
    handlebarsExtended: {
      deps: ['jquery', 'handlebars'],
      exports: 'Handlebars'
    },
    prettify: {
      exports: 'prettyPrint'
    }
  },
})