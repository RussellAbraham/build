
requirejs.config({
    baseUrl: 'vendor',
    paths: {
        assets : '../assets',    
        cdn : 'https://assets.codepen.io/1674766',
        s3 : 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1674766',
    }
});
requirejs(['util', 'dom', 'base', 'localforage', 'sync'], function(_, $, Base, localforage, sync){
    if(typeof window !== 'undefined'){
        console.log(_.prototype);
        console.log($.prototype)
        console.log(Base);
    }
});