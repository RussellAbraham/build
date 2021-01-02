define(['assets/js/collection','assets/js/container','assets/js/router'], function(Collection,Container,Router) {

    function Main(){
        this.collection = new Collection();
        this.container = new Container({
            collection : this.collection
        });
        this.router = new Router();
    };

    Main.prototype.valueOf = function(){
        return this;
    };
    
    return Main;

});