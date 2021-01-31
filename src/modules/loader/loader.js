(function () {

    var Arr = Array.prototype;
    var Obj = Object.prototype;

    var slice = Arr.slice;
    var hasOwn = Obj.hasOwnProperty;

    var has = function (object, key) {
        return object != null && hasOwn.call(object, key);
    };

    var identity = function (object) {
        return object;
    };

    function memoize(callback, address) {
        var cache = {},
            key;
        address || (address = identity);
        return function () {
            key = address.apply(this, arguments);
            return has(cache, key) ? cache[key] : (cache[key] = callback.apply(this, arguments));
        };
    };

    function compose() {
        var modules = slice.call(arguments);
        return function () {
            var imports = slice.call(arguments),
                i, length = modules.length;
            for (i = length - 1; i >= 0; i--) {
                imports = [modules[i].apply(this, imports)];
            }
            return imports[0];
        }
    };

    function loadXHR() {

        function request(url, onload, onerror) {
            var request = new XMLHttpRequest();
            request.responseType = 'arraybuffer';
            request.open('GET', url.concat('.json'), true);
            request.onload = onload;
            request.onerror = onerror || onload;
            request.send(null);
        }

        function xhrLoad() {
            // response has been allocated, 
            // transfer or process it as is
        };

        function xhrError() {};

        slice.call(arguments).forEach(function (string) {
            request(string, xhrLoad, xhrError);
        });

    }

    function loadScripts() {

        function scriptNode(src, onload, onerror) {
            var script = document.createElement('script');
            script.src = src + '.js';
            script.onload = onload;
            script.onerror = onerror || onload;
            return document.head.appendChild(script);
        }

        function scriptLoad() {};

        function scriptError() {};

        slice.call(arguments).forEach(function (string) {
            scriptNode(string, scriptLoad, scriptError);
        });

    }

})();