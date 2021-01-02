'use strict';

define(function () {

    var Model = Backbone.Model.extend({
        defaults: function () {
            return { order : Collection1.nextOrder() }
        }
    });

    var Collection = Backbone.Collection.extend({
        model: Model,
        sync: Backbone.localforage.sync('collection'),
        nextOrder: function () { return this.length ? this.last().get('order') + 1 : 1; },
        comparator: 'order'
    });

    /* */

    var Collection1 = new Collection();

    var Section = Backbone.View.extend({
        template: _.template('<%= obj.order %>'),
        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });

    var Container = Backbone.View.extend({
        el: $(document.documentElement),
        initialize: function () {
            this.$article = this.$('article');
            this.listenTo(Collection1, 'add', this.addOne);
            this.listenTo(Collection1, 'reset', this.addAll);
            this.listenTo(Collection1, 'all', _.debounce(this.render, 0));
        },
        render : function(){
            return this;
        },
        passAttributes: function () {
            return { order: Collection1.nextOrder() }
        },
        addOne: function (model) {
            var view = new Section({ model: model });
            this.$article.html(view.render().el);
        },
        addAll: function () {
            this.$article.html('');
            Collection1.each(function(model, index){
                this.addOne(model);
            })
        },        
        create: function () {
            Collection1.create(this.passAttributes());
        }
    });

    return new Container();

});