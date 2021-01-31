(function () {
	// head
	// import { Base }
})(function () {
	
	var Model = (Base.Model = function () {
    this.preinitialize.apply(this, arguments);
    this.initialize.apply(this, arguments);
  });
	
  extend(Model.prototype, Events, {
    preinitialize: function () {},
    initialize: function () {}
  });
	
  var modelError = function () {};	

	
});
