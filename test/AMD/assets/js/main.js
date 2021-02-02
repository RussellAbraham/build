require.config({
	baseUrl: "",
	paths: {
		jquery: "https://assets.codepen.io/1674766/jquery.min",
		bootstrap: "https://assets.codepen.io/1674766/bootstrap.bundle.min",
		underscore: "https://assets.codepen.io/1674766/underscore.min",
		backbone: "https://assets.codepen.io/1674766/backbone.min",
		text: "https://assets.codepen.io/1674766/text",
		link: "https://assets.codepen.io/1674766/link"
	}
});

require(["backbone", "bootstrap", "assets/js/routes/router"], function (Backbone) {
	window.router = new Router();
	Backbone.history.start();
});
