(function () {
	// head
	// import { Base }
})(function () {
  
	var splice = function (array, insert, at) {
    at = Math.min(Math.max(at, 0), array.length);
    var tail = Array(array.length - at);
    var length = insert.length;
    var i;
    for (i = 0; i < tail.length; i++) tail[i] = array[i + at];
    for (i = 0; i < length; i++) array[i + at] = insert[i];
    for (i = 0; i < tail.length; i++) array[i + length + at] = tail[i];
  };
	
	var Collection = (Base.Collection = function () {
    this.preinitialize.apply(this, arguments);
    this.initialize.apply(this, arguments);
  });
	
  extend(Collection.prototype, Events, {
    preinitialize: function () {},
    initialize: function () {}
  });
	
  var collectionError = function () {};	

	
});
