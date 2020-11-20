function action(object, events) {
    for (var event in events) {
        object.on(event, events[event]);
    }
}

function trigger(object, events) {
    for (var event in events) {
        object.trigger(event, events[event]);
    }
}

function listen(object, events) {
    for (var event in events) {
        object.addEventListener(event, events[event]);
    }
}

QUnit.module('Base.Events');

QUnit.test('on and trigger', function (assert) {
    assert.expect(2);
    var obj = {
        counter: 0
    };

    _.extend(obj, Base.Events);

    action(obj, {
        'event': function () {
            obj.counter += 1;
        }
    });

    obj.trigger('event');

    assert.equal(obj.counter, 1, 'counter should be incremented.');

    obj.trigger('event');
    obj.trigger('event');
    obj.trigger('event');
    obj.trigger('event');

    assert.equal(obj.counter, 5, 'counter should be incremented five times.');

});


QUnit.test('binding and triggering multiple events', function (assert) {
    assert.expect(4);
    var obj = {
        counter: 0
    };
    _.extend(obj, Base.Events);

    obj.on('a b c', function () {
        obj.counter += 1;
    });

    obj.trigger('a');
    assert.equal(obj.counter, 1);

    obj.trigger('a b');
    assert.equal(obj.counter, 3);

    obj.trigger('c');
    assert.equal(obj.counter, 4);

    obj.off('a c');
    obj.trigger('a b c');
    assert.equal(obj.counter, 5);
});


QUnit.test('binding and triggering with event maps', function (assert) {
    var obj = {
        counter: 0
    };
    _.extend(obj, Base.Events);

    var increment = function () {
        this.counter += 1;
    };

    obj.on({
        a: increment,
        b: increment,
        c: increment
    }, obj);

    obj.trigger('a');
    assert.equal(obj.counter, 1);

    obj.trigger('a b');
    assert.equal(obj.counter, 3);

    obj.trigger('c');
    assert.equal(obj.counter, 4);

    obj.off({
        a: increment,
        c: increment
    }, obj);
    obj.trigger('a b c');
    assert.equal(obj.counter, 5);
});


QUnit.test('binding and triggering multiple event names with event maps', function (assert) {
    var obj = {
        counter: 0
    };
    _.extend(obj, Base.Events);

    var increment = function () {
        this.counter += 1;
    };

    obj.on({
        'a b c': increment
    });

    obj.trigger('a');
    assert.equal(obj.counter, 1);

    obj.trigger('a b');
    assert.equal(obj.counter, 3);

    obj.trigger('c');
    assert.equal(obj.counter, 4);

    obj.off({
        'a c': increment
    });
    obj.trigger('a b c');
    assert.equal(obj.counter, 5);
});