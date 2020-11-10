@echo off

set /p id="enter path to build to : " %=%

node tools/r.js -o tools/build.js

move www-built "%id%"

cd "%id%"

tree&pause
