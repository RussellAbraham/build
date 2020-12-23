define(['backboneLocalforage', 'assets/js/models/model' ],function (Sync, Model) {    
    
    var Collection = Backbone.Collection.extend({
        model : Model,
        sync : Backbone.localforage.sync('graph-collection'),
		activated : function () {
			return this.where({ active : true });
		},
		deactivated : function () {
			return this.where({ active : false });
		},
		nextOrder : function () {
			return this.length ? this.last().get('order') + 1 : 1;
		},
		comparator: 'order',
		clear : function(){
			while(this.models.length){
				this.models[0].cancel();
				this.models[0].destroy();
			}
		}
    });
    
    return Collection;
    
});
