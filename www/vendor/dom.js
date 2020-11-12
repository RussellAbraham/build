/* DOM Library */
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
    $.VERSION = '0.0.1';
    DocumentFragment.prototype.append = function (element) {
        return this.appendChild(element);
    }
    DocumentFragment.prototype.render = function (target) {
        return target.appendChild(this);
    }
    const fragment = new DocumentFragment();

    function extend(obj) {
        [].slice.call(arguments, 1).forEach(function (source) {
            for (var prop in source) {
                if (source[prop] !== void 0) obj[prop] = source[prop];
            }
        });
        return obj;
    };
    extend($, fragment);
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

    $.closest = function (selector, element) {
        return $.qs(selector).closest(element); //.qs();
    };

    $.create = function (target, element, options) {
        options = (options || {});
        const parent = document.createElement(element);
        if (options.class) {
            parent.className = options.class;
        }
        if (options.text) {
            parent.appendChild(document.createTextNode(options.text));
        } else if (options.html) {
            parent.innerHTML = options.html;
        }
        fragment.append(parent);
        return fragment.render(target);
    };

    $.append = function (target, element) {
        fragment.append(element);
        return fragment.render(target);
    };

    $.prototype.wrapped = function () {
        return this._wrapped;
    };
    if (typeof define === 'function' && define.amd) {
        define('dom', [], function () {
            return $;
        });
    }
}.call(this));