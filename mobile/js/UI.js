'use.strict';

var UI = {

	IDError : function(){
		var roomInfo = document.getElementById('content');
		roomInfo.innerHTML = 'Wrong ID';
		UI.navVibration(500);
	},
	connectionOk : function(){
		document.getElementById('content').innerHTML = 'Good ID';
		UI.navVibration(500);
	},
	renderEvent : function(data){
		console.log(data);
		document.getElementById('content').innerHTML = data;
		UI.navVibration(500);
	},
	navVibration : function(time){
		if(window.navigator.vibrate){
			navigator.vibrate(time);
		}
	}
};