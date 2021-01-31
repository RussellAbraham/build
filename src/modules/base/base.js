(function (factory) {
  var root =
    (typeof self == "object" && self.self === self && self) ||
    (typeof global == "object" && global.global === global && global);

  if (typeof define === "function" && define.amd) {
    define(["exports"], function (exports) {
      root.Base = factory(root, exports);
    });
  } else if (typeof exports !== "undefined") {
    factory(root, exports);
  } else {
    root.Base = factory(root, {});
  }
})(function (root, Base) {
  var previousBase = root.Base;

  Base.VERSION = "0.0.1";
  Base.emulation = false;
  Base.fallback = false;

  function extend(obj) {
    [].slice.call(arguments, 1).forEach(function (source) {
      for (var prop in source) {
        if (source[prop] !== void 0) obj[prop] = source[prop];
      }
    });
    return obj;
  }
  var _listening;
  var eventSplitter = /\s+/;

  var eventsApi = function (iteratee, events, name, callback, opts) {
    var i = 0,
      names;
    if (name && typeof name === "object") {
      // Handle event maps.
      if (callback !== void 0 && "context" in opts && opts.context === void 0)
        opts.context = callback;
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

  var onApi = function (events, name, callback, options) {
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
          (callback &&
            callback !== handler.callback &&
            callback !== handler.callback._callback) ||
          (context && context !== handler.context)
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
  }
  var triggerApi = function (objEvents, name, callback, args) {
    if (objEvents) {
      var events = objEvents[name];
      var allEvents = objEvents.all;
      if (events && allEvents) allEvents = allEvents.slice();
      if (events) triggerEvents(events, args);
      if (allEvents) triggerEvents(allEvents, [name].concat(args));
    }
    return objEvents;
  };
  var triggerEvents = function (events, args) {
    var ev,
      i = -1,
      l = events.length,
      a1 = args[0],
      a2 = args[1],
      a3 = args[2];
    switch (args.length) {
      case 0:
        while (++i < l) (ev = events[i]).callback.call(ev.ctx);
        return;
      case 1:
        while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1);
        return;
      case 2:
        while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2);
        return;
      case 3:
        while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2, a3);
        return;
      default:
        while (++i < l) (ev = events[i]).callback.apply(ev.ctx, args);
        return;
    }
  };
  /* 1 */
  var Events = (Base.Events = {
    on: function (name, callback, context) {
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
    },
    once: function () {},
    listenTo: function () {},
    listenToOnce: function () {},
    off: function (name, callback, context) {
      if (!this._events) return this;
      this._events = eventsApi(offApi, this._events, name, callback, {
        context: context,
        listeners: this._listeners
      });

      return this;
    },
    trigger: function (name) {
      if (!this._events) return this;

      var length = Math.max(0, arguments.length - 1);
      var args = Array(length);
      for (var i = 0; i < length; i++) args[i] = arguments[i + 1];

      eventsApi(triggerApi, this._events, name, void 0, args);
      return this;
    }
  });

  function Listening(listener, obj) {
    this.id = listener._listenId;
    this.listener = listener;
    this.obj = obj;
    this.interop = true;
    this.count = 0;
    this._events = void 0;
  }

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

  /* 2 */
  var Model = (Base.Model = function (options) {
    this.preinitialize.apply(this, arguments);
    this.options = options || {};
    this.attributes = {};
    this.initialize.apply(this, arguments);
  });

  extend(Model.prototype, Events, {
    preinitialize: function () {},
    initialize: function () {}
  });

  var Collection = (Base.Collection = function () {
    this.preinitialize.apply(this, arguments);
    this.setOptions = { add: true, remove: true, merge: true };
    this.addOptions = { add: true, remove: false };
    this.initialize.apply(this, arguments);
  });
  var idCounter = 0;

  function uniqueId(prefix) {
    var id = idCounter++;
    return prefix ? prefix + id : id;
  }





  /* 4 */
  var History = (Base.History = function () {
    this.handlers = [];
    if (typeof window !== "undefined") {
      this.location = window.location;
      this.history = window.history;
    }
  });

  History.started = false;

  Base.history = new History();

  extend(History.prototype, {
    start: function () {
      History.started = true;
    },
    stop: function () {
      History.started = false;
    }
  });

  var Router = (Base.Router = function () {
    this.preinitialize.apply(this, arguments);
    this.initialize.apply(this, arguments);
  });

  extend(Router.prototype, Events, {
    preinitialize: function () {},
    execute: function () {},
    initialize: function () {}
  });

  /* 5 */






  var ObjProto = Object.prototype;
  var hasOwn = ObjProto.hasOwnProperty;

  var has = function (obj, key) {
    return obj != null && hasOwn.call(obj, key);
  };

  var inherits = function (protoProps, staticProps) {
    var parent = this;
    var child;
    if (protoProps && has(protoProps, "constructor")) {
      child = protoProps.constructor;
    } else {
      child = function () {
        return parent.apply(this, arguments);
      };
    }
    extend(child, parent, staticProps);
    child.prototype = Object.create(parent.prototype, protoProps);
    child.prototype.constructor = child;
    child.__super__ = parent.prototype;
    return child;
  };

  Model.extend = Collection.extend = View.extend = Router.extend = History.extend = Sync.extend = inherits;

  var eventError = function () {};

  var modelError = function () {};

  var collectionError = function () {};

  var templateError = function () {};

  var viewError = function () {};

  var routerError = function () {};

  var historyError = function () {};



  var scriptError = function () {};

  return Base;
});
