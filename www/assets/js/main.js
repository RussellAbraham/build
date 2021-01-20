define(['assets/js/config'], function(Ctor) {
    
    function Main(name){
        Ctor.call(this);
        this.name = name;
    };

    Main.prototype = Object.create(Ctor.prototype, {
        constructor : {            
            configurable : true,
            enumerable : true,
            value : Main,
            writeable : true
        }
    });

    Main.prototype.toString = function(){
        return '[object '.concat(this.name,']');
    };

    Main.prototype.valueOf = function(){
        return this;
    };

    Main.prototype.initialize = function(){
        console.log('Loaded!');
    };
    function looseJsonParse(obj) {
        return Function('"use strict";return (' + obj + ')')();
    }
    
    function runCodeWithDateFunction(obj) {
        return Function('"use strict";return (' + obj + ')')()(
            Date
        );
    }
    
    var SimplePropertyRetriever = {
        getOwnEnumerables: function (obj) {
            return this._getPropertyNames(obj, true, false, this._enumerable);
            // Or could use for..in filtered with hasOwnProperty or just this: return Object.keys(obj);
        },
        getOwnNonenumerables: function (obj) {
            return this._getPropertyNames(obj, true, false, this._notEnumerable);
        },
        getOwnEnumerablesAndNonenumerables: function (obj) {
            return this._getPropertyNames(obj, true, false, this._enumerableAndNotEnumerable);
            // Or just use: return Object.getOwnPropertyNames(obj);
        },
        getPrototypeEnumerables: function (obj) {
            return this._getPropertyNames(obj, false, true, this._enumerable);
        },
        getPrototypeNonenumerables: function (obj) {
            return this._getPropertyNames(obj, false, true, this._notEnumerable);
        },
        getPrototypeEnumerablesAndNonenumerables: function (obj) {
            return this._getPropertyNames(obj, false, true, this._enumerableAndNotEnumerable);
        },
        getOwnAndPrototypeEnumerables: function (obj) {
            return this._getPropertyNames(obj, true, true, this._enumerable);
            // Or could use unfiltered for..in
        },
        getOwnAndPrototypeNonenumerables: function (obj) {
            return this._getPropertyNames(obj, true, true, this._notEnumerable);
        },
        getOwnAndPrototypeEnumerablesAndNonenumerables: function (obj) {
            return this._getPropertyNames(obj, true, true, this._enumerableAndNotEnumerable);
        },
        // Private static property checker callbacks
        _enumerable: function (obj, prop) {
            return obj.propertyIsEnumerable(prop);
        },
        _notEnumerable: function (obj, prop) {
            return !obj.propertyIsEnumerable(prop);
        },
        _enumerableAndNotEnumerable: function (obj, prop) {
            return true;
        },
        // Inspired by http://stackoverflow.com/a/8024294/271577
        _getPropertyNames: function getAllPropertyNames(obj, iterateSelfBool, iteratePrototypeBool, includePropCb) {
            var props = [];
    
            do {
                if (iterateSelfBool) {
                    Object.getOwnPropertyNames(obj).forEach(function (prop) {
                        if (props.indexOf(prop) === -1 && includePropCb(obj, prop)) {
                            props.push(prop);
                        }
                    });
                }
                if (!iteratePrototypeBool) {
                    break;
                }
                iterateSelfBool = true;
            } while (obj = Object.getPrototypeOf(obj));
    
            return props;
        }
    };
    
    
    (function () {
    
        function makeSetterString(sKey, sValue, vEnd, sPath, sDomain, bSecure, vSameSite) {
    
            var sExpires = "";
    
            if (vEnd) {
    
                switch (vEnd.constructor) {
    
                    case Number:
    
                        sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
    
                        /*
                        Note: Despite officially defined in RFC 6265, the use of `max-age` is not compatible with any
                        version of Internet Explorer, Edge and some mobile browsers. Therefore passing a number to
                        the end parameter might not work as expected. A possible solution might be to convert the the
                        relative time to an absolute time. For instance you could replace the previous line with:
                        */
                        /*
                        sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; expires=" + (new Date(vEnd * 1e3 + Date.now())).toUTCString();
                        */
    
                        break;
    
                    case String:
    
                        sExpires = "; expires=" + vEnd;
                        break;
    
                    case Date:
    
                        sExpires = "; expires=" + vEnd.toUTCString();
                        break;
    
                }
    
            }
    
            return encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "") + (!vSameSite || vSameSite.toString().toLowerCase() === "no_restriction" ? "" : vSameSite.toString().toLowerCase() === "lax" || Math.ceil(vSameSite) === 1 || vSameSite === true ? "; samesite=lax" : vSameSite.toString().toLowerCase() === "none" || vSameSite < 0 ? "; samesite=none" : "; samesite=strict");
    
        }
    
        var reURIAllowed = /[\-\.\+\*]/g,
            reCNameAllowed = /^(?:expires|max\-age|path|domain|secure|samesite|httponly)$/i;
    
        window.docCookies = {
    
            "getItem": function (sKey) {
    
                if (!sKey) {
                    return null;
                }
    
                return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(reURIAllowed, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
    
            },
    
            "setItem": function (sKey, sValue, vEnd, sPath, sDomain, bSecure, vSameSite) {
    
                if (!sKey || reCNameAllowed.test(sKey)) {
                    return false;
                }
    
                document.cookie = makeSetterString(sKey, sValue, vEnd, sPath, sDomain, bSecure, vSameSite);
                return true;
    
            },
    
            "removeItem": function (sKey, sPath, sDomain, bSecure, vSameSite) {
    
                if (!this.hasItem(sKey)) {
                    return false;
                }
    
                document.cookie = makeSetterString(sKey, "", "Thu, 01 Jan 1970 00:00:00 GMT", sPath, sDomain, bSecure, vSameSite);
                return true;
    
            },
    
            "hasItem": function (sKey) {
    
                if (!sKey || reCNameAllowed.test(sKey)) {
                    return false;
                }
    
                return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(reURIAllowed, "\\$&") + "\\s*\\=")).test(document.cookie);
    
            },
    
            "keys": function () {
    
                var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
    
                for (var nLen = aKeys.length, nIdx = 0; nIdx < nLen; nIdx++) {
    
                    aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]);
    
                }
    
                return aKeys;
            },
    
            "clear": function (sPath, sDomain, bSecure, vSameSite) {
    
                for (var aKeys = this.keys(), nLen = aKeys.length, nIdx = 0; nIdx < nLen; nIdx++) {
    
                    this.removeItem(aKeys[nIdx], sPath, sDomain, bSecure, vSameSite);
    
                }
    
            }
    
        };
    
    })();
    
    if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
    
        module.exports = docCookies;
    
    }
    
    /*
      var docCookies = ... get the "docCookies" object here:
      https://developer.mozilla.org/en-US/docs/DOM/document.cookie#A_little_framework.3A_a_complete_cookies_reader.2Fwriter_with_full_unicode_support
    */
    
    var docCookies = new Proxy(docCookies, {
        get: function (oTarget, sKey) {
            return oTarget[sKey] || oTarget.getItem(sKey) || undefined;
        },
        set: function (oTarget, sKey, vValue) {
            if (sKey in oTarget) {
                return false;
            }
            return oTarget.setItem(sKey, vValue);
        },
        deleteProperty: function (oTarget, sKey) {
            if (!sKey in oTarget) {
                return false;
            }
            return oTarget.removeItem(sKey);
        },
        enumerate: function (oTarget, sKey) {
            return oTarget.keys();
        },
        ownKeys: function (oTarget, sKey) {
            return oTarget.keys();
        },
        has: function (oTarget, sKey) {
            return sKey in oTarget || oTarget.hasItem(sKey);
        },
        defineProperty: function (oTarget, sKey, oDesc) {
            if (oDesc && 'value' in oDesc) {
                oTarget.setItem(sKey, oDesc.value);
            }
            return oTarget;
        },
        getOwnPropertyDescriptor: function (oTarget, sKey) {
            var vValue = oTarget.getItem(sKey);
            return vValue ? {
                value: vValue,
                writable: true,
                enumerable: true,
                configurable: false
            } : undefined;
        },
    });
    
    /* Cookies test */
    
    console.log(docCookies.my_cookie1 = 'First value');
    console.log(docCookies.getItem('my_cookie1'));
    
    docCookies.setItem('my_cookie1', 'Changed value');
    console.log(docCookies.my_cookie1);
    // Function to Get HTTP GET Requests
    function getQueryParams(qs) {
        qs = qs.split("+").join(" ");
        var params = {},
            tokens,
            re = /[?&]?([^=]+)=([^&]*)/g;
    
        while (tokens = re.exec(qs)) {
            params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
        }
    
        return params;
    }
        
    return Main;

});