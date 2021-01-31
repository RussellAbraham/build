// Indirect Layer for installing modules into the api object

(function(){

    // module namespace

    browser.window = {};
    
    // load scripts to populate the module with methods

    ['window'].forEach(function(object){
        loadScripts('window/' + object);
    });

})();