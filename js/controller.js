'use.strict';

var controller = {

	init : function(){

		var roomID;
		model.connect(function(IDReturn){

			roomID = IDReturn;
			console.log(roomID);
		});
	}
};
controller.init();