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
    else if(splited == 'support'){
      model.importSupport(function(){
        UI.switchContent(direction);
      });
    }
    else{ // classical content 
      model.importContent(href,function(){
        model.setViewed(href);
        UI.switchContent(direction);
      });
    }
  },
  importSupport : function(callback){
    var xmlhttp = new XMLHttpRequest();

    var container = document.createElement('div');
    container.setAttribute('id','allNodes');
    document.getElementById('nextContent').appendChild(container);
      xmlhttp.onreadystatechange=function(){
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
          { 
            document.getElementById("allNodes").innerHTML = xmlhttp.responseText;
          }
      }
    
    xmlhttp.open("GET",'inc/support.html',true);
    xmlhttp.send();

    callback.call(this);

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
            var nextPrev = document.querySelectorAll('#after_video a.nextContent');
            for (var i = 0; i < nextPrev.length; i++) {
              nextPrev[i].addEventListener('click',model.ajaxLoad,false);
            };
          }
    	}
  	
		xmlhttp.open("GET",href,true);
		xmlhttp.send();

    callback.call(this);
	},

	importTheMap : function(callback){
    var xmlhttp = new XMLHttpRequest();

		var mapOptions = {
      zoom: 3,
      zoomControl: false,
      maxZoom : 4,
      minZoom : 2,
      mapTypeControl: false,
      streetViewControl : false,
      panControl: false,
      center: new google.maps.LatLng(24.071876, 15.441456)
    };
    var container = document.createElement('div');
    var legend = document.createElement('div');
    legend.classList.add('map-legend');
    legend.innerHTML = '<div><img src="img/marker_grey.png"><span>To discover</span></div><div><img src="img/marker_red.png"><span>Already seen</span></div>';

    container.setAttribute('id','allNodes');
    document.getElementById('nextContent').appendChild(container);
    var map = new google.maps.Map(container,mapOptions);
    container.appendChild(legend);

    UI.setMarkers(map,function(marker,href){
      console.log(marker);
      console.log(href);
      google.maps.event.addListener(marker, 'click', function() {
           model.importContent(href,function(){
              model.setViewed(href);
              UI.switchContent('bottom');
           });
      });
    });

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

    video.addEventListener('ended',UI.afterVideo,false);


    video.play();

    function playprogress(self) {
      UI.replayVideo();
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
      video.currentTime=(e.offsetX*video.duration/this.offsetWidth).toPrecision(3);
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

  },
  initLocalStorage : function(){
    for (var i = 1; i < 9; i++) {
      if(!localStorage.getItem(i)){
        localStorage.setItem(i,"no");
      }
    };
  },
  setViewed : function(href){
    var splited = href.split('sk_');
    splited = splited[1];
    console.log(splited);
    splited = splited.split('.');
    splited = splited[0];
    localStorage.setItem(splited,'yes');
  }
};