define(['assets/js/config'], function(Ctor) {
    
    function Main(name){
        Ctor.call(this);
        this.name = name;
    };

    Main.prototype = Object.create(Ctor.prototype, {
        constructor : {            
            configurable : true,
            enumerable : true,
            value : Main,
            writeable : true
        }
    });

    Main.prototype.toString = function(){
        return '[object '.concat(this.name,']');
    };

    Main.prototype.valueOf = function(){
        return this;
    };

    Main.prototype.initialize = function(){
        console.log('Loaded!');
    };
    
    return Main;

});