(function(){

    browser.location = {};

    ['location'].forEach(function(object){
        loadScripts('location/' + object);
    });

})();