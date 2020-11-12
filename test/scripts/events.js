function action(object, events){
    for(var event in events){
        object.on(event, events[event]);
    }
}

function trigger(object, events){
    for(var event in events){
        object.trigger(event, events[event]);
    }
}

function listen(object, events){
    for(var event in events){
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
        'event' : function(){
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



/* exec('Hello World');

action(object, {
    'alert' : function(message){ alert(message); },
    'confirm' : function(message){ var check = confirm(message); return console.log(check); },
    'prompt' : function(message){ var check = prompt(message); return console.log(check); }
});

function exec(id,string){
    switch(id){
        case 'alert' : trigger(object, { 'alert' : string }); break;
        case 'confirm' : trigger(object, { 'confirm' : string }); break;
        case 'prompt' : trigger(object, { 'prompt' : string }); break;
    }
}
*/