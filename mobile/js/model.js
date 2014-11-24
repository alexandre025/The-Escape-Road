'use.strict';

var model = {

	connect : function(callback){
		this.socket = io.connect('http://alexandre-ferraille.local:3000');
	},	
	IDSubmit : function(callback){
		var roomID = document.getElementById('roomID').value;
		model.socket.emit('mobile connection',roomID);

		model.socket.on('wrong roomID',function(){
			callback.call(this,false);
		});
		model.socket.on('room join',function(){
			callback.call(this,true);
		});

	},
	newEvent : function(callback){
		model.socket.on('desktop event',function(data){
			callback.call(this,data);
		});
	},

	maxLengthCheck : function(object) {
		if (object.value.length > object.maxLength) {
			object.value = object.value.slice(0, object.maxLength);
		}
	}	
};
