/* */
function Console(){
    this.initialize.apply(this, arguments);
};

Console.prototype.initialize = function(){
    this.output = document.getElementById('consoleOutput');
    this.fragment = document.createDocumentFragment();
};

Console.prototype.print = function(){
    this.fragment.appendChild(document.createTextNode());
    this.fragment.appendChild()
}