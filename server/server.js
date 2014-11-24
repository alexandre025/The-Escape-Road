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
			socket.roomID = roomID;
			socket.join(roomID+'');
			console.log('New room ID : '+roomID);
			socket.emit('room join',roomID); // Communicate the room ID to the desktop
		});

		socket.on('mobile connection',function(roomID){
			console.log('Try to connect a mobile to : '+roomID);
			var idOK = false;
			for (var i = 0; i < server.roomList.length && idOK == false; i++) {
				if(server.roomList[i] == roomID){
					socket.join(roomID+'');
					socket.emit('room join');
					idOK = true;
					console.log('... SUCCESFULL !!');
				}
				console.log('error');
			};
			if(idOK==false){
				socket.emit('wrong roomID');
				console.log('... ERROR !!');
			}
		});

		socket.on('desktop event',function(data){
			console.log(data);
			server.io.to(socket.roomID).emit('desktop event',data);
		});

		socket.on('disconnect',function(){

		});

	}
};
server.init();