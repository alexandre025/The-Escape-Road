'use.strict';

var model = {

	connect : function(callback){
		this.socket = io.connect('http://alexandre-ferraille.local:3000');

		this.socket.emit('desktop connection');

		this.socket.on('room join',function(IDReturn){
			callback.call(this,IDReturn);
		});
	},

  ajaxLoad : function(e){

    UI.showNavBar();
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
  },

	importContent : function(href,callback){
		var xmlhttp = new XMLHttpRequest();

  		xmlhttp.onreadystatechange=function(){
	  		if (xmlhttp.readyState==4 && xmlhttp.status==200)
	    	  { document.getElementById("nextContent").innerHTML = xmlhttp.responseText; }
    	}
  	
		xmlhttp.open("GET",href,true);
		xmlhttp.send();

    callback.call(this);
	},

	importTheMap : function(callback){
        var xmlhttp = new XMLHttpRequest();

		var mapOptions = {
          center: { lat: 17.716116, lng: 8.000741},
          zoom: 3,
          minZoom:2,
          disableDefaultUI: true
    };
    var container = document.createElement('div');
    container.setAttribute('id','map-canvas');
    document.getElementById('nextContent').appendChild(container);
    var map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);
    // SET THE MARKERS HERE 
    markers = new Array();
    markers[0] = new google.maps.Marker({map:map,position: google.maps.LatLng(0,0)});

    xmlhttp.onreadystatechange=function(){
      if (xmlhttp.readyState==4 && xmlhttp.status==200)
        { 
          var mapStyle =  xmlhttp.response; 
          map.setOptions({styles: mapStyle});
        }
      }
    xmlhttp.open("GET",'js/map_settings.json',true);
    xmlhttp.responseType = 'json';
    xmlhttp.send();

    callback.call(this);
	},

	importAfterIntro : function(callback){
		// Generate two random number

		var left  = Math.round((Math.random()*7)+1),
			right;
		do{
			right = Math.round((Math.random()*7)+1);
		}while(left == right); 
    console.log(left+' '+right);

    var nextContent = document.getElementById('nextContent');
    console.log(nextContent);
    var container = document.createElement('div');
    container.setAttribute('id','left');
    nextContent.appendChild(container);
    container = document.createElement('div');
    container.setAttribute('id','right');
    nextContent.appendChild(container);
    console.log(container);

		var xmlhttp_left = new XMLHttpRequest();
    var xmlhttp_right = new XMLHttpRequest();

  		xmlhttp_left.onreadystatechange=function(){
	  		if(xmlhttp_left.readyState==4 && xmlhttp_left.status==200){
          document.getElementById("left").innerHTML = xmlhttp_left.responseText;
          document.querySelector('.bg-choice a').addEventListener('click',model.ajaxLoad,false);

        }
    	}
      xmlhttp_right.onreadystatechange=function(){
        if(xmlhttp_right.readyState==4 && xmlhttp_right.status==200){
          document.getElementById("right").innerHTML = xmlhttp_right.responseText;
          document.querySelector('.bg-choice > a').addEventListener('click',model.ajaxLoad,false);
        }
      }
  	
		xmlhttp_left.open("GET",'inc/left/left_sk_1.html',true);
		xmlhttp_left.send();
		xmlhttp_right.open("GET",'inc/right/right_sk_1.html',true);
		xmlhttp_right.send();

    var bgChoice = document.querySelectorAll('.bg-choice a');
    var choice = document.getElementById('choice');
    console.log(bgChoice);

    for (var i = 0; i < bgChoice.length; i++) {
      bgChoice[i].addEventListener('mouseover',bgChoiceMouseover,false);
      bgChoice[i].addEventListener('mouseleave',bgChoiceMouseleave,false);
    };
    function bgChoiceMouseover(){
      this.parentNode.classList.add('zoom-bg');
    }
    function bgChoiceMouseleave(){
      this.parentNode.classList.remove('zoom-bg');
    }

		callback.call(this);

	},
  toggleIoInfo : function(callback){
    var ioInfoBox = document.getElementById('io-info');
    if(ioInfoBox.style.opacity == 0){
      ioInfoBox.style.opacity='1';
      ioInfoBox.style.zIndex='999';
    }
    else{
      ioInfoBox.style.opacity='0';
      ioInfoBox.style.zIndex='-999';      
    }
    callback.call(this);
  }
};