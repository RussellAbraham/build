define([ "backbone","text!assets/html/contact.html", "link!assets/css/contact.css", ], function(Backbone,template){
	
	contactView = Backbone.View.extend({         
		
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