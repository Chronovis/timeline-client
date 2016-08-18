#! /bin/bash

rm -rf dist
mkdir -p dist/js
mkdir dist/css
browserify src/index.ts -p tsify -o dist/js/index.js

cp -r static/* dist/
