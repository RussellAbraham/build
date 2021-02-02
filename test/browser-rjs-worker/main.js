define(['lib/sync','lib/model','lib/template','lib/view','lib/controller'],function (Sync,Model,Template,View,Controller) {
	
	function Main(name){
		this.sync = new Sync(name);
		this.model = new Model(this.sync);
		this.template = new Template();
		this.view = new View(this.template);
		this.controller = new Controller(this.model,this.view);
	};
	
	this.main = new Main('Build');
	
});