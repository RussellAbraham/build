define([ 
	'assets/js/views/home', 
	'assets/js/views/about', 				
	'assets/js/views/contact'
], function(){	
	
	Container = Backbone.View.extend({
		child : null,
		render: function(view) {
			this.child = view;
			this.$el.html(this.child.$el);
			return this;
		}		
	});	
	
	Router = Backbone.Router.extend({						
		routes : { 
			'' : 'home', 
			'about':'about',
			'contact' : 'contact'
		},		
		initialize : function(){			
			this.container = new Container({ el : $('#article') });			
			this.homeView = new homeView(); 
			this.aboutView = new aboutView();						
			this.contactView = new contactView();					
		},		
		home : function(){ this.container.render(this.homeView); },		
		about:function(){ this.container.render(this.aboutView); },		
		contact : function(){ this.container.render(this.contactView); }		
	});  	
});
