(function(){

    browser.history = {};

    ['history'].forEach(function(object){
        loadScripts('history/' + object);
    });

})();