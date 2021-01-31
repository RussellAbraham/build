var  browser = {};

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

function Memoize(callback, address) {
    var cache = {}, key;
    address || (address = identity);
    return function () {
        key = address.apply(this, arguments);
        return has(cache, key) ? cache[key] : (cache[key] = callback.apply(this, arguments));
    };
};

function Compose() {
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

function loadJSON(){    
    function request(url, onload, onerror){
        var request = new XMLHttpRequest();
        request.open('GET', url.concat('.json'), true);
        request.onload = onload;
        request.onerror = onerror || onload;   
        request.send(null); 
    }
    function jsonLoad(){}
    function jsonError(){}
    [].slice.call(arguments).forEach(function(string){
        request(string, jsonLoad, jsonError);
    });    
}

function loadScripts(){
    function scriptNode(src, onload, onerror){
        var script = document.createElement('script');
        script.src = src + '.js';
        script.onload = onload;
        script.onerror = onerror || onload;
        return document.head.appendChild(script);
    }
    function scriptLoad(){}
    function scriptError(){}
    [].slice.call(arguments).forEach(function(string){
        scriptNode(string, scriptLoad, scriptError);
    });
}

// load linked libraries

function init(){
    [
        'window', 
        'timing', 
        //'storage', 
        //'screen', 
        //'primitives', 
        'navigator', 
        'location', 
        'history', 
        'dialog', 
        'cookies' 
    ].forEach(function(object){
        loadScripts(object + '/index');
    });
}

init = Memoize(init);

var test2 = Memoize(function(){
    loadScripts('window/index');
})

setTimeout(init, 1);

