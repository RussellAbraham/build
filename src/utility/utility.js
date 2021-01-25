console.clear();

(function (global) {
    var ObjProto = Object.prototype;
    var hasOwn = ObjProto.hasOwnProperty;

    function _(obj) {
        if (obj instanceof _) return obj;
        if (!(this instanceof _)) return new _(obj);
    }

    global._ = _;

  function createAssigner(keysFunc, undefinedOnly) {
        return function (obj) {
            var length = arguments.length,
                index,
                i;
            if (length < 2 || obj == null) return obj;
            for (index = 1; index < length; index++) {
                var source = arguments[index],
                    keys = keysFunc(source),
                    l = keys.length;
                for (i = 0; i < l; i++) {
                    var key = keys[i];
                    if (!undefinedOnly || obj[key] === void 0)
                        obj[key] = source[key];
                }
            }
            return obj;
        };
    }

    function has(obj, key) {
        return obj != null && hasOwn.call(obj, key);
    };
    
    _.has = has;
    
    
    function identity(object) {
        return object;
    };
    
    _.identity = identity;

    function memoize(callback, address) {
        var cache = {};
        var key, has = has || _.has;
        address || (address = identity || _.identity);
        return function () {
            key = address.apply(this, arguments);
            return has(cache, key)
                ? cache[key]
                : (cache[key] = callback.apply(this, arguments));
        };
    };
    
    _.memoize = memoize;
    
    function extend(obj) {
        [].slice.call(arguments, 1).forEach(function (source) {
            for (var prop in source) {
                if (source[prop] !== void 0) obj[prop] = source[prop];
            }
        });
        return obj;
    };

    _.extend = extend;
    

    
    /* *** isObjectLike()    *** */
    function isObjectLike(value) {
        return value != null && typeof value == "object";
    }

    /* *** isArray()    *** */
    function isArray(obj) {
        return toString.call(obj) === "[object Array]";
    }

    /*  *** isLocation() ***  */
    function isLocation(obj) {
        return toString.call(obj) === "[object Location]";
    }

    /*  *** isCallable() ***  */
    function isCallable(obj) {
        return typeof obj === "function";
    }

    /*  *** isConstructor() ***  */
    function isContstructor(obj) {
        return isCallable(obj);
    }

    /*  *** isElement() ***  */
    function isElement(obj) {
        return !!(obj && obj.nodeType === 1);
    }

    /* *** isWindow ** */
    function isWindow(obj) {
        return obj != null && obj === obj.window;
    }

    /* *** isEven()      *** */
    function isEven(num) {
        return num % 2 === 0;
    }

    /* *** isFinite() *** */
    function isFinite(obj) {
        return isFinite(obj) && !isNaN(parseFloat(obj));
    }

    /* *** isBuffer() *** */
    function isBuffer(val) {
        return (
            val !== null &&
            !isUndefined(val) &&
            val.constructor !== null &&
            !isUndefined(val.constructor) &&
            typeof val.constructor.isBuffer === "function" &&
            val.constructor.isBuffer(val)
        );
    }

    /* *** isArrayBuffer() *** */
    function isArrayBuffer(val) {
        return toString.call(val) === "[object ArrayBuffer]";
    }

    /* *** isFile() *** */
    function isFile(val) {
        return toString.call(val) === "[object File]";
    }

    /* *** isBlob() *** */
    function isBlob(val) {
        return toString.call(val) === "[object Blob]";
    }

    /* *** isStream() *** */
    function isStream(val) {
        return isObject(val) && isFunction(val.pipe);
    }

    /* *** isURLSearchParams() *** */
    function isURLSearchParams(val) {
        return (
            typeof URLSearchParams !== "undefined" &&
            val instanceof URLSearchParams
        );
    }

    /* *** isFormData() *** */
    function isFormData(val) {
        return typeof FormData !== "undefined" && val instanceof FormData;
    }

    /*  *** isPrime() ***  */
    function isPrime(value) {
        for (var i = 2; i < value; i++) {
            if (value % i === 0) {
                return false;
            }
        }
        return value > 1;
    }

    /* *** isUniform()   *** */
    function isUniform(arr) {
        var first = arr[0];
        for (var i = 1; i < arr.length; i++) {
            if (arr[i] !== first) {
                return false;
            }
        }
        return true;
    }

    /* *** isPlainObject() *** */
    function isPlainObject(obj) {
        var proto, Ctor;
        if (!obj || toString.call(obj) !== "[object Object]") {
            return false;
        }
        proto = getProto(obj);
        if (!proto) {
            return true;
        }
        Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
        return (
            typeof Ctor === "function" &&
            fnToString.call(Ctor) === ObjectFunctionString
        );
    }

    /* *** isEmptyObject *** */
    function isEmptyObject(obj) {
        var name;
        for (name in obj) {
            return false;
        }
        return true;
    }

    /*  *** isAlphaNumeric() ***  */
    function isAlphaNumeric(str) {
        var code = str.charCodeAt(0);
        if (
            !(code > 47 && code < 58) && // numeric (0-9)
            !(code > 64 && code < 91) && // uppercase (A-Z)
            !(code > 96 && code < 123)
        ) {
            // lowercase (a-z)
            return false;
        }
        return true;
    };
    
    _.isAlphaNumeric = isAlphaNumeric;

    /* *** isArrayBuffer *** */
    function isArrayBufferView(val) {
        var result;
        if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
            result = ArrayBuffer.isView(val);
        } else {
            result = val && val.buffer && val.buffer instanceof ArrayBuffer;
        }
        return result;
    }
    
    _.isArrayBufferView = isArrayBufferView;

    function isBase64(input) {
        if (/^data:[^;]+;base64,/.test(input)) return true;
        return false;
    };
    
    _.isBase64 = isBase64;
    
    function time() {
    	var now = new Date();
    	var time = /(\d+:\d+:\d+)/.exec(now)[0] + ":";
    	for (var ms = String(now.getMilliseconds()), i = ms.length - 3; i < 0; ++i) {
    		time += "0";
    	}
    	return time + ms;
    };
    
    _.time = time;

    _.defaults = function (object) {
        if (!object) {
            return object;
        }
        for (
            var argsIndex = 1, argsLength = arguments.length;
            argsIndex < argsLength;
            argsIndex++
        ) {
            var iterable = arguments[argsIndex];
            if (iterable) {
                for (var key in iterable) {
                    if (object[key] == null) {
                        object[key] = iterable[key];
                    }
                }
            }
        }
        return object;
    };

    _.templateSettings = {
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g,
        escape: /<%-([\s\S]+?)%>/g
    };

    var noMatch = /(.)^/;

    var escapes = {
        "'": "'",
        "\\": "\\",
        "\r": "r",
        "\n": "n",
        "\t": "t",
        "\u2028": "u2028",
        "\u2029": "u2029"
    };

    var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;

    _.template = function (text, data, settings) {
        var render;
        settings = _.defaults({}, settings, _.templateSettings);
        var matcher = new RegExp(
            [
                (settings.escape || noMatch).source,
                (settings.interpolate || noMatch).source,
                (settings.evaluate || noMatch).source
            ].join("|") + "|$",
            "g"
        );
        var index = 0;
        var source = "__p+='";
        text.replace(
            matcher,
            function (match, escape, interpolate, evaluate, offset) {
                source += text
                    .slice(index, offset)
                    .replace(escaper, function (match) {
                        return "\\" + escapes[match];
                    });

                if (escape) {
                    source +=
                        "'+\n((__t=(" +
                        escape +
                        "))==null?'':_.escape(__t))+\n'";
                }
                if (interpolate) {
                    source +=
                        "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
                }
                if (evaluate) {
                    source += "';\n" + evaluate + "\n__p+='";
                }
                index = offset + match.length;
                return match;
            }
        );
        source += "';\n";
        if (!settings.variable) source = "with(obj||{}){\n" + source + "}\n";
        source =
            "var __t,__p='',__j=Array.prototype.join," +
            "print=function(){__p+=__j.call(arguments,'');};\n" +
            source +
            "return __p;\n";
        try {
            render = new Function(settings.variable || "obj", "_", source);
        } catch (e) {
            e.source = source;
            throw e;
        }
        if (data) return render(data, _);
        var template = function (data) {
            return render.call(this, data, _);
        };
        template.source =
            "function(" + (settings.variable || "obj") + "){\n" + source + "}";

        return template;
    };


    
    _.prototype.valueOf = function () {
        return this;
    };
    
})(this);
