(function () {
	// head
	// import { Base }
})(function () {
	
	var View = (Base.View = function () {
		this.preinitialize.apply(this, arguments);
		this.initialize.apply(this, arguments);
	});

	extend(View.prototype, Base.Events, {
		preinitialize: function () {},
		initialize: function () {},
		createElement: function () {},
		destroyElement: function () {}
	});
	
	View.extend = inherits;
	
	var viewError = function(){};
	
});
