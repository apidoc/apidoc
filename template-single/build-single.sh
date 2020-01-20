#!/usr/bin/env bash
# build single html file tpl
set -e

# fix script cwd
DIRNAME=$(dirname "$0")
SCRIPTPATH=$(cd "$DIRNAME"; pwd)
cd "$SCRIPTPATH"

# define path
TEMPDIR="tmp"
RJS="node ../node_modules/requirejs/bin/r.js"
RJS_CONFIG="$TEMPDIR/config.js"
RAW_INDEX_TPL="../template/index.html"
INDEX_TPL="$TEMPDIR/index.html"
API_DATA="$TEMPDIR/api_data.js"
API_PROJECT="$TEMPDIR/api_project.js"
API_STYLE="$TEMPDIR/style.css"
API_STYLE_PKG="$TEMPDIR/style_pkg.css"
MAIN_PKG="$TEMPDIR/main.js"
INDEX_PKG="index.html"

mkdir -p $TEMPDIR

# generate html template
cp -f $RAW_INDEX_TPL $INDEX_TPL
sed -i 's|<link[^>]*>||g' $INDEX_TPL # remove link tag
sed -i 's|<script *[src*|data-main*][^>]*>*<\/script>||g' $INDEX_TPL # remove ref js file script tag
(
cat <<EOF
<script>
var APIDATA = {api: __API_DATA__}
var APIPROJECT = __API_PROJECT__
</script>

EOF
) >> $INDEX_TPL

# generate api_data.js
(
cat <<EOF
define(APIDATA)
EOF
) > $API_DATA

# generate api_project.js
(
cat <<EOF
define(APIPROJECT)
EOF
) > $API_PROJECT

(
cat <<EOF
@import url("../../template/vendor/bootstrap.min.css");
@import url("../../template/vendor/prettify.css");
@import url("../../template/css/style.css");
EOF
) > $API_STYLE

# generate r.js config
(
cat <<EOF
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
    apiData: '../template-single/tmp/api_data',
    apiProject: '../template-single/tmp/api_project',
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
EOF
) > $RJS_CONFIG

# build js & css
$RJS -o $RJS_CONFIG
$RJS -o cssIn=$API_STYLE out=$API_STYLE_PKG optimizeCss=standard

# setting template
cp -f $INDEX_TPL $INDEX_PKG
echo "<style>$(cat $API_STYLE_PKG)</style>" >> $INDEX_PKG
echo "<script>$(cat $MAIN_PKG)</script>" >> $INDEX_PKG

# clean files
rm -rf $TEMPDIR
