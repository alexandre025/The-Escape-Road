'use.strict';

var server = {

	init : function(){

		this.io = require('socket.io').listen(3000);
		console.log('Server listen on *: 3000');
		this.io.on('connection',this.listen);

		this.roomList = new Array();

	},

	listen : function(socket){

		socket.on('desktop connection',function(){
			var roomID = 0000, 
				unique = true;

			do{ // Generate a unique roomID
				roomID = Math.round(Math.random()*999) + Math.round((Math.random()*8)+1)*1000; 
				for (var i = 0; i < server.roomList.length; i++){
					if(server.roomList[i] == roomID){
						unique = false;
					} 
				};
			}while(!unique);
			server.roomList.push(roomID);
			socket.join(roomID);
			console.log('New room ID :'+server.roomList);
			socket.emit('room join',roomID); // Communicate the room ID to the desktop
		});

		socket.on('desktop event',function(data){

		});

	}
};
server.init();