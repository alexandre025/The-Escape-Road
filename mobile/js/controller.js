'use.strict';

var controller = {

	init : function(){

		model.connect();

		var form = document.getElementById('connection');
		form.addEventListener('submit',function(e){
			e.preventDefault();

			model.IDSubmit(function(response){

				if(response == false){
					document.getElementById('roomID').value = '';
					UI.IDError();
				}
				else if (response == true){
					UI.connectionOk();
					controller.startEvents();
				}

			});

		},false);
	},

	startEvents : function(){

		model.newEvent(function(data){
			UI.renderEvent(data);
		});

	}
};
controller.init();