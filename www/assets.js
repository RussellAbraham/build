
requirejs.config({
    baseUrl: 'vendor',
    paths: {
        assets : '../assets',
        link : 'link',
        text : 'text'
    }
});

requirejs(['assets/js/lib/main', 'text!assets/js/lib/template.html'], function(){
    
});
