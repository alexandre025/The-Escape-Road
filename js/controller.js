'use.strict';

var controller = {

	init : function(){
	
		var roomID;
		model.connect(function(IDReturn){

			roomID = IDReturn;
			console.log(roomID);
		});

		controller.generateAjaxLink();

		// Initialisation de la video
		controller.init_video_intro();
	},

	ajaxLoad : function(e){

		e.preventDefault();
		console.log(e);
		var href = this.href;
		var direction = this.getAttribute('data-direction');
		model.importContent(href,function(){
			UI.switchContent(direction);
			controller.generateAjaxLink();
			// Here we have to use js for the new loaded page 
		});
	},

	generateAjaxLink : function(){
		var a = document.querySelectorAll('a.nextContent');
		console.log(a);
		for (var i = 0; i < a.length; i++) {
			a[i].addEventListener('click',controller.ajaxLoad,false);
		};
	},

	init_video_intro : function(){

	}

};
controller.init();