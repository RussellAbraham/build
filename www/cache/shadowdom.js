(function (modules) {

    var parent, child, clone, collapse, expand;

    DocumentFragment.prototype.append = function (element) {
        return this.appendChild(element);
    }

    DocumentFragment.prototype.render = function (target) {
        return target.appendChild(this);
    }

    DocumentFragment.prototype.$ = function (element, scope) {
        return this.querySelector(element || scope);
    }

    DocumentFragment.prototype.$$ = function (element, scope) {
        return this.querySelectorAll(element || scope);
    }

    const fragment = new DocumentFragment();

    const template = document.getElementById('template');

    function Template(lists) {

        var self = this;

        self.lists = lists;
        self.index = 0;

        var i, len = self.lists.length;

        var buffer = [];

        // better performance

        for (var i = len - 1; i >= 0; i--) {
            // attach custom properties to the objects pushed
            buffer.push(self.lists[i]);
        }
        var j, blen = buffer.length;
        for (var j = blen - 1; j >= 0; j--) {
            // pop the objects off and attach event listeners
            console.log(buffer[j])
        }


        for (i = 0; i < len; i++) {
            clone = template.content.cloneNode(true);
            parent = clone.querySelectorAll('.list');
            child = clone.querySelectorAll('.link');
            collapse = clone.querySelectorAll('.collapse');
            parent[0].id = 'list' + i;
            child[0].id = 'link' + i;
            child[0].textContent = self.lists[i].name;
            child[0].setAttribute('data-target', '#collapse' + i);
            child[0].setAttribute('aria-controls', 'collapse' + i);
            collapse[0].id = 'collapse' + i;
            collapse[0].querySelector('.code').textContent = self.lists[i].content;
            fragment.append(clone);
        }

        fragment.$$('.collapse .list-group-item').forEach(function (list) {
            list.addEventListener('click', function (event) {
                console.log(event.target.parentNode);
                this.contentEditable = true;
            });
        });

    }

    Template.prototype.render = function () {
        fragment.render(template.parentNode);
    }

    modules['exports'] = function () {
        return {
            Template: Template
        }
    }

    // export all methods under 'object' namespace
    if (typeof window !== 'undefined') {
        window.modules = modules.exports();
    }

})({});

const list = new modules.Template([{
        name: 'Entry 1',
        content: 'Here Document'
    },
    {
        name: 'Entry 2',
        content: 'Here Document'
    },
    {
        name: 'Entry 3',
        content: 'Here Document'
    },
    {
        name: 'Entry 4',
        content: 'Here Document'
    },
    {
        name: 'Entry 5',
        content: 'Here Document'
    }
]);

list.render();


function log(string) {
    const shard = document.createDocumentFragment();
    shard.appendChild(document.createTextNode(string));
    shard.appendChild(document.createElement('br'));
    document.querySelector('#log .code').appendChild(shard);
}