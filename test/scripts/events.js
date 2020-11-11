QUnit.module('Base.Events');

QUnit.test('on', function (assert) {
    const object = { count : 0 };
    _.extend(object, Base.Events);
    object.on("test", function(event){ object.counter += 1 });
    assert.equal(object.count, 0, ' count 0');
});

QUnit.test('on', function (assert) {
    function action(object, events){
        for(var event in events){
            object.on(event, events[event]);
        }
    }
    const object = { 
        count : 0 
    };
    _.extend(object, Base.Events);
    action(object, {
        'test1' : function(){ object.counter += 1 },
        'test2' : function(){ object.counter - 1 }
    });
    assert.equal(Object.keys(object._events).length, 2, ' 2 Events extended to object');
});
