requirejs.config({
    baseUrl: 'node_modules',
    paths: {
        assets : '../assets',
	    jquery: 'jquery/dist/jquery',
	    underscore : 'underscore/underscore',
	    backbone: 'backbone/backbone',        
		text: 'requirejs-text/text',      
		link: 'requirejs-link/link',          
    }
});

requirejs(['assets/js/main'],function(Main){
    window.app = new Main('Application');
});
