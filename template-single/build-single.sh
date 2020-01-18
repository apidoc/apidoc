#!/usr/bin/env bash
# build single html file tpl
set -e

SCRIPTPATH=$(cd $(dirname "$0"); pwd)
cd "$SCRIPTPATH"

mkdir -p tmp

node scripts/r.js -o scripts/build-config.js
node scripts/r.js -o cssIn=scripts/style.css out=tmp/style.css optimizeCss=standard

cp -f scripts/raw.html index.html

echo "<style>$(cat tmp/style.css)</style>" >> index.html
echo "<script>$(cat tmp/main.js)</script>" >> index.html

rm -rf tmp
