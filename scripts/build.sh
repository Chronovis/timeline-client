#! /bin/bash

rm -rf build
mkdir -p build/server build/client/js build/client/css
browserify src/client/index.ts -p tsify -o build/client/js/index.js
cp -r static/* build/client/
