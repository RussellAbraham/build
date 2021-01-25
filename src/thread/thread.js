(function () {
	// head
	// import { Base }
})(function () {

	var Thread = (Base.Thread = function () {
		this.preinitialize.apply(this, arguments);
		this.initialize.apply(this, arguments);
	});
	
	extend(Thread.prototype, Base.Events, {
    preinitialize: function () {},
    initialize: function () {}
  });	
	
	Thread.extend = inherits;
	
	var threadError = function () {};	
	
});