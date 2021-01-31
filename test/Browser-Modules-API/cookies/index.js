(function(){
    
    browser.cookies = {};

    [ 'cookies' ].forEach(function(object){
        loadScripts('cookies/' + object);
    });

})();