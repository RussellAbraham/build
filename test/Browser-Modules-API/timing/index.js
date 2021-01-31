(function(){

    browser.timing = {};

    ['timing'].forEach(function(object){
        loadScripts('timing/' + object);
    });

})();