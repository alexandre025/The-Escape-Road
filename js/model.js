'use.strict';

var model = {

	connect : function(callback){
		this.socket = io.connect('http://alexandre-ferraille.local:3000');

		this.socket.emit('desktop connection');

		this.socket.on('room join',function(IDReturn){
			callback.call(this,IDReturn);
		});
	}	
};