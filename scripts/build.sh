#! /bin/bash

rm -rf build
mkdir -p build/server build/client/js build/client/css
cp -r static/* build/client/

# Bundle JS libs
./node_modules/.bin/browserify \
	--require classnames \
	--require react \
	--require react-dom \
	--require react-router > build/client/js/libs.js
