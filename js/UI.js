'use.strict';

var UI = {
	switchContent : function(direction){
		var previous = document.getElementById('activeContent');
		var now = document.getElementById('nextContent');

		if(direction == 'bottom'){
			setTimeout(function(){now.style.cssText = 'opacity:1;transition:all 0.5s';},1000);
			previous.style.cssText = 'top:100%;transition:top 1s;';
		}
		else if(direction == 'top'){
			setTimeout(function(){now.style.cssText = 'opacity:1;transition:all 0.5s';},1000);
			previous.style.cssText = 'top:-100%;transition:top 1s;';
		}
		else if(direction == 'left'){
			setTimeout(function(){now.style.cssText = 'opacity:1;transition:all 0.5s';},1000);
			previous.style.cssText = 'left:100%;transition:left 1s;';
		}
		else if(direction == 'right'){
			setTimeout(function(){now.style.cssText = 'opacity:1;transition:all 0.5s';},1000);
			previous.style.cssText = 'left:-100%;transition:left 1s;';
		}

		setTimeout(function(){
			var nextContent = document.createElement('div');
          	nextContent.setAttribute('id','nextContent');
          	document.body.appendChild(nextContent);

			previous.remove();
			previous.style.cssText = '';
			previous.innerHTML = '';
			now.id = 'activeContent';
			now.classList.remove('initial_'+direction);
			now.style.cssText = '';

			console.log('transition');

		},1500);
	},
	showNavBar : function(){
		var nav = document.getElementById('menu-toggle');
		nav.style.cssText = 'opacity:1;transition:all 1.5s';
		setTimeout(function(){
			nav.style.cssText='';
		},1500);
	}
};