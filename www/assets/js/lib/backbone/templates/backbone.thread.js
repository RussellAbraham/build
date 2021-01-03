/*
 * Backbone View Module
 */

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['backbone', 'underscore'], factory);
    } else if (typeof module !== 'undefined' && module.exports) {
        var Backbone = require('backbone');
        var _ = require('underscore');
        module.exports = factory(Backbone, _);
    } else {
        factory(root.Backbone, root._);
    }
}(this, function (Backbone, _) {

    var Thread = Backbone.Thread = function(){

        this.preinitialize.apply(this, arguments);
        
        this.initialize.apply(this, arguments);

    };

    _.extend(Thread.prototype, Backbone.Events, {
        
        preinitialize : function(){},

        initialize : function(){},

        _source : function(string){
            this.worker = new Worker(
                URL.createObjectURL(new Blob(                    
                    [string], { type : 'text/javascript' }
                ))
            );
        }

    });
    
    return Backbone.Thread;

}));