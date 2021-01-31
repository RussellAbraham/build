(function(object){

	function set(cname, cvalue, exdays){
		var d = new Date();
		d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
		var expires = "expires=" + d.toUTCString();
		document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";	
	}

	object.set = function(cname, cvalue, exdays){ return set(cname, cvalue, exdays); },

	function get(cname){
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for (var i = 0; i < ca.length; i++) {
		  var c = ca[i];
		  while (c.charAt(0) == ' ') {
			c = c.substring(1);
		  }
		  if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		  }
		}
		return "";		
	}

	object.get = function(cname){ return get(cname); },

	function check(){
		var user = browser.cookies.get("username");
		if (user != "") {
			alert("Welcome again " + user);
		} else {
			user = prompt("Please enter your name:", "");
			if (user != "" && user != null) {
				browser.cookies.set("username", user, 365);
			}
		}		
	}

	object.check = function(){ return check(); }

	return object;

})(browser.cookies);