(function (global) {

    var createObjectIdentifier = function () {
        return '_' + ++createObjectIdentifier._last;
    };

    createObjectIdentifier._last = 0;

    /**
     * @constructor
     */
    var Map = function () {
        this._map = {};
        this._size = 0;
    }

    Map.prototype = {
        /**
         * @param {Object} key
         * @param {*=} value
         */
        put: function (key, value) {
            var objectIdentifier = key.__identifier;
            if (!objectIdentifier) {
                objectIdentifier = createObjectIdentifier();
                key.__identifier = objectIdentifier;
            }
            if (!this._map[objectIdentifier])
                ++this._size;
            this._map[objectIdentifier] = [key, value];
        },

        /**
         * @param {Object} key
         */
        remove: function (key) {
            var result = this._map[key.__identifier];
            if (!result)
                return undefined;
            --this._size;
            delete this._map[key.__identifier];
            return result[1];
        },

        /**
         * @return {Array.<Object>}
         */
        keys: function () {
            return this._list(0);
        },

        values: function () {
            return this._list(1);
        },

        /**
         * @param {number} index
         */
        _list: function (index) {
            var result = new Array(this._size);
            var i = 0;
            for (var objectIdentifier in this._map)
                result[i++] = this._map[objectIdentifier][index];
            return result;
        },

        /**
         * @param {Object} key
         */
        get: function (key) {
            var entry = this._map[key.__identifier];
            return entry ? entry[1] : undefined;
        },

        size: function () {
            return this._size;
        },

        clear: function () {
            this._map = {};
            this._size = 0;
        }
    }

    if (typeof global !== 'undefined') {
        global.Map = Map;
    }

})(this);