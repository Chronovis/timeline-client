#! /bin/bash

rm -rf build
mkdir -p build/server build/client/js build/client/css
cp -r static/* build/client/
