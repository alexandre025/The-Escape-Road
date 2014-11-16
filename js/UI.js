'use.strict';

var UI = {
	switchContent : function(direction){
		var previous = document.getElementById('activeContent');
		var now = document.getElementById('nextContent');

		if(direction == 'bottom'){
			setTimeout(function(){now.style.cssText = 'opacity:1;-webkit-transition: all 0.5s linear;-moz-transition: all 0.5s linear;-ms-transition: all 0.5s linear;-o-transition: all 0.5s linear;transition: all 0.5s linear;';},1000);
			previous.style.cssText = 'top:100%;-webkit-transition:top 1s;-moz-transition:top 1s;-ms-transition:top 1s;-o-transition:top 1s;transition:top 1s;';
		}
		else if(direction == 'top'){
			setTimeout(function(){now.style.cssText = 'opacity:1;-webkit-transition: all 0.5s linear;-moz-transition: all 0.5s linear;-ms-transition: all 0.5s linear;-o-transition: all 0.5s linear;transition: all 0.5s linear;';},1000);
			previous.style.cssText = 'top:-100%;-webkit-transition:top 1s;-moz-transition:top 1s;-ms-transition:top 1s;-o-transition:top 1s;transition:top 1s;';
		}
		else if(direction == 'left'){
			setTimeout(function(){now.style.cssText = 'opacity:1;-webkit-transition: all 0.5s linear;-moz-transition: all 0.5s linear;-ms-transition: all 0.5s linear;-o-transition: all 0.5s linear;transition: all 0.5s linear;';},1000);
			previous.style.cssText = 'left:100%;-webkit-transition:left 1s;-moz-transition:left 1s;-ms-transition:left 1s;-o-transition:left 1s;transition:left 1s;';
		}
		else if(direction == 'right'){
			setTimeout(function(){now.style.cssText = 'opacity:1;-webkit-transition: all 0.5s linear;-moz-transition: all 0.5s linear;-ms-transition: all 0.5s linear;-o-transition: all 0.5s linear;transition: all 0.5s linear;';},1000);
			previous.style.cssText = 'left:-100%;-webkit-transition:left 1s;-moz-transition:left 1s;-ms-transition:left 1s;-o-transition:left 1s;transition:left 1s;';
		}

		setTimeout(function(){
			var nextContent = document.createElement('div');
          	nextContent.setAttribute('id','nextContent');
          	document.body.appendChild(nextContent);

			previous.remove();
			previous.style.cssText = '';
			previous.innerHTML = '';
			now.id = 'activeContent';
			now.style.cssText = '';
			console.log('transition');

		},1500);
	},
	showNavBar : function(){
		var nav = document.getElementById('menu-toggle');
		nav.style.cssText = 'opacity:1;-webkit-transition: all 1.5s linear;-moz-transition: all 1.5s linear;-ms-transition: all 1.5s linear;-o-transition: all 1.5s linear;transition: all 1.5s linear;';
		setTimeout(function(){
			nav.style.cssText='';
		},1500);
	}
};