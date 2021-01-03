define(['backbone'],function (Backbone) {    

    var Header = Backbone.View.extend({        
        
        el : $('header'),

        events : {
            'submit' : 'submit'
        },

        submit : function(event){            
            event.preventDefault();   
            event.target.reset();         
        }

    });

    return Header;
    
});
