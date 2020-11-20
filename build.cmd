@echo off

set /p id="name a new path to build to : " %=%

mkdir %id%

node bin/r.js -o bin/build.js

move www-built "%id%"

cd "%id%"

tree&pause
