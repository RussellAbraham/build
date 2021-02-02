define([ "backbone","text!assets/html/about.html", "link!assets/css/about.css", ], function(Backbone,template){
	
	aboutView = Backbone.View.extend({         
		
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