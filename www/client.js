requirejs.config({
    baseUrl: 'vendor',
    paths: {
        assets : '../assets',
        cluster : 'cluster',
        container : 'container',
        router : 'router'
    }
});

requirejs(['assets/js/config','assets/js/main'],function(Config, Main){
    
});