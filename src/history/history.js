(function () {
	// head
	// import { Base }
})(function () {
	// body

	function History() {
		this.handlers = [];
		if (typeof window !== "undefined") {
			this.location = window.location;
			this.history = window.history;
		} else if ("importScripts" in self) {
			this.location = self.location;
			// state
		}
	}

	History.started = false;
	// exports = Base.Router;

	return History;
});
