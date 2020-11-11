(function () {
	
    var root = this, _listening;

    const eventSplitter = /\s+/;

    const Base = {};

    const Events = {};
    
    Base.Events = Events;
    
    function extend(destination, from) { for (var prop in from) { if (from[prop]) { destination[prop] = from[prop]; } } return destination; }

    function eventsApi(iteratee, events, name, callback, opts) {
        var i = 0, names;
        if (name && typeof name === 'object') {
            if (callback !== void 0 && 'context' in opts && opts.context === void 0) opts.context = callback;
            for (names = Object.keys(name); i < names.length; i++) {
                events = eventsApi(iteratee, events, names[i], name[names[i]], opts);
            }
        } 
        else if (name && eventSplitter.test(name)) {
            for (names = name.split(eventSplitter); i < names.length; i++) {
                events = iteratee(events, names[i], callback, opts);
            }
        } 
        else {
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

    Events.bind = Events.on;
    Events.unbind = Events.off;

    extend(Base, Events);

    Base.VERSION = "0.0.1";
    
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
    })
    
    Base.history = new History();

	if (typeof exports !== "undefined") {
		if (typeof module !== "undefined" && module.exports) {
			exports = module.exports = Base;
		}
		exports.Base = Base;
	} else {
		root.Base = Base;
	}
	if (typeof define === "function" && define.amd) {
		define("Base", [], function () {
			return Base;
		});
    }    
}.call(this));