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
        if(firstTime){
          setTimeout(function(){
            UI.toggleIoInfo();
          },1000);
          firstTime=false;
        }
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

		var mapOptions = { // Set des maps 
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
		
    // Generation de deux random number
		var left  = Math.round((Math.random()*3)+1), 
			right;
		do{
			right = Math.round((Math.random()*3)+1);
		}while(left == right); 
    console.log(left+' '+right);

    var nextContent = document.getElementById('nextContent'); // Selection et création des nouveaux conteneurs
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
  	
    //Double appel ajax pour les deux skateurs
		xmlhttp_left.open("GET",'inc/left/sk_'+left+'.html',true);
		xmlhttp_left.send();
		xmlhttp_right.open("GET",'inc/right/sk_'+right+'.html',true);
		xmlhttp_right.send();

    function allEvent(){ // Ajout des événements sur les nouveau élements 
      var a = document.querySelectorAll('.bg-choice a');
      var choice = document.querySelectorAll('.bg-choice');

      for (var i = 0; i < choice.length; i++) {
        choice[i].addEventListener('mouseover',bgChoiceMouseover,false);
        choice[i].addEventListener('mouseleave',bgChoiceMouseleave,false);
        a[i].addEventListener('click',model.ajaxLoad,false);
      };
      function bgChoiceMouseover(){
        this.classList.add('zoom-bg');
      }
      function bgChoiceMouseleave(){
        this.classList.remove('zoom-bg');
      }
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
    var playerReplay = document.querySelector('.playerReplay');

    playerReplay.addEventListener('click',function(event){
      event.preventDefault();
      video.play();
      UI.replayVideo();
    },false);

    // On écoute l'évènement de playPause et de Mute.
    playerMute.addEventListener('click',playerMuted,false);
    play.addEventListener('click',playPause,false);

    // On initialise theLast à 0.
    var theLast = 0;
    video.addEventListener('timeupdate',function(){
      playprogress(this);
    },false);
    progress_bar.addEventListener('click',setVideoTime,false);

    video.addEventListener('ended',UI.afterVideo,false);

    video.play();

    function playprogress(self) {
      UI.replayVideo();

      // Evolution de la progress bar.
      var progress=self.currentTime*100/self.duration;
      document.querySelector('.progress').style.width=progress+'%';

      // Transformation du format secondes en minutes : secondes
      var minutes = Math.floor(video.duration/60);
      var sec = Math.round(video.duration - (minutes * 60));
      if(sec<10){sec = '0'+sec;}
      total_time.innerHTML = minutes+':'+sec;

      minutes = Math.floor(video.currentTime/60);
      sec = Math.round(video.currentTime - (minutes * 60));
      if(sec<10){sec = '0'+sec;}
      current_time.innerHTML = minutes+':'+sec;

      // Arrondi du moment X de la vidéo
      var current = Math.round(video.currentTime);

      // récupération des span contenant le data-time, visible dans la progress bar.
      var data = document.querySelectorAll('#dot span'); 

      // Parcours de toute les span
      for(var i = 0; i < data.length; i++) {
        // Récupération de l'attribut data-time.
        var data_time = data[i].getAttribute('data-time');

        // Ajout et placement des losanges en fonction du data-time indiqué.
        var dot = Math.round(data_time*100/self.duration);
        data[i].classList.add('positionAction');
        data[i].style.left=dot+'%';

        // Stop la propagation pour empêcher de revenir au début de la vidéo au clic sur un dot.
        data[i].addEventListener('click',function(e) {
          e.stopPropagation();
        },false);

        // Si le temps de la video est égale au data-time..
        if(data_time == current && theLast != dot) {

          console.log(dot+' '+theLast);
          theLast = dot;
          // on push l'élement sur le mobile.
          socket.emit('desktop event',data[i].innerHTML);
          UI.bounce();
        }
      }
    }

    function setVideoTime(e) {
      e.stopPropagation();
      video.play();
      video.currentTime=(e.offsetX*video.duration/this.offsetWidth).toPrecision(3);
    }


    // Set de la fonction Play/Pause
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

    // Set de la fonction MuteOn/muteOff
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
      if(!localStorage.getItem(i)){ // Si les keys n'existent pas déjà
        localStorage.setItem(i,"no");
      }
    };
  },
  setViewed : function(href){ // La vidéo vient d'être vue, modification du localStorage
    var splited = href.split('sk_');
    splited = splited[1];
    console.log(splited);
    splited = splited.split('.');
    splited = splited[0];
    localStorage.setItem(splited,'yes');
  }
};