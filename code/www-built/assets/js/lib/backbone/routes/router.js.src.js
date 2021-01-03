define([
    'backboneLocalforage',
    'assets/js/collections/collection',
    'assets/js/views/container'
], function(Sync, Collection, Container) {
    var Router = Backbone.Router.extend({
        preinitialize : function(){
            this.collection = new Collection();
            this.container = new Container();
        },
        routes : {
            '' : ''
        },
        initialize : function(){
            Backbone.history.start();
        }
    });
    return Router;
});