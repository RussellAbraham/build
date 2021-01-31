(function () {
	// head
	// import { Base }
})(function () {
	
	var Controller = (Base.Controller = function () {
    this.preinitialize.apply(this, arguments);
    this.initialize.apply(this, arguments);
  });
	
  extend(Controller.prototype, Events, {
    preinitialize: function () {},
    initialize: function () {}
  });
	
  var controllerError = function () {};	

	
});
