(function(factory){
    var root = this;
    root.Base = factory(root, {
        
    });
}(function(root, Base){

    var reference = root.Base;

    Base.noConflict = function(){
        root.Base = reference;
        return this;
    };

    return Base;
}));