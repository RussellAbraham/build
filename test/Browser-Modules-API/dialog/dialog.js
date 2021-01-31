(function(object){
	object.dialog = function(){
        return {
			alert : function(){},
			confirm : function(){},
			prompt : function(){}
        }
    };
})(browser.dialog);