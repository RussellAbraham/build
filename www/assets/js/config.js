define(function(){
  
  function Ctor(obj){
    this.preinitialize.apply(this,arguments);
    this.name = obj;
    this.initialize.apply(this,arguments);
  };

  Ctor.prototype.preinitialize = function(){
    /* override */
  };

  Ctor.prototype.toString = function(){
    return '[function Constructor]';
  };  

  Ctor.prototype.valueOf = function(){
    return this;
  };  

  Ctor.prototype.initialize = function(){
    /* override */
  };

  return Ctor;

});
