define(['assets/js/views/view'], function(View) {
    
    'use strict';

    function Container(){
        this.initialize.apply(this, arguments);
    };
    
    Container.prototype.addOne = function(model){
        var view = new View({
            model : model
        });
        return view;
    };

    return Container;

});