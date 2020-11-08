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

    $.closest = function(selector, element){
        return selector.closest(element)
    };

    $.create = function (target, element,options){
        options = (options || {});
        const parent = document.createElement(element);
        if(options.text){
            const child = document.createTextNode(options.text);
            parent.appendChild(child);
        }
        if(options.class){
            parent.className = options.class;
        }
        return target.appendChild(myElement);
    };

    $.append = function (target, element) {
        return target.appendChild(element);
    };

    // TODO : AJAX 

    $.prototype.wrapped = function () {
        return this._wrapped;
    };

    if (typeof define === 'function' && define.amd) {
        define('dom', [], function () {
            return $;
        });
    }

}.call(this));