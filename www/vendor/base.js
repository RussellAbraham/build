(function (factory) {
    var root = typeof self == 'object' && self.self === self && self ||
        typeof global == 'object' && global.global === global && global;
    if (typeof define === 'function' && define.amd) {
        define(['util', 'dom', 'exports'], function (_, $, exports) {
            root.Base = factory(root, exports, _, $);
        });
    } else if (typeof exports !== 'undefined') {
        var _ = require('util'),
            $;
        try {
            $ = require('dom');
        } catch (e) {}
        factory(root, exports, _, $);
    } else {
        root.Base = factory(root, {}, root._, root.$);
    }
})(function (root, Base, _, $) {

    var idCounter = 0,
        _listening;

    const eventSplitter = /\s+/;

    Base.emulateHTTP = false;
    Base.emulateJSON = false;

    function uniqueId(prefix) {
        var id = idCounter++;
        return prefix ? prefix + id : id;
    };

    function Ctor() {};

    function has(obj, key) {
        return obj != null && {}.hasOwnProperty.call(obj, key);
    };

    function isFunction(obj) {
        return !!(obj && obj.constructor && obj.call && obj.apply);
    }

    function isObject(obj) {
        var type = typeof obj;
        return type === 'function' || type === 'object' && !!obj;
    };

    function createAssigner(keysFunc, undefinedOnly) {
        return function (obj) {
            var length = arguments.length,
                index, i;
            if (length < 2 || obj == null) return obj;
            for (index = 1; index < length; index++) {
                var source = arguments[index],
                    keys = keysFunc(source),
                    l = keys.length;
                for (i = 0; i < l; i++) {
                    var key = keys[i];
                    if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
                }
            }
            return obj;
        };
    };

    const extendOwn = createAssigner(Object.keys);

    function extend(obj) {
        [].slice.call(arguments, 1).forEach(function (source) {
            for (var prop in source) {
                if (source[prop] !== void 0) obj[prop] = source[prop];
            }
        });
        return obj;
    };

    function baseCreate(prototype) {
        if (!isObject(prototype)) return {};
        if (Object.create) return Object.create(prototype);
        Ctor.prototype = prototype;
        var result = new Ctor;
        Ctor.prototype = null;
        return result;
    }

    function create(prototype, props) {
        var result = baseCreate(prototype);
        if (props) extendOwn(result, props);
        return result;
    }

    Base.VERSION = "0.0.3";

    Base.emulateHTTP = false;
    Base.emulateJSON = false;

    const Events = {};

    Base.Events = Events;

    function eventsApi(iteratee, events, name, callback, opts) {
        var i = 0,
            names;
        if (name && typeof name === 'object') {
            if (callback !== void 0 && 'context' in opts && opts.context === void 0) opts.context = callback;
            for (names = Object.keys(name); i < names.length; i++) {
                events = eventsApi(iteratee, events, names[i], name[names[i]], opts);
            }
        } else if (name && eventSplitter.test(name)) {
            for (names = name.split(eventSplitter); i < names.length; i++) {
                events = iteratee(events, names[i], callback, opts);
            }
        } else {
            events = iteratee(events, name, callback, opts);
        }
        return events;
    };

    Events.on = function (name, callback, context) {
        this._events = eventsApi(onApi, this._events || {}, name, callback, {
            context: context,
            ctx: this,
            listening: _listening
        });
        if (_listening) {
            var listeners = this._listeners || (this._listeners = {});
            listeners[_listening.id] = _listening;
            _listening.interop = false;
        }
        return this;
    };

    Events.listenTo = function (obj, name, callback) {

        if (!obj) return this;


        var id = obj._listenId || (obj._listenId = uniqueId('l'));

        var listeningTo = this._listeningTo || (this._listeningTo = {});

        var listening = _listening = listeningTo[id];

        if (!listening) {

            this._listenId || (this._listenId = uniqueId('l'));
            listening = _listening = listeningTo[id] = new Listening(this, obj);
        }

        var error = tryCatchOn(obj, name, callback, this);

        _listening = void 0;
        if (error) throw error;
        if (listening.interop) listening.on(name, callback);
        return this;
    }

    function onApi(events, name, callback, options) {
        if (callback) {
            var handlers = events[name] || (events[name] = []);
            var context = options.context,
                ctx = options.ctx,
                listening = options.listening;
            if (listening) listening.count++;
            handlers.push({
                callback: callback,
                context: context,
                ctx: context || ctx,
                listening: listening
            });
        }
        return events;
    };

    var tryCatchOn = function (obj, name, callback, context) {
        try {
            obj.on(name, callback, context);
        } catch (e) {
            return e;
        }
    };


    Events.off = function (name, callback, context) {
        if (!this._events) return this;
        this._events = eventsApi(offApi, this._events, name, callback, {
            context: context,
            listeners: this._listeners
        });

        return this;
    };

    function offApi(events, name, callback, options) {
        if (!events) return;
        var context = options.context,
            listeners = options.listeners;
        var i = 0,
            names;
        if (!name && !context && !callback) {
            for (names = Object.keys(listeners); i < names.length; i++) {
                listeners[names[i]].cleanup();
            }
            return;
        }
        names = name ? [name] : Object.keys(events);
        for (; i < names.length; i++) {
            name = names[i];
            var handlers = events[name];
            if (!handlers) break;
            var remaining = [];
            for (var j = 0; j < handlers.length; j++) {
                var handler = handlers[j];
                if (
                    callback && callback !== handler.callback &&
                    callback !== handler.callback._callback ||
                    context && context !== handler.context
                ) {
                    remaining.push(handler);
                } else {
                    var listening = handler.listening;
                    if (listening) listening.off(name, callback);
                }
            }
            if (remaining.length) {
                events[name] = remaining;
            } else {
                delete events[name];
            }
        }
        return events;
    };

    Events.once = function (name, callback, context) {
        var events = eventsApi(onceMap, {}, name, callback, this.off.bind(this));
        if (typeof name === 'string' && context == null) callback = void 0;
        return this.on(events, callback, context);
    };

    Events.listenToOnce = function (obj, name, callback) {
        var events = eventsApi(onceMap, {}, name, callback, this.stopListening.bind(this, obj));
        return this.listenTo(obj, events);
    };

    function onceMap(map, name, callback, offer) {
        if (callback) {
            var once = map[name] = once(function () {
                offer(name, once);
                callback.apply(this, arguments);
            });
            once._callback = callback;
        }
        return map;
    };

    Events.trigger = function (name) {
        if (!this._events) return this;
        var length = Math.max(0, arguments.length - 1);
        var args = Array(length);
        for (var i = 0; i < length; i++) args[i] = arguments[i + 1];
        eventsApi(triggerApi, this._events, name, void 0, args);
        return this;
    };

    function triggerApi(objEvents, name, callback, args) {
        if (objEvents) {
            var events = objEvents[name];
            var allEvents = objEvents.all;
            if (events && allEvents) allEvents = allEvents.slice();
            if (events) triggerEvents(events, args);
            if (allEvents) triggerEvents(allEvents, [name].concat(args));
        }
        return objEvents;
    };

    function triggerEvents(events, args) {
        var ev, i = -1,
            l = events.length,
            a1 = args[0],
            a2 = args[1],
            a3 = args[2];
        switch (args.length) {
            case 0:
                while (++i < l)(ev = events[i]).callback.call(ev.ctx);
                return;
            case 1:
                while (++i < l)(ev = events[i]).callback.call(ev.ctx, a1);
                return;
            case 2:
                while (++i < l)(ev = events[i]).callback.call(ev.ctx, a1, a2);
                return;
            case 3:
                while (++i < l)(ev = events[i]).callback.call(ev.ctx, a1, a2, a3);
                return;
            default:
                while (++i < l)(ev = events[i]).callback.apply(ev.ctx, args);
                return;
        }
    };

    function Listening(listener, obj) {
        this.id = listener._listenId;
        this.listener = listener;
        this.obj = obj;
        this.interop = true;
        this.count = 0;
        this._events = void 0;
    };

    Listening.prototype.on = Events.on;

    Listening.prototype.off = function (name, callback) {
        var cleanup;
        if (this.interop) {
            this._events = eventsApi(offApi, this._events, name, callback, {
                context: void 0,
                listeners: void 0
            });
            cleanup = !this._events;
        } else {
            this.count--;
            cleanup = this.count === 0;
        }
        if (cleanup) this.cleanup();
    };

    Listening.prototype.cleanup = function () {
        delete this.listener._listeningTo[this.obj._listenId];
        if (!this.interop) delete this.obj._listeners[this.id];
    };

    Events.bind = Events.on;
    Events.unbind = Events.off;

    extend(Base, Events);

    const Model = (Base.Model = function () {
        this.preinitialize.apply(this, arguments);
        this.cid = uniqueId(this.cidPrefix);
        this.attributes = {};
        this.changed = {};
        this.initialize.apply(this, arguments);
    });

    extend(Model.prototype, Events, {
        preinitialize: function () {},
        initialize: function () {},
        idAttribute: 'id',
        cidPrefix: 'c',
    });

    const Collection = (Base.Collection = function () {
        this.preinitialize.apply(this, arguments);
        this.initialize.apply(this, arguments);
    });

    extend(Collection.prototype, Events, {
        model: Model,
        preinitialize: function () {},
        initialize: function () {}
    });

    const View = (Base.View = function () {
        this.cid = uniqueId('view');
        this.preinitialize.apply(this, arguments);
        this.initialize.apply(this, arguments);
    });

    extend(View.prototype, Events, {
        preinitialize: function () {},
        initialize: function () {}
    });

    function ajax(options) {
        options = options || {};
        var type = options.type || 'GET';
        var url = options.url;
        var processData = options.processData === undefined ? true : !!options.processData;
        var contentType = options.contentType || 'application/x-www-form-urlencoded; charset=UTF-8';
        var data = options.data;
        if (processData && typeof data === 'object') {
            var params = Object.keys(data).map(function (prop) {
                return encodeURIComponent(prop) + '=' + encodeURIComponent(data[prop]);
            });
            data = params.join('&');
        }
        if (data && (type === 'GET' || type === 'HEAD')) {
            url += (url.indexOf('?') === -1 ? '?' : '&') + data;
            data = undefined;
        }
        var xhr = new XMLHttpRequest();
        xhr.open(type, url, true);
        xhr.setRequestHeader('Content-Type', contentType);
        if (options.beforeSend) options.beforeSend(xhr);
        xhr.onload = function () {
            var error = false;
            var content = xhr.responseText;
            if (options.dataType === 'json') {
                try {
                    content = JSON.parse(content);
                } catch (e) {
                    error = true
                }
            }
            if (!error && (xhr.status >= 200 && xhr.status < 300)) {
                if (options.success) options.success(content, xhr.statusText, xhr);
            } else {
                if (options.error) options.error(xhr);
            }
        }.bind(this);
        xhr.onerror = xhr.onabort = function () {
            if (options.error) options.error(xhr);
        };
        xhr.send(data);
        return xhr;
    };

    function defaults(object) {
        if (!object) {
            return object
        }
        for (var argsIndex = 1, argsLength = arguments.length; argsIndex < argsLength; argsIndex += 1) {
            var iterable = arguments[argsIndex];
            if (iterable) {
                for (var key in iterable) {
                    if (object[key] == null) {
                        object[key] = iterable[key]
                    }
                }
            }
        }
        return object
    };

    function result(object, property, fallback) {
        var value = object == null ? void 0 : object[property];
        if (value === void 0) {
            value = fallback;
        }
        return isFunction(value) ? value.call(object) : value;
    };

    Base.sync = function (method) {
        
        var type = methodMap[method];

        defaults(options || (options = {}), {
            emulateHTTP: Base.emulateHTTP,
            emulateJSON: Base.emulateJSON
        });

        var params = {
            type: type,
            dataType: 'json'
        };

        if (!options.url) {
            params.url = result(model, 'url') || urlError();
        }

        if (options.data == null && model && (method === 'create' || method === 'update' || method === 'patch')) {
            params.contentType = 'application/json';
            params.data = JSON.stringify(options.attrs || model.toJSON(options));
        }

        if (options.emulateJSON) {
            params.contentType = 'application/x-www-form-urlencoded';
            params.data = params.data ? {
                model: params.data
            } : {};
        }

        if (options.emulateHTTP && (type === 'PUT' || type === 'DELETE' || type === 'PATCH')) {
            params.type = 'POST';
            if (options.emulateJSON) params.data._method = type;
            var beforeSend = options.beforeSend;
            options.beforeSend = function (xhr) {
                xhr.setRequestHeader('X-HTTP-Method-Override', type);
                if (beforeSend) return beforeSend.apply(this, arguments);
            };
        }

        if (params.type !== 'GET' && !options.emulateJSON) {
            params.processData = false;
        }

        var error = options.error;

        options.error = function (xhr, textStatus, errorThrown) {
            options.textStatus = textStatus;
            options.errorThrown = errorThrown;
            if (error) error.call(options.context, xhr, textStatus, errorThrown);
        };

        var xhr = options.xhr = Base.ajax(extend(params, options));

        model.trigger('request', model, xhr, options);

        return xhr;

    };

    const methodMap = {
        create: 'POST',
        update: 'PUT',
        patch: 'PATCH',
        delete: 'DELETE',
        read: 'GET'
    };

    Base.ajax = function () {
        return ajax.apply(Base, arguments);
    };

    const Router = (Base.Router = function (options) {
        options || (options = {});
        this.preinitialize.apply(this, arguments);
        this.initialize.apply(this, arguments);
    });

    extend(Router.prototype, Base.Events, {
        preinitialize: function () {},
        initialize: function () {}
    });

    const History = (Base.History = function () {
        this.handlers = [];
        if (typeof window !== "undefined") {
            this.location = window.location;
            this.history = window.history;
        }
    });

    History.started = false;

    extend(History.prototype, Base.Events, {
        interval: 50
    });

    Base.history = new History();

    function inherits(protoProps, staticProps) {
        var parent = this;
        var child;
        if (protoProps && has(protoProps, 'constructor')) {
            child = protoProps.constructor;
        } else {
            child = function () {
                return parent.apply(this, arguments);
            };
        }
        extend(child, parent, staticProps);
        child.prototype = create(parent.prototype, protoProps);
        child.prototype.constructor = child;
        child.__super__ = parent.prototype;
        return child;
    };

    Model.extend = Collection.extend = View.extend = Router.extend = History.extend = inherits;

    return Base;

});