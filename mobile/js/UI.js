'use.strict';

var UI = {

	IDError : function(){
		var roomInfo = document.getElementById('content');
		roomInfo.innerHTML = 'Wrong ID :(';
		UI.navVibration(500);
	},
	connectionOk : function(){
		var connectBox = document.getElementById('connect');
		connectBox.style.cssText='opacity:0;z-index:-999;position:absolute;';
		document.getElementById('content').innerHTML = 'Play a video to get exclussive content';
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