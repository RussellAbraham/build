define(['assets/js/models/model'], function(Model) {
    
    'use strict';

    function Collection(){        
        this.initialize.apply(this, arguments);
    };
    
    Collection.prototype.addOne = function(options){
        options = (options || {});
        var model = new Model(options);
        return model;
    };

    return Container;

});