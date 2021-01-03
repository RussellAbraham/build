
# TLD

## bin/

1. `r.js` a a build configuration

command line tool for nodejs and the browser .. much more strenuous to setup.

---

## test/

2. Qunit

- must write tests in unit .. fuck

---

3. Path of web site files with `r.js` configured

- minification
- source maps
- bundle `html/css/js` into 1 `js` source

All the dependency files will be concatenated into 1 file easily. Just keep the convention.

- build.cmd

## www/

    assets/

        html/
            <img>

        css/
            lib/
                bootstrap/

        js/
            lib/
                backbone/

                    models/
                        .clone({})

                    collections/
                        .clone([clone({})])

                    views/
                        .header
                        .footer
                        .container
        json/
            <img>

- vendor is a mirror of node_modules as a convention, just without anything but the source files necessary.

    vendor/

        bootstrap/
            js/
            css/

        backbone/

---

# Splice

- what?

- where?
