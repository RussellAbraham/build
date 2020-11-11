(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['localforage', 'base' ], factory);
    } else if (typeof module !== 'undefined' && module.exports) {
        var localforage = require('localforage');
        var Base = require('base');
        module.exports = factory(localforage, Base);
    } else {
        factory(root.localforage, root.Base);
    }
}(this, function(localforage, Base) {
    function S4() {
        return ((1 + Math.random()) * 65536 | 0).toString(16).substring(1);
    }
    function guid() {
        return S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4();
    }
    function updateCollectionReferences(collection, callback, err, data) {
        if (collection) {
            var collectionData = collection.map(function(model) {
                return collection.model.prototype.sync._localforageNamespace + '/' + model.id;
            });
            callback = callback ? _.partial(callback, err, data) : undefined;
            if (!collection.sync.localforageKey) {
                localforageKey(collection);
            }
            localforage.setItem(collection.sync.localforageKey, collectionData, callback);
        }
    }
    function localforageKey(model) {
        if (model instanceof Base.Collection) {
            model.sync.localforageKey = model.sync._localforageNamespace;
        } else { 
            if (!model.id) {
                model[model.idAttribute] = model.attributes[model.idAttribute] = guid();
            }
            model.sync.localforageKey = model.sync._localforageNamespace + '/' + model.id;
        }
    }

    Base.localforage = {
        localforageInstance: localforage,
        sync: function(name) {
            var self = this;
            var sync = function(method, model, options) {
                localforageKey(model);
                switch (method) {
                    case 'read':
                        return model.id ? self.find(model, options) : self.findAll(model, options);
                    case 'create':
                        return self.create(model, options);
                    case 'update':
                        return self.update(model, options);
                    case 'delete':
                        return self.destroy(model, options);
                }
            };
            sync._localforageNamespace = name;
            sync._localeForageKeyFn = localforageKey;
            return sync;
        },
        save: function(model, callback) {
            localforage.setItem(model.sync.localforageKey, model.toJSON(), function(err, data) {          
                if (model.collection) {
                    updateCollectionReferences(model.collection, callback, err, data);
                } else if (callback) {
                    callback(data);
                }
            });
        },
        create: function(model, callbacks) {
            return this.update(model, callbacks);
        },
        update: function(model, callbacks) {
            this.save(model, function(data) {
                if (callbacks.success) {
                    callbacks.success(data);
                }
            });
        },
        find: function(model, callbacks) {
            localforage.getItem(model.sync.localforageKey, function(err, data) {
                if (!err && !_.isEmpty(data)) {
                    if (callbacks.success) {
                        callbacks.success(data);
                    }
                } else if (callbacks.error) {
                    callbacks.error();
                }
            });
        },
        findAll: function(collection, callbacks) {
            localforage.getItem(collection.sync.localforageKey, function(err, data) {
                if (!err && data && data.length) {
                    var done = function() {
                        if (callbacks.success) {
                            callbacks.success(data);
                        }
                    };
                    done = _.after(data.length, done);
                    var onModel = function(i, err, model) {
                        data[i] = model;
                        done();
                    };
                    for (var i = 0; i < data.length; ++i) {
                        localforage.getItem(data[i], _.partial(onModel, i));
                    }
                } else {
                    data = [];
                    if (callbacks.success) {
                        callbacks.success(data);
                    }
                }
            });
        },
        destroy: function(model, callbacks) {
            var collection = model.collection;
            localforage.removeItem(model.sync.localforageKey, function() {
                if (collection) {
                    updateCollectionReferences(collection, callbacks.success, null, model.toJSON());
                } else if (callbacks.success) {
                    callbacks.success(model.toJSON());
                }
            });
        }
    };
    return Base.localforage;
}));
