(function () {
	// head
	// import { Base }
})(function () {
	
  var Sync = (Base.Sync = function () {
    this.preinitialize.apply(this, arguments);
    this.initialize.apply(this, arguments);
  });
	
  extend(Sync.prototype, Base.Events, {
    preinitialize: function () {},
    create: function () {},
    read: function () {},
    update: function () {},
    destroy: function () {},
    initialize: function () {}
  });

	Sync.extend = inherits;
	
  var syncError = function () {};	
		
});