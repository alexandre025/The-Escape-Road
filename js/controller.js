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
		var href = this.href;
		var splited = href.split('/');
		splited = splited[splited.length-1];
		console.log(splited);
		var direction = this.getAttribute('data-direction');
		if(splited == 'after_intro'){ // If we have the main page
			model.importAfterIntro(function(){
				UI.switchContent(direction);
			});
		}
		else if(splited == 'the_map'){ // If we have the road map
			model.importTheMap(function(){
				UI.switchContent(direction);
			});
		}
		else{ // classical content 
			model.importContent(href,function(){
				UI.switchContent(direction);
				// Here we have to use js for the new loaded page 
			});
		}
		controller.generateAjaxLink();
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