This project is a rebuild of Backbone. 

The objective:

- Remove each modules depency on any other module
- `AMD` compatible
- `r.js` build tool compatible
- Provide `CRUD` like grammar with a custom client side storage adapter

Assertion testing with [Qunit](https://qunitjs.com/)

---

Bundling for production :

Project has the following setup:

* www/ - the web assets for the project
    * index.html - the entry point into the app.
    * assets.js - the top-level config script used by index.html
    * assets/ - the directory to store project-specific scripts.
    * scripts/ - the directory to hold dependecy scripts for the framework.
* tools/ - the build tools to optimize the project.

To optimize, run:

    node tools/r.js -o tools/build.js

That build command creates an optimized version of the project in a
**www-built** directory. The assets.js file will be optimized to include
all of its dependencies.

For more information on the optimizer:
http://requirejs.org/docs/optimization.html

For more information on using requirejs:
http://requirejs.org/docs/api.html


