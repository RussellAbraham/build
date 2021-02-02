(function(object){
	
	function override(){
		
		var XNavigator = function() {};
		
        XNavigator.prototype = origNavigator;
		
		var newNavigator = new XNavigator();
		
		if (XNavigator.bind) {
            for (var key in origNavigator) {
                if (typeof origNavigator[key] == 'function') {
                    newNavigator[key] = origNavigator[key].bind(origNavigator);
                }
            }
		}
		
		return newNavigator;

	};

	object.override = override;

	return object.override;

})(browser.navigator);
