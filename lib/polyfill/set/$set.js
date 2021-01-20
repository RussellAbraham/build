(function (global, factory) {
    "use strict";
    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = factory(global);
    } else {
        factory(global);
    }
})(typeof window !== "undefined" ? window : global, function (global) {

    "use strict";

    var createObjectIdentifier = function () {
        return '_' + ++createObjectIdentifier._last;
    }

    createObjectIdentifier._last = 0;

    var Set = function () {
        this._set = {};
        this._size = 0;
    }

    Set.prototype = {

        add: function (item) {
            var objectIdentifier = item.__identifier;
            if (!objectIdentifier) {
                objectIdentifier = createObjectIdentifier();
                item.__identifier = objectIdentifier;
            }
            if (!this._set[objectIdentifier])
                ++this._size;
            this._set[objectIdentifier] = item;
        },

        remove: function (item) {
            if (this._set[item.__identifier]) {
                --this._size;
                delete this._set[item.__identifier];
            }
        },

        items: function () {
            var result = new Array(this._size);
            var i = 0;
            for (var objectIdentifier in this._set)
                result[i++] = this._set[objectIdentifier];
            return result;
        },

        hasItem: function (item) {
            return this._set[item.__identifier];
        },

        size: function () {
            return this._size;
        },

        clear: function () {
            this._set = {};
            this._size = 0;
        }
    }



    window.Set = Set;

    global.Set = Set;

    return Set;

});