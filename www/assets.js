// For any third party dependencies, place them in the cache folder.

// Configure loading modules from the cache directory,
// except for 'app' ones, which are in a sibling
// directory.
requirejs.config({
    baseUrl: 'cache',
    paths: {
        assets : '../assets',        
        github : 'https://autoraidapi.github.io',
        debug : 'https://cdpn.io/RJLeyra/debug',
        cdn : 'https://assets.codepen.io/1674766',
        s3 : 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1674766',
    }
});

// Start loading the main app file. Put all of
// your application logic in there.
requirejs([
    'assets/js/main'
], function(Main){

    if(typeof window !== 'undefined'){
        window.app = new Main();
    }

});