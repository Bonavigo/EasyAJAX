document.addEventListener('DOMContentLoaded', function() {
	var elems = document.querySelectorAll('select');
	var instances = M.FormSelect.init(elems);
	document.getElementById("year").innerHTML = new Date().getFullYear();
});
function verify_enter (event, nick) {
	var key = event.which || event.keyCode;
	if (key == 13) {
		search(nick);
	}	
}
function motto(motto) {
	motto = motto.replaceAll("†", "💣");
	motto = motto.replaceAll("µ", "☕");
	motto = motto.replaceAll("ª", "💀");
	motto = motto.replaceAll("‡", "🚫");
	motto = motto.replaceAll("•", "👍");
	motto = motto.replaceAll("ƒ", "❤️");
	motto = motto.replaceAll("|", "🤍");
	motto = motto.replaceAll("»", "♣");
	motto = motto.replaceAll("º", "⚡");
	motto = motto.replaceAll("¶", "💡");
	motto = motto.replaceAll("‘", "🔒");
	motto = motto.replaceAll("—", "🎵");
	motto = motto.replaceAll("¥", "⭐");
	return motto;
}
function search(nick) {
	document.getElementById("result").style.display = "none";
	document.getElementById("error").style.display = "none";
	document.getElementById("loading").style.display = "block";
	input = document.getElementById("input_search");
	if (typeof nick === null) {	
	} else {
		nick = document.getElementById("input_search").value;
	}
	input.setAttribute("disabled", "disabled");
	hotel = document.getElementById("hotel").value;
	var success = function change_data(response) {
		response = JSON.parse(response);
		let timestamp = Date.parse(response.memberSince);
		let date = new Date(timestamp);
		date = date.toLocaleString();
		document.getElementById("image_result").src = "https://www.habbo"+hotel+"/habbo-imaging/avatarimage?figure="+response.figureString+"&head_direction=3&size=m";
		document.getElementById("nickname_result").innerHTML = response.name;
		document.getElementById("motto_result").innerHTML = motto(response.motto);
		document.getElementById("creation_result").innerHTML = date;
		document.getElementById("loading").style.display = "none";
		document.getElementById("result").style.display = "block";
		input.removeAttribute("disabled");
	}
	var error = function error() {
		document.getElementById("loading").style.display = "none";
		document.getElementById("result").style.display = "none";
		document.getElementById("error").style.display = "block";
		input.removeAttribute("disabled");
	}
	var url = "https://www.habbo"+hotel+"/api/public/users?name="+nick;
	easyAJAX.GET(url, success, error);
}