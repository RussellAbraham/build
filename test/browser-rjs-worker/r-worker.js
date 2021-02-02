importScripts('https://assets.codepen.io/1674766/r.js');

self.onmessage = function (evt) {
    var out, buildText;

    if (evt.data === 'run') {
        requirejs.optimize({
            baseUrl: '.',
            paths: {
              	'lib': 'lib'
            },
            include: ['main'],
            out: function (text) {
                out = text;
            }
        }, function (buildText) {
            self.postMessage(JSON.stringify({
                out: out,
                buildText: buildText
            }, null, '  '));
        });
    }
};
