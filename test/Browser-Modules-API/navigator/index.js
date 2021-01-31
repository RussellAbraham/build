(function(){
    
    browser.navigator = {};

    [ 'navigator' ].forEach(function(object){
        loadScripts('navigator/' + object);
    });

})();