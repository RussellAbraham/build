define([ "backbone","text!assets/html/home.html", "link!assets/css/home.css", ], function(Backbone,template){
	
	homeView = Backbone.View.extend({         
		
		template : _.template($(template).html()),		    
		
		initialize : function(){
			this.render();
		},		    
		
		render: function(){    
			this.$el.append(this.template);      
			return this;	      
		}
		
	});
	
});