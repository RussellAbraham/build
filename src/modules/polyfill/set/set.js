$jscomp.Set = function (a) {
    a = void 0 === a ? [] : a;
    this.map_ = new $jscomp.Map;
    if (a) {
        a = $jscomp.makeIterator(a);
        for (var b = a.next(); !b.done; b = a.next()) this.add(b.value)
    }
    this.size = this.map_.size
};
$jscomp.Set.checkBrowserConformance_ = function () {
    var a = $jscomp.global.Set;
    if (!a || !a.prototype.entries || !Object.seal) return !1;
    var b = Object.seal({
            x: 4
        }),
        a = new a($jscomp.makeIterator([b]));
    if (a.has(b) || 1 != a.size || a.add(b) != a || 1 != a.size || a.add({
            x: 4
        }) != a || 2 != a.size) return !1;
    var a = a.entries(),
        c = a.next();
    if (c.done || c.value[0] != b || c.value[1] != b) return !1;
    c = a.next();
    return c.done || c.value[0] == b || 4 != c.value[0].x || c.value[1] != c.value[0] ? !1 : a.next().done
};
$jscomp.Set.prototype.add = function (a) {
    this.map_.set(a, a);
    this.size = this.map_.size;
    return this
};
$jscomp.Set.prototype["delete"] = function (a) {
    a = this.map_["delete"](a);
    this.size = this.map_.size;
    return a
};
$jscomp.Set.prototype.clear = function () {
    this.map_.clear();
    this.size = 0
};
$jscomp.Set.prototype.has = function (a) {
    return this.map_.has(a)
};
$jscomp.Set.prototype.entries = function () {
    return this.map_.entries()
};
$jscomp.Set.prototype.values = function () {
    return this.map_.values()
};
$jscomp.Set.prototype.forEach = function (a, b) {
    var c = this;
    this.map_.forEach(function (d) {
        return a.call(b, d, d, c)
    })
};
$jscomp.Set.ASSUME_NO_NATIVE = !1;
$jscomp.Set$install = function () {
    !$jscomp.Set.ASSUME_NO_NATIVE && $jscomp.Set.checkBrowserConformance_() ? $jscomp.Set = $jscomp.global.Set : ($jscomp.Map$install(), $jscomp.initSymbol(), $jscomp.initSymbolIterator(), $jscomp.Set.prototype[Symbol.iterator] = $jscomp.Set.prototype.values);
    $jscomp.Set$install = function () {}
};
