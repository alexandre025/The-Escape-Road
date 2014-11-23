'use.strict';

var controller = {

	init : function(){
	
		model.connect(function(IDReturn){

			roomID = IDReturn;
			document.getElementsByClassName('io-channel')[0].innerHTML = roomID;
			document.getElementsByClassName('io-number')[0].innerHTML = roomID;
			console.log('Desktop connected to private room number : '+roomID);
		});

		model.initLocalStorage();
		controller.generateAjaxLink();
		controller.initMenu();
		controller.initIoInfo();
		// Initialisation de la video
		controller.init_video_intro();
	},

	generateAjaxLink : function(){
		var a = document.getElementsByClassName('nextContent');
		for (var i = 0; i < a.length; i++) {
			a[i].addEventListener('click',model.ajaxLoad,false);
			console.log(a[i]);
		};
	},

	init_video_intro : function(){ // Non MVC
		var video_intro = document.getElementById('video_intro');
		var cache_video = document.getElementById('cacheVideo');
		var mute = document.getElementById('onOff');
		var intro = document.getElementById('textIntro');


		video_intro.addEventListener('canplaythrough',loaded,false);
		video_intro.addEventListener('timeupdate',progress,false);
		video_intro.addEventListener('ended',restart,false);
		mute.addEventListener('click',muted,false);

		video_intro.play();

		function loaded() {
			video_intro.play();
			video_intro.muted = false;
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
		 		mute.classList.add('on');
		 		mute.classList.remove('off');
		 	}
		 }

		function progress() {
			var self = this
			var current_time = Math.round(self.currentTime*100/self.duration);


			if(current_time == 1) {
				cache_video.classList.add('cacheVideo');
				intro.style.display="block";
				intro.classList.add('textIntro');
				video_intro.removeEventListener('timeupdate',progress,false);
			}	
			
		}

		function restart(){
			video_intro.play();
			if(video_intro.muted == false){
				video_intro.muted = true;
				mute.classList.remove('on');
				mute.classList.add('off');
			}
		}
	},
	initMenu : function(){ // Non MVC
		var menuAll = document.getElementById('menu-all');		
		var menuIcon = document.getElementById('menu-icon');
		var menuList = document.getElementsByClassName('menu-items')[0];

		menuAll.addEventListener('mouseover',function(){
			menuIcon.classList.toggle('menu-hover');
		},false);
		menuAll.addEventListener('mouseout',function(){
			menuIcon.classList.toggle('menu-hover');
		},false);

		menuAll.addEventListener('click',function(){
			menuIcon.classList.toggle('menu-on');
			menuList.classList.toggle('menu-off');
		},false);
	},
	initIoInfo : function(){
		var ioConnect = document.getElementById('io-connect');
		var ioChannel = document.getElementsByClassName('io-channel')[0];
		var ioIcon = document.getElementById('io-icon');
		ioConnect.addEventListener('mouseover',function(){
			ioChannel.style.cssText='opacity:1;';
		},false);
		ioConnect.addEventListener('mouseout',function(){
			ioChannel.style.cssText='';
		},false);
		ioConnect.addEventListener('click',function(evt){
			evt.preventDefault();
			model.toggleIoInfo(function(){

			});
		},false);
		ioIcon.addEventListener('click',function(evt){
			evt.preventDefault();
			model.toggleIoInfo(function(){

			});
		},false);
	}


};
var socket,roomID;
controller.init();