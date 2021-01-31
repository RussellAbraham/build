(function(){

    browser.dialog = {};

    [ 'dialog' ].forEach(function(object){
        loadScripts('dialog/' + object);
    });

})();