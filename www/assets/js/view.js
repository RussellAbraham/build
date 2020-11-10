
define([ 'dom', 'util'],function ($, _) {
    
    function View(){
        this.container = $.id('main');
        
        this.container.article = $.qs('article');
        
        this.initialize.apply(this, arguments);
    };

    View.prototype = {
        
        input : function(){
            var self = this;
            const node = $.create(this.container.article, 'input');
            $.listen(node,'keyup', function(event){
                self.handler(event, this.value);
            });
            if($.qsa('input').length > 1){
                node.focus();
            }
        },

        output : function(string){     
            
            this.value = '';
            this.disabled = true;

            $.create(this.container.article, 'pre', {
                html : string
            });

            this.input();
        },

        initialize : function(){
            this.input();
        },

        handler : function(event, string){
            var self = this, 
            key = event.which;
            switch(key){
                case 13 : self.evaluate(string); break;
            }
        },

        evaluate : function(string){
            
            if(string.indexOf('.red') > -1){
                this.output(string.substring(4).fontcolor('crimson'));
            }

            else if(string.indexOf('.exit') > -1){
                this.exit();
            }

            else if(string.indexOf('.green') > -1){
                this.output(string.substring(6).fontcolor('teal'));
            }

            else if(string.indexOf('.blue') > -1){
                this.output(string.substring(5).fontcolor('steelblue'));
            }

            else if(string.indexOf('.clear') > -1){
                this.clear();
            }

            else {
                this.output(string);
            }
        },

        clear : function(){
            this.container.article.innerHTML = '';
            this.input();
            $.qs('article input').focus();
        },

        exit : function(){
            
        }

    };

    return View;

});
