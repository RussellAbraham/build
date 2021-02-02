define(['lib/model','lib/view'],function (Model,View) {
	
	function Controller(model, view){
		var self = this;
		self.model = model;
		self.view = view;
	};	
	
	return Controller;
	
});