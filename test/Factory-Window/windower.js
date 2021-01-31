function Constructor() {
	this.preinitialize.apply(this, arguments);
	this.initialize.apply(this, arguments);
};

Constructor.prototype.preinitialize = function () {

};

Constructor.prototype.initialize = function () {

};

Constructor.prototype.valueOf = function () {
	return this;
};

function Thread() {
	var blob = new Blob(['onmessage=function(e){postMessage(e.data)}'], {
		type: 'text/javascript'
	});
	this.source = URL.createObjectURL(blob);
	this.worker = new Worker(this.source);
};

Thread.prototype = Object.create(Constructor.prototype, {
	constructor: {
		configurable: true,
		enumerable: true,
		value: Thread,
		writeable: true
	}
});

Thread.prototype.preinitialize = function () {

};

Thread.prototype.initialize = function () {

};

function Standard(name) {
	this.name = name;
};

Standard.prototype = Object.create(Constructor.prototype, {
	constructor: {
		configurable: true,
		enumerable: true,
		value: Standard,
		writeable: true
	}
});

Standard.prototype.preinitialize = function () {

};

Standard.prototype.initialize = function () {

};

Standard.prototype.open = function (focus) {
	var self = this;
	if (self.cid) {
		console.error('');
	} else {
		if (focus) {
			self.thread = new Thread();
			self.cid = window.open('about:blank', self.name, 'width=600,height=400');
			self.cid.focus();
		} else {
			self.thread = new Thread();
			self.cid = window.open('about:blank', self.name, 'width=600,height=400');
		}
	}
};

Standard.prototype.close = function () {
	var self = this;
	if (self.cid) {
		self.thread.worker.terminate();
		self.cid.close();
		self.cid = '';
	}
};

Standard.prototype.write = function (html) {
	var self = this;
	self.cid.document.write(html);
};

window.one = new Standard('one');


function looseJsonParse(obj) {
	return Function('"use strict";return (' + obj + ')')();
};

var Aria = {

	Handler: function (event) {
		var target = event.target;
		var pressed = target.getAttribute('aria-pressed');
		if (!looseJsonParse(pressed)) {
			target.setAttribute('aria-pressed', 'true');
			target.classList.add('pressed');
		} else {
			target.setAttribute('aria-pressed', 'false');
			target.classList.remove('pressed');
		}
	}

};

(function (btns) {
	var i, length = btns.length,
		handler = function (e) {
			var target = e.target;
			var pressed = target.getAttribute('aria-pressed');
			if (!looseJsonParse(pressed)) {
				target.setAttribute('aria-pressed', 'true');
				target.classList.add('pressed');
			} else {
				target.setAttribute('aria-pressed', 'false');
				target.classList.remove('pressed');
			}
		};
	for (i = 0; i < length; i++) {
		btns[i].addEventListener('click', handler, false);
	}
})(document.querySelectorAll('.btn-pressed'));