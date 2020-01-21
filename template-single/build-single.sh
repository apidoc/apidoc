#!/usr/bin/env bash
# build single html file tpl
set -e

# fix script cwd
DIRNAME=$(dirname "$0")
SCRIPTPATH=$(cd "$DIRNAME"; pwd)
cd "$SCRIPTPATH"

PROJECTPATH=$(dirname "$SCRIPTPATH")

# define path
TEMPDIR=$(mktemp -d -t apidoc-XXXXXXXXXX)
TEMPLATE="$PROJECTPATH/template"
RJS="node $PROJECTPATH/node_modules/requirejs/bin/r.js"
RJS_CONFIG="$TEMPDIR/config.js"
RAW_INDEX_TPL="$TEMPLATE/index.html"
INDEX_TPL="$TEMPDIR/index.html"
API_DATA="$TEMPDIR/api_data.js"
API_PROJECT="$TEMPDIR/api_project.js"
API_STYLE="$TEMPDIR/style.css"
API_STYLE_PKG="$TEMPDIR/style_pkg.css"
MAIN_PKG="$TEMPDIR/main.js"
INDEX_PKG="$SCRIPTPATH/index.html"

# generate html template
cp -f "$RAW_INDEX_TPL" "$INDEX_TPL"
sed -i 's|<link[^>]*>||g' "$INDEX_TPL" # remove link tag
sed -i 's|<script *[src*|data-main*][^>]*>*<\/script>||g' "$INDEX_TPL" # remove ref js file script tag
(
cat <<EOF
<script>
var APIDATA = {api: __API_DATA__}
var APIPROJECT = __API_PROJECT__
</script>

EOF
) >> "$INDEX_TPL"

# generate api_data.js
(
cat <<EOF
define(APIDATA)
EOF
) > "$API_DATA"

# generate api_project.js
(
cat <<EOF
define(APIPROJECT)
EOF
) > "$API_PROJECT"

(
cat <<EOF
@import url("$TEMPLATE/vendor/bootstrap.min.css");
@import url("$TEMPLATE/vendor/prettify.css");
@import url("$TEMPLATE/css/style.css");
EOF
) > "$API_STYLE"

# generate r.js config
(
cat <<EOF
({
  baseUrl: '$TEMPLATE',
  name: 'main',
  out: '$MAIN_PKG',
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
    apiData: '${API_DATA:0:-3}',
    apiProject: '${API_PROJECT:0:-3}',
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
) > "$RJS_CONFIG"

# build js & css
# cd $TEMPLATE
$RJS -o "$RJS_CONFIG"
$RJS -o cssIn="$API_STYLE" out="$API_STYLE_PKG" optimizeCss=standard

# setting template
cp -f "$INDEX_TPL" "$INDEX_PKG"

cat >> "$INDEX_PKG" <<EOF
<style>$(cat "$API_STYLE_PKG")</style>
<script>$(cat "$MAIN_PKG")</script>
EOF

# clean files
rm -rf "$TEMPDIR"
