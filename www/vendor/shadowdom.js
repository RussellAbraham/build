/* Shadow DOM : Fragment Object and <template> CloneNode  */

DocumentFragment.prototype.create = function(element, scope){
    return (this || scope).appendChild(document.createElement(element));
}

DocumentFragment.prototype.append = function(element, scope){
    return (this || scope).appendChild(element);
}

DocumentFragment.prototype.remove = function(element, scope){
    return (this || scope).removeChild(element);
}

DocumentFragment.prototype.render = function(target, scope){
    return target.appendChild(this || scope);
}

function Render(){
    this.fragment = new DocumentFragment();
}

/* <template></template> */

function Template(array){
    
    var self = this;
    self.array = array;
    self.index = 0;
    
    // reverse loop and clone each
    for (var i = len - 1; i >= 0; i--) {
        clone = template.content.cloneNode(true);
    }

    // reverse again, reorder and render to object fragment
    for (var i = len - 1; i >= 0; i--) {

    }

    // render the array template

}
