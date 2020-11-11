(function () {
	
    var root = this;

    const Base = {};

    const Events = {};

    Base.Events = Events;

    function eventsApi(){}

    Events.on = function () {
        this._events = eventsApi(onApi());
    };

    function onApi(){}

    Events.off = function(){
        if (!this._events) return this;
        this._events = eventsApi(offApi());
    };

    function offApi(){}

    function Listening(listener, obj) {
        this.id = listener._listenId;
        this.listener = listener;
        this.obj = obj;
        this.interop = true;
        this.count = 0;
        this._events = void 0;
    };

    Listening.prototype.on = Events.on;
    Listening.prototype.off = function () {}
    Listening.prototype.cleanup = function () {}
    
    Events.bind = Events.on;
    Events.unbind = Events.off;

	if (typeof exports !== "undefined") {
		if (typeof module !== "undefined" && module.exports) {
			exports = module.exports = Base;
		}
		exports.Base = Base;
	} else {
		root.Base = Base;
	}

	Base.VERSION = "0.0.1";

	if (typeof define === "function" && define.amd) {
		define("Base", [], function () {
			return Base;
		});
    }
    
}.call(this));