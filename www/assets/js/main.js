define([
    'backboneLocalforage',
    'assets/js/routes/router'
], function(Sync, Router) {
    function Main(){
        this.idx = 0;
        this.router = new Router();      
    };
    Main.prototype = {}
    return Main;
});