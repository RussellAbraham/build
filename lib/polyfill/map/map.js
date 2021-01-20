$jscomp.Map = function (a) {
    a = void 0 === a ? [] : a;
    this.data_ = {};
    this.head_ = $jscomp.Map.createHead_();
    this.size = 0;
    if (a) {
        a = $jscomp.makeIterator(a);
        for (var b = a.next(); !b.done; b = a.next()) b = b.value, this.set(b[0], b[1])
    }
};

$jscomp.Map.checkBrowserConformance_ = function () {
    var a = $jscomp.global.Map;
    if (!a || !a.prototype.entries || !Object.seal) return !1;
    try {
        var b = Object.seal({
                x: 4
            }),
            c = new a($jscomp.makeIterator([
                [b, "s"]
            ]));
        if ("s" != c.get(b) || 1 != c.size || c.get({
                x: 4
            }) || c.set({
                x: 4
            }, "t") != c || 2 != c.size) return !1;
        var d = c.entries(),
            e = d.next();
        if (e.done || e.value[0] != b || "s" != e.value[1]) return !1;
        e = d.next();
        return e.done || 4 != e.value[0].x || "t" != e.value[1] || !d.next().done ? !1 : !0
    } catch (f) {
        return !1
    }
};
$jscomp.Map.createHead_ = function () {
    var a = {};
    return a.previous = a.next = a.head = a
};
$jscomp.Map.getId_ = function (a) {
    if (!(a instanceof Object)) return String(a);
    $jscomp.Map.key_ in a || a instanceof Object && Object.isExtensible && Object.isExtensible(a) && $jscomp.Map.defineProperty_(a, $jscomp.Map.key_, ++$jscomp.Map.index_);
    return $jscomp.Map.key_ in a ? a[$jscomp.Map.key_] : " " + a
};
$jscomp.Map.prototype.set = function (a, b) {
    var c = this.maybeGetEntry_(a),
        d = c.id,
        e = c.list,
        c = c.entry;
    e || (e = this.data_[d] = []);
    c ? c.value = b : (c = {
        next: this.head_,
        previous: this.head_.previous,
        head: this.head_,
        key: a,
        value: b
    }, e.push(c), this.head_.previous.next = c, this.head_.previous = c, this.size++);
    return this
};
$jscomp.Map.prototype["delete"] = function (a) {
    var b = this.maybeGetEntry_(a);
    a = b.id;
    var c = b.list,
        d = b.index;
    return (b = b.entry) && c ? (c.splice(d, 1), c.length || delete this.data_[a], b.previous.next = b.next, b.next.previous = b.previous, b.head = null, this.size--, !0) : !1
};
$jscomp.Map.prototype.clear = function () {
    this.data_ = {};
    this.head_ = this.head_.previous = $jscomp.Map.createHead_();
    this.size = 0
};
$jscomp.Map.prototype.has = function (a) {
    return !!this.maybeGetEntry_(a).entry
};
$jscomp.Map.prototype.get = function (a) {
    return (a = this.maybeGetEntry_(a).entry) && a.value
};
$jscomp.Map.prototype.maybeGetEntry_ = function (a) {
    var b = $jscomp.Map.getId_(a),
        c = this.data_[b];
    if (c)
        for (var d = 0; d < c.length; d++) {
            var e = c[d];
            if (a !== a && e.key !== e.key || a === e.key) return {
                id: b,
                list: c,
                index: d,
                entry: e
            }
        }
    return {
        id: b,
        list: c,
        index: -1,
        entry: void 0
    }
};
$jscomp.Map.prototype.entries = function () {
    return this.iter_(function (a) {
        return [a.key, a.value]
    })
};
$jscomp.Map.prototype.keys = function () {
    return this.iter_(function (a) {
        return a.key
    })
};
$jscomp.Map.prototype.values = function () {
    return this.iter_(function (a) {
        return a.value
    })
};
$jscomp.Map.prototype.forEach = function (a, b) {
    for (var c = $jscomp.makeIterator(this.entries()), d = c.next(); !d.done; d = c.next()) d = d.value, a.call(b, d[1], d[0], this)
};
$jscomp.Map.prototype.iter_ = function (a) {
    var b = this,
        c = this.head_;
    $jscomp.initSymbol();
    $jscomp.initSymbolIterator();
    var d = {};
    return d.next = function () {
        if (c) {
            for (; c.head != b.head_;) c = c.previous;
            for (; c.next != c.head;) return c = c.next, {
                done: !1,
                value: a(c)
            };
            c = null
        }
        return {
            done: !0,
            value: void 0
        }
    }, d[Symbol.iterator] = function () {
        return this
    }, d
};
$jscomp.Map.index_ = 0;
$jscomp.Map.defineProperty_ = Object.defineProperty ? function (a, b, c) {
    Object.defineProperty(a, b, {
        value: String(c)
    })
} : function (a, b, c) {
    a[b] = String(c)
};
$jscomp.Map.Entry_ = function () {};
$jscomp.Map.ASSUME_NO_NATIVE = !1;
$jscomp.Map$install = function () {
    $jscomp.initSymbol();
    $jscomp.initSymbolIterator();
    !$jscomp.Map.ASSUME_NO_NATIVE && $jscomp.Map.checkBrowserConformance_() ? $jscomp.Map = $jscomp.global.Map : ($jscomp.initSymbol(), $jscomp.initSymbolIterator(), $jscomp.Map.prototype[Symbol.iterator] = $jscomp.Map.prototype.entries, $jscomp.initSymbol(), $jscomp.Map.key_ = Symbol("map-id-key"));
    $jscomp.Map$install = function () {}
};
