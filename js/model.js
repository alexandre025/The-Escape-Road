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
	},

	importTheMap : function(callback){
        var mapStyle = 
		[
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      { "lightness": -100 }
    ]
  },{
    "featureType": "water",
    "elementType": "labels",
    "stylers": [
      { "visibility": "off" }
    ]
  },{
    "featureType": "road",
    "stylers": [
      { "visibility": "off" }
    ]
  },{
    "featureType": "landscape",
    "stylers": [
      { "saturation": -100 }
    ]
  },{
    "featureType": "landscape",
    "stylers": [
      { "visibility": "off" }
    ]
  },{
    "featureType": "administrative.province",
    "stylers": [
      { "visibility": "off" }
    ]
  },{
    "featureType": "poi",
    "stylers": [
      { "visibility": "off" }
    ]
  },{
    "featureType": "administrative",
    "elementType": "geometry.fill",
    "stylers": [
      { "visibility": "off" }
    ]
  },{
  }
		];
		var mapOptions = {
          center: { lat: 17.716116, lng: 8.000741},
          zoom: 3,
          minZoom:2,
          disableDefaultUI: true
        };
        var container = document.createElement('div');
        container.setAttribute('id','map-canvas');
        document.getElementById('nextContent').appendChild(container);
        var map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);
        map.setOptions({styles: mapStyle});

        // SET THE MARKERS HERE 

        callback.call(this);
	},

	importAfterIntro : function(callback){
		// Generate two random number

		var left  = Math.round((Math.random()*10)+1),
			right;
		do{
			right = Math.round((Math.random()*10)+1);
		}while(left == right); 

    var nextContent = document.getElementById('nextContent');
    var container = document.createElement('div').setAttribute('id','left');
    nextContent.appendChild(container);
    container = document.createElement('div').setAttribute('id','right');
    nextContent.appendChild(container);

		var xmlhttp = new XMLHttpRequest();
    var once = true;

  		xmlhttp.onreadystatechange=function(){
	  		if(xmlhttp.readyState==4 && xmlhttp.status==200 && once == true){
	    		document.getElementById('left').innerHTML = xmlhttp.responseText;
          once = false;
	    	}
        else if(xmlhttp.readyState==4 && xmlhttp.status==200 && once == false){
          document.getElementById('right').innerHTML = xmlhttp.responseText;
          once = false;          
        }
    	}
  	
		xmlhttp.open("GET",'inc/left/sk_'+left+'.html',true);
		xmlhttp.send();
		xmlhttp.open("GET",'inc/right/sk_'+right+'.html',true);
		xmlhttp.send();

		callback.call(this);

	}
};