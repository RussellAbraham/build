(function(object){

    object.Interval = function(){
        if(!this && this instanceof browser.timing.Interval){
            return;
        }
    };

    object.Interval.prototype = {
        start : function(){},
        stop : function(){}
    }

    object.Timeout = function(){
        if(!this && this instanceof browser.timing.Timeout){
            return;
        }
    };

    object.Timeout.prototype = {
        
    }

    return object;

})(browser.timing);