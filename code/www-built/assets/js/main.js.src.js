define(['assets/js/lib/backbone/router'], function(Router) {

    function Main(){
        this.router = new Router();
    };

    Main.prototype.valueOf = function(){
        return this;
    };
    
    return Main;

});