'use.strict';

var model = {

	connect : function(callback){
		this.socket = io.connect('http://alexandre-ferraille.local:3000');

		this.socket.emit('desktop connection');

		this.socket.on('room join',function(IDReturn){
			callback.call(this,IDReturn);
		});
	},

	importContent : function(href,callback){
		var xmlhttp = new XMLHttpRequest();

  		xmlhttp.onreadystatechange=function(){
	  		if (xmlhttp.readyState==4 && xmlhttp.status==200)
	    	{
	    		document.getElementById("nextContent").innerHTML = xmlhttp.responseText;
	    		callback.call(this);
	    	}
    	}
  	
		xmlhttp.open("GET",href,true);
		xmlhttp.send();
	}

	
};