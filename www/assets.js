const plugins = {};
requirejs.config({
    baseUrl: 'vendor',
    paths: {
        assets : '../assets',    
        cdn : 'https://assets.codepen.io/1674766',
        s3 : 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1674766',
    }
});
requirejs(['util', 'dom', 'base', 'localforage', 'assets/js/main'], function(_, $, Base, localforage, Main){
    plugins.localforage = localforage;
    if(typeof window !== 'undefined'){
        window.app = new Main();
    }
});