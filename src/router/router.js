(function () {
	// head
	// import { Base }
})(function () {
	
	var Router = (Base.Router = function () {
    this.preinitialize.apply(this, arguments);
    this.initialize.apply(this, arguments);
  });
	
  extend(Router.prototype, Base.Events, {
    preinitialize: function () {},
    initialize: function () {}
  });
	
	Router.extend = inherits;
	
  var routerError = function () {};	

});
