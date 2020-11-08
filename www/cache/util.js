(function () {
	var root = this;
	var _ = function (obj) {
		if (obj instanceof _) {
			return obj;
		}
		if (!(this instanceof _)) {
			return new _(obj);
		}
		this._wrapped = obj;
	};
	if (typeof exports !== "undefined") {
		if (typeof module !== "undefined" && module.exports) {
			exports = module.exports = _;
		}
		exports._ = _;
	} else {
		root._ = _;
	}
	_.VERSION = "1.0.0";
	var optimizCallback = function (func, context, argCount) {
		if (context === void 0) return func;
		switch (argCount == null ? 3 : argCount) {
			case 1:
				return function (value) {
					return func.call(context, value);
				};
			case 2:
				return function (value, other) {
					return func.call(context, value, other);
				};
			case 3:
				return function (value, index, collection) {
					return func.call(context, value, index, collection);
				};
			case 4:
				return function (accumulator, value, index, collection) {
					return func.call(context, accumulator, value, index, collection);
				};
		}
		return function () {
			return func.apply(context, arguments);
		};
	};
	var property = function (key) {
		return function (obj) {
			return obj == null ? void 0 : obj[key];
		};
	};
	var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
	var getLength = property('length');
	var isArrayLike = function (collection) {
		var length = getLength(collection);
		return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
	};
	_.each = _.forEach = function (obj, iteratee, context) {
		iteratee = optimizCallback(iteratee, context);
		var i, length;
		if (isArrayLike(obj)) {
			for (i = 0, length = obj.length; i < length; i++) {
				iteratee(obj[i], i, obj);
			}
		} else {
			var keys = Object.keys(obj);
			for (i = 0, length = keys.length; i < length; i++) {
				iteratee(obj[keys[i]], keys[i], obj);
			}
		}
		return obj;
	};

	/*	todo :
	 * 	low level operation of this function should use 
	 *  - optimizCallback 
	 *  - callbackGenerator 	

  _.map = _.collect = function(obj, iteratee, context) {

	// callback generator
    iteratee = cb(iteratee, context);
	
	// max length safety for iteratee
	var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length,
		results = Array(length);
	
	var index;	
    for (index = 0; index < length; index++) {

      var currentKey = keys ? keys[index] : index;
      results[index] = iteratee(obj[currentKey], currentKey, obj);
	
	}
	
    return results;
  };

	_.map([$.qsa('.btn', $.id('main'))], function(btns, index){
		_.each(btns, function(btn, index, btns){
			if(btn.dataset.action === ''){

			}
			else if(btn.dataset.action === ''){
				
			}
		});
	})

	 */
	_.map = function (object, iterator, context) {
		var results = [];
		if (object == null) return results;
		if ([].map && object.map === [].map) return object.map(iterator, context);
		_.each(object, function (value, index, list) {
			return results[results.length] = iterator.call(context, value, index, list);
		});
		return results;
	}

	_.has = function (obj, key) {
		return obj != null && {}.hasOwnProperty.call(obj, key);
	};
	_.identity = function (object) {
		return object;
	}
	_.defaults = function (object) {
		if (!object) {
			return object;
		}
		for (var argsIndex = 1, argsLength = arguments.length; argsIndex < argsLength; argsIndex += 1) {
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
	_.isFunction = function (obj) {
		return !!(obj && obj.constructor && obj.call && obj.apply);
	};
	_.isDate = function (obj) {
		return !!(obj && obj.getTimezoneOffset && obj.setUTCFullYear);
	};
	_.isRegExp = function (obj) {
		return !!(obj && obj.test && obj.exec && (obj.ignoreCase || obj.ignoreCase === false));
	};
	_.isArray = function (obj) {
		return toString.call(obj) === "[object Array]";
	};
	_.isObject = function (obj) {
		return obj === Object(obj);
	};
	_.isBoolean = function (obj) {
		return obj === true || obj === false;
	};
	_.isNumber = function (obj) {
		return !!(obj === 0 || (obj && obj.toExponential && obj.toFixed));
	};
	_.isString = function (obj) {
		return !!(obj === "" || (obj && obj.charCodeAt && obj.substr));
	};
	_.isUndefined = function (obj) {
		return obj === void 0;
	};
	_.isNull = function (obj) {
		return obj === null;
	};
	_.now = function () {
		var now = new Date();
		var time = /(\d+:\d+:\d+)/.exec(now)[0] + ':';
		for (var ms = String(now.getMilliseconds()), i = ms.length - 3; i < 0; ++i) {
			time += '0';
		}
		return time + ms;
	}

	function S4() {
		return ((1 + Math.random()) * 65536 | 0).toString(16).substring(1);
	}
	_.guid = function () {
		return S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4();
	}
	_.some = function (obj, iterator, context) {
		iterator = iterator || _.identity;
		var result = false;
		if (obj == null) return result;
		if ([].some && obj.some === [].some) return obj.some(iterator, context);
		_.each(obj, function (value, index, list) {
			if ((result |= iterator.call(context, value, index, list))) return {};
		});
		return !!result;
	};
	_.result = function (obj, path, fallback) {
		if (!_.isArray(path)) path = [path];
		var length = path.length;
		if (!length) {
			return _.isFunction(fallback) ? fallback.call(obj) : fallback;
		}
		for (var i = 0; i < length; i++) {
			var prop = obj == null ? void 0 : obj[path[i]];
			if (prop === void 0) {
				prop = fallback;
				i = length;
			}
			obj = _.isFunction(prop) ? prop.call(obj) : prop;
		}
		return obj;
	}
	var idCounter = 0;
	_.uniqueId = function (prefix) {
		var id = ++idCounter + '';
		return prefix ? prefix + id : id;
	};
	_.memoize = function (callback, address) {
		var memo = {};
		address || (address = identity);
		return function () {
			var key = address.apply(this, arguments);
			return _.has(memo, key) ? memo[key] : (memo[key] = callback.apply(this, arguments));
		};
	};
	_.extend = function (obj) {
		[].slice.call(arguments, 1).forEach(function (source) {
			for (var prop in source) {
				if (source[prop] !== void 0) obj[prop] = source[prop];
			}
		});
		return obj;
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
		var matcher = new RegExp([(settings.escape || noMatch).source, (settings.interpolate || noMatch).source, (settings.evaluate || noMatch).source].join("|") + "|$", "g");
		var index = 0;
		var source = "__p+='";
		text.replace(matcher, function (match, escape, interpolate, evaluate, offset) {
			source += text.slice(index, offset).replace(escaper, function (match) {
				return "\\" + escapes[match];
			});
			if (escape) {
				source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
			}
			if (interpolate) {
				source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
			}
			if (evaluate) {
				source += "';\n" + evaluate + "\n__p+='";
			}
			index = offset + match.length;
			return match;
		});
		source += "';\n";
		if (!settings.variable) {
			source = "with(obj||{}){\n" + source + "}\n";
		}
		source = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments" + ",'');};\n" + source + "return __p;\n";
		try {
			render = new Function(settings.variable || "obj", "_", source);
		} catch (e) {
			e.source = source;
			throw e;
		}
		if (data) {
			return render(data, _);
		}
		var template = function (data) {
			return render.call(this, data, _);
		};
		template.source = "function(" + (settings.variable || "obj") + "){\n" + source + "}";
		return template;
	};
	if (typeof define === "function" && define.amd) {
		define("util", [], function () {
			return _;
		});
	}
}.call(this));