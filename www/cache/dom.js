(function () {
    var root = this;
    var $ = function (obj) {
        if (obj instanceof $) return obj;
        if (!(this instanceof $)) return new $(obj);
        this._wrapped = obj;
    };
    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = $;
        }
        exports.$ = $;
    } else {
        root.$ = $;
    }
    $.VERSION = '1.0.0';
    $.id = document.getElementById.bind(document);
    $.qs = function (selector, scope) {
        return (scope || document).querySelector(selector);
    };
    $.qsa = function (selector, scope) {
        return (scope || document).querySelectorAll(selector);
    };
    $.closest = function (target, selector) {
        return target.closest(selector);
    }
    $.listen = function (target, type, callback, useCapture) {
        target.addEventListener(type, callback, !!useCapture);
    };
    $.delegate = function (target, selector, type, handler) {
        function dispatchEvent(event) {
            var targetElement = event.target;
            var potentialElements = $.qsa(selector, target);
            var hasMatch = [].indexOf.call(potentialElements, targetElement) >= 0;
            if (hasMatch) {
                handler.call(targetElement, event);
            }
        }
        var useCapture = type === 'blur' || type === 'focus';
        $.listen(target, type, dispatchEvent, useCapture);
    };
    $.parent = function (element, tagName) {
        if (!element.parentNode) {
            return;
        }
        if (element.parentNode.tagName.toLowerCase() === tagName.toLowerCase()) {
            return element.parentNode;
        }
        return $.parent(element.parentNode, tagName);
    };
    $.create = function (target, element, attrs, text) {
        const myElement = document.createElement(element);
        const myTextNode = document.createTextNode(text);
        for (var attr in attrs) {
            myElement.setAttribute(attr, attrs[attr])
        }
        if (text) {
            myElement.appendChild(myTextNode);
        }
        return target.appendChild(myElement);
    }
    $.appendChild = function (target, element) {
        return target.appendChild(element);
    }
    $.prototype.wrapped = function () {
        return this._wrapped;
    };
    if (typeof define === 'function' && define.amd) {
        define('dom', [], function () {
            return $;
        });
    }
}.call(this));