requirejs.config({
    baseUrl: 'vendor',
    paths: {
        assets : '../assets',
        jquery : 'jquery/dist/jquery',
        underscore : 'underscore/underscore',
        backbone : 'backbone/backbone'
    }
});

requirejs(['jquery','underscore','backbone'],function($,_,Backbone){

});