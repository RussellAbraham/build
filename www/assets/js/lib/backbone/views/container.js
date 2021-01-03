define([
    'backbone',
    'assets/js/views/header',
    'assets/js/views/footer',
    'assets/js/views/view'
],function (Backbone, Header, Footer, View) {
    var Container = Backbone.View.extend({
        el : $('body'),
        initialize : function(){
            this.$header = new Header();
            this.$article = this.$('article');
            this.$footer = new Footer();
            this.listenTo(this.collection, 'add', this.addOne);
            this.listenTo(this.collection, 'reset', this.addAll);
            this.listenTo(this.collection, 'all', _.debounce(this.render, 0));
        },
        render : function(){
            return this;
        },
        addOne : function(model){
            var view = new View({ model : model });
            this.$article.append(view.render().el);
        },
		addAll: function () {
			this.$article.html('');
			this.collection.each(this.addOne, this);
		},      
        attr : function(){
            return {
                order : this.collection.nextOrder()
            }
        },
        create : function(){
            this.collection.create(this.attr())
        }
    });

    return Container;
    
});
