(function () {
	// head
	// import { Base }
})(function () {
	
	var Channel = (Base.Channel = function () {
    this.preinitialize.apply(this, arguments);
    this.initialize.apply(this, arguments);
  });
	
  extend(Channel.prototype, Events, {
    preinitialize: function () {},
    initialize: function () {}
  });
	
  var channelError = function () {};	

	
});
