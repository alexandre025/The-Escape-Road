'use.strict';

var model = {

	connect : function(callback){
		socket = io.connect('http://alexandre-ferraille.local:3000');

		socket.emit('desktop connection');

		socket.on('room join',function(IDReturn){
			callback.call(this,IDReturn);
		});
	},

  ajaxLoad : function(e){

    UI.showNavBar();
    e.preventDefault();

    var video = document.querySelector('video');
    if(video){ 
      video.pause(); 
    }
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

    var container = document.createElement('div');
    container.setAttribute('id','allNodes');
    document.getElementById('nextContent').appendChild(container);
  		xmlhttp.onreadystatechange=function(){
	  		if (xmlhttp.readyState==4 && xmlhttp.status==200)
	    	  { 
            document.getElementById("allNodes").innerHTML = xmlhttp.responseText;
            model.docuPlayer();
          }
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
    container.setAttribute('id','allNodes');
    document.getElementById('nextContent').appendChild(container);
    var map = new google.maps.Map(document.getElementById('allNodes'),mapOptions);
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

		var left  = Math.round((Math.random()*3)+1),
			right;
		do{
			right = Math.round((Math.random()*3)+1);
		}while(left == right); 
    console.log(left+' '+right);

    var nextContent = document.getElementById('nextContent');
    var div = document.createElement('div');
    div.setAttribute('id','allNodes');
    nextContent.appendChild(div);

    var container = document.createElement('div');
    container.setAttribute('id','left');
    div.appendChild(container);

    container = document.createElement('div');
    container.setAttribute('id','right');
    div.appendChild(container);

		var xmlhttp_left = new XMLHttpRequest();
    var xmlhttp_right = new XMLHttpRequest();

  		xmlhttp_left.onreadystatechange=function(){
	  		if(xmlhttp_left.readyState==4 && xmlhttp_left.status==200){
          document.getElementById("left").innerHTML = xmlhttp_left.responseText;
          allEvent();
        }
    	}
      xmlhttp_right.onreadystatechange=function(){
        if(xmlhttp_right.readyState==4 && xmlhttp_right.status==200){
          document.getElementById("right").innerHTML = xmlhttp_right.responseText;
          allEvent();
        }
      }
  	
		xmlhttp_left.open("GET",'inc/left/sk_'+left+'.html',true);
		xmlhttp_left.send();
		xmlhttp_right.open("GET",'inc/right/sk_'+right+'.html',true);
		xmlhttp_right.send();

    function allEvent(){
      var bgChoice = document.querySelectorAll('.bg-choice a');
      var choice = document.getElementById('choice');

      for (var i = 0; i < bgChoice.length; i++) {
        bgChoice[i].addEventListener('mouseover',bgChoiceMouseover,false);
        bgChoice[i].addEventListener('mouseleave',bgChoiceMouseleave,false);
        bgChoice[i].addEventListener('click',model.ajaxLoad,false);
      };
      function bgChoiceMouseover(){
        this.parentNode.classList.add('zoom-bg');
      }
      function bgChoiceMouseleave(){
        this.parentNode.classList.remove('zoom-bg');
      }
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
  },

  docuPlayer : function(){
    var video = document.getElementById('videoSkater');
    var progress_bar = document.getElementById('progressBar');
    var current_time = document.getElementById('current');
    var total_time = document.getElementById('total');
    var play = document.getElementById('playPause');
    var playerMute = document.getElementById('playerOnOff');


    playerMute.addEventListener('click',playerMuted,false);
    play.addEventListener('click',playPause,false);

    var theLast = 0;
    video.addEventListener('timeupdate',function(){
      playprogress(this);
    },false);
    progress_bar.addEventListener('click',setVideoTime,false);


    video.play();

    function playprogress(self) {
      var progress=self.currentTime*100/self.duration;
      document.querySelector('.progress').style.width=progress+'%';

      current_time.innerHTML = Math.round(video.currentTime);
      total_time.innerHTML = Math.round(video.duration);

      var current = Math.round(video.currentTime);
      var data = document.querySelectorAll('#dot span'); 

      for(var i = 0; i < data.length; i++) {
        var data_time = data[i].getAttribute('data-time');
        var dot = Math.round(data_time*100/self.duration);

        data[i].classList.add('positionAction');
        data[i].style.left=dot+'%';

        if(data_time == current && theLast != dot) { // 

          console.log(dot+' '+theLast);
          theLast = dot;
          socket.emit('desktop event',data[i].innerHTML);
          // 
        }
      }
    }

    function setVideoTime(e) {
      e.stopPropagation();
      video.play();
      video.currentTime=e.offsetX*video.duration/this.offsetWidth;
    }

    function playPause() {
      if(video.paused) {
        video.play();
        play.classList.add('play');
        play.classList.remove('pause');
      }
      else {
        video.pause();
        play.classList.add('pause');
        play.classList.remove('play');
      }
    }

    function playerMuted() {
      if(video.muted == false) {
        video.muted = true;
        playerMute.classList.remove('playerOn');
        playerMute.classList.add('playerOff');
      }

      else {
        video.muted = false;
        playerMute.classList.add('playerOn');
        playerMute.classList.remove('playerOff');
      }
    }

  }// END
};