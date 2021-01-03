define(['backboneLocalforage'], function (Sync) {

    var Model = Backbone.Model.extend({

        preinitialize : function(){
            this.worker = new Worker(
                URL.createObjectURL(
                    new Blob(
                        ['self.onmessage=function(event){self.postMessage(event.data,[event.data])}'],
                        { type: 'text/javascript' }
                    )
                )
            );
        },

        defaults: function () {
            return {
                active : true,
                order : App.router.collection.nextOrder()
            }
        },

        initialize : function(){
            this.worker.addEventListener('message', function(event){
                this.reader = new FileReader();
                this.reader.addEventListener('load', function(event){
                    console.log(event.currentTarget.result);
                }, false);                
                this.reader.readAsBinaryString(new Blob([event.data], {type : 'application/octet-stream'}));
            }, false);
        },

        sync: Backbone.localforage.sync('graph-model'),

        toggle: function () {
            this.save({
                active: !this.get('active')
            });
        },

        /* todolist application structure to emulate process id's in a table, worker threads being the process 
            with array buffer response, memory is allocated for a request and referenced to an origin or owner context of that allocated memory
            with postMessage, the ownership of the allocated buffer is transfered
        */
        
        post : function(string){     
            this.request = new XMLHttpRequest();     
            this.request.open('GET', 'data:application/octet-stream, '.concat(string), true);
            this.request.responseType = 'arraybuffer';
            this.request.addEventListener('load', this.onRequest.bind(this), false);
            this.request.send(null);
        },
        onRequest : function(event){
            this.worker.postMessage(event.currentTarget.response, [event.currentTarget.response]);
        },
        cancel : function(){
            this.worker.terminate();
        }

    });

    return Model;

});
