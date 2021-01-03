define(function() {
    
    'use strict';

    function Router(collection, container){
        this.preinitialize.apply(this, arguments);
        this.collection = collection;
        this.container = container;
        this.initialize.apply(this, arguments);
    };
    
    Router.prototype.preinitialize = function(){};
    
    Router.prototype.initialize = function(){};

    return Router;

});