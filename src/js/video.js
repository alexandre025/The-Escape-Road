"use strict";

var video_intro = document.getElementById('video');
var cache_video = document.getElementById('cacheVideo');
var mute = document.getElementById('onOff');
var data = document.getElementsByClassName('event');
var intro = document.getElementById('textIntro');
console.log(data);

video_intro.addEventListener('canplaythrough',loaded,false);
video_intro.addEventListener('timeupdate',progress,false);
mute.addEventListener('click',muted,false);

video_intro.play();

function loaded() {
	video_intro.play();
	mute.classList.add('on');
}


function muted() {
	if(video_intro.muted == false) {
		video_intro.muted = true;
		mute.classList.remove('on');
		mute.classList.add('off');
	}

	else {
		video_intro.muted = false;
		mute.classList.add('on')
		mute.classList.remove('off');
	}
}

function progress() {
	var self = this
	var current_time = Math.round(self.currentTime*100/self.duration);

	for(var i = 0; i < data.length; i++) {
		var data_time =	data[i].getAttribute('data-time');
		var data_int = parseInt(data_time);

		if(data_int == 5 && data_time == current_time) {
			cache_video.classList.add('cacheVideo');
			intro.style.display="block";
			intro.classList.add('textIntro');
		}

	}	
	
}

