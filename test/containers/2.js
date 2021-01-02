define('tabs',['text!./template.html'],function(Template){
    
    (Tab = Backbone.Model.extend({ defaults : {} })),
    
    (Tabs = Backbone.Collection.extend({
        model : Tab,
        setActive : function(){},
        open : function(){}
    })),
    
    (TabView = Backbone.View.extend({
        tagName : '',
        className : '',
        events : {},
        template : _.template($(Template).html()),
        destructionPolicy: "never",
        initialize: function () {},
        highlight : function(){},
        render : function(){}
    }))

});



define('actions',['text!./template.html'],function(Template){
    
    (Action = Backbone.Model.extend({ defaults : {} })),
    
    (Actions = Backbone.Collection.extend({
        model : Action,
        open : function(){}
    })),
    
    (ActionView = Backbone.View.extend({
        tagName : '',
        className : '',
        events : {},
        template : _.template($(Template).html()),
        destructionPolicy: "never",
        initialize: function () {},
        render : function(){},
        open : function(){}
    }))

});


define('utils',[],function(){
    (webkitTransform = "-webkit-transform"),
        (webkitTransitionDuration = "-webkit-transition-duration"),
        (webkitTransitionDelay = "-webkit-transition-delay"),
        (webkitTransitionEasing = "-webkit-transition-timing-function"),
        (translate3d = function (a, b, c) {
            return "translate3d(" + a + "," + b + "," + c + ")";
        }),
        (slide = function (b, c, d, e, f, g, h) {
            (b = a(b)),
                f && b.css(webkitTransitionDuration, f + "ms"),
                g && b.css(webkitTransitionEasing, g),
                h && b.css(webkitTransitionDelay, h + "ms"),
                b.css(webkitTransform, translate3d(c, d, e));
        });

});

define('',['text!./template.html'],function(Template){
    (Pages = Backbone.Collection.extend({
        setActive:function(){},
        hookup : function(){
            this.where({})
        }
    })),

    (OverFlow = Backbone.View.extend({
        tagName: "",
        className: "",
        template : _.template( $(Template).filter('').html() ),
        initialize: function () {
            
        },
        hookup: function () {},
        render: function () {}    
    }))
});




Backbone.Collection.extend({
    sync: Backbone.localforage.sync("collection"),
    model: Backbone.Model.extend({
        sync: Backbone.localforage.sync("model")
    })
});


Backbone.View.extend({
    events: {
        'click [data-action="add"]' : "one",
        'click [data-action="refresh"]': "all",
        'click [data-action="clear"]': "clear"
    },
})

Backbone.View.extend({
    events: {
        'click [data-action="clear"]': "clear",
        'click [data-action="edit"]': "edit"
    },    
    initialize : function(){
        this.listenTo(this.model, 'destroy', this.remove);
        this.listenTo(this.model, 'change', this.render);
        this.listenTo(this.model, 'visible', this.toggleVisible);
    }
});

Backbone.View.extend({

    initialize : function(){

		this.listenTo(this.collection, 'change:completed', this.filterOne);
		this.listenTo(this.collection, 'filter', this.filterAll);

        this.listenTo(this.collection, 'add', this.one);
        this.listenTo(this.collection, 'reset', this.all);
        this.listenTo(this.collection, 'all', _.debounce(this.render, 0));
    }

    
});