var PropertyRetriever = (Base.ProperyRetriever = {

	getOwnEnumerables: function (obj) {
	
		return this._getPropertyNames(obj, true, false, this._enumerable);
		
	},

		getOwnNonenumerables: function (obj) {
			return this._getPropertyNames(obj, true, false, this._notEnumerable);
		},

		getOwnEnumerablesAndNonenumerables: function (obj) {
			return this._getPropertyNames(
				obj,
				true,
				false,
				this._enumerableAndNotEnumerable
			);
		},

		getPrototypeEnumerables: function (obj) {
			return this._getPropertyNames(obj, false, true, this._enumerable);
		},

		getPrototypeNonenumerables: function (obj) {
			return this._getPropertyNames(obj, false, true, this._notEnumerable);
		},

		getPrototypeEnumerablesAndNonenumerables: function (obj) {
			return this._getPropertyNames(
				obj,
				false,
				true,
				this._enumerableAndNotEnumerable
			);
		},

		getOwnAndPrototypeEnumerables: function (obj) {
			return this._getPropertyNames(obj, true, true, this._enumerable);
		},

		getOwnAndPrototypeNonenumerables: function (obj) {
			return this._getPropertyNames(obj, true, true, this._notEnumerable);
		},

		getOwnAndPrototypeEnumerablesAndNonenumerables: function (obj) {
			return this._getPropertyNames(
				obj,
				true,
				true,
				this._enumerableAndNotEnumerable
			);
		},

		_enumerable: function (obj, prop) {
			return obj.propertyIsEnumerable(prop);
		},

		_notEnumerable: function (obj, prop) {
			return !obj.propertyIsEnumerable(prop);
		},

		_enumerableAndNotEnumerable: function (obj, prop) {
			return true;
		},

		_getPropertyNames: function getAllPropertyNames(
			obj,
			iterateSelfBool,
			iteratePrototypeBool,
			includePropCb
		) {
			var props = [];

			do {
				if (iterateSelfBool) {
					Object.getOwnPropertyNames(obj).forEach(function (prop) {
						if (props.indexOf(prop) === -1 && includePropCb(obj, prop)) {
							props.push(prop);
						}
					});
				}
				if (!iteratePrototypeBool) {
					break;
				}
				iterateSelfBool = true;
			} while ((obj = Object.getPrototypeOf(obj)));

			return props;
		}
	});
