

Assertion testing with [Qunit](https://qunitjs.com/)

---

Bundling for production :

Project has the following setup:

* www/ - the web assets for the project
    * index.html - the entry point into the app.
    * assets.js - the top-level config script used by index.html
    * assets/ - the directory to store project-specific scripts.
    * vendor/ - the directory to hold modular scripts for the framework.
* tools/ - the build tools to optimize the project.

To optimize, run:

    node bin/r.js -o bin/build.js

That build command creates an optimized version of the project in a
**www-built** directory. The assets.js file will be optimized to include
all of its modules.

For more information on the optimizer:
http://requirejs.org/docs/optimization.html

For more information on using requirejs:
http://requirejs.org/docs/api.html


