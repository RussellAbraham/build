define(['backbone'],function (Backbone) {    

    var View = Backbone.View.extend({    
        preinitialize : function(){
            this.channel = new MessageChannel();
            this.port = this.channel.port1;
        },    
        template : _.template(''),
        initialize : function(){
            this.listenTo(this.model, 'destroy', this.remove);            
        },
        render : function(){
            this.$el.append(this.template(this.model.toJSON()));
            return this;
        }
    });

    return View;
    
});
