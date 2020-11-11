/* DOM Library Test */

function View() {
    this.initialize.apply(this, arguments);
    this.$main = $.id('main');
    this.$header = $.qs('header');
    this.$article = $.qs('article');
    this.$footer = $.qs('footer');
}

View.prototype = {
    
    initialize : function(options){
        this.options = (options || {});
        this.render();
    },

    render : function(){
        
        var self = this;

        $.delegate($.qs('header'), 'button', 'click', function(event){
            alert(self.options.message)
        });

    },

    bind : function(){

    }
}

const testView = new View({
    message : 'View Test'
});
 
