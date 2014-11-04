'use.strict';

var UI = {
	switchContent : function(direction){
		var previous = document.getElementById('activeContent');
		var now = document.getElementById('nextContent');

		if(direction == 'bottom'){
			now.classList.add('initial_bottom');
			now.style.cssText = 'top:0px;transition:top 2.5s;';
			previous.style.cssText = 'top:100%;transition:top 2.5s;';
		}
		else if(direction == 'top'){
			now.classList.add('initial_top');
			now.style.cssText = 'top:0px;transition:top 2.5s;';
			previous.style.cssText = 'top:-100%;transition:top 2.5s;';
		}
		else if(direction == 'left'){
			now.classList.add('initial_left');
			now.style.cssText = 'left:0px;transition:all 2.5s;';
			previous.style.cssText = 'left:100%;transition:all 2.5s;';
		}
		else if(direction == 'right'){
			now.classList.add('initial_right');
			now.style.cssText = 'left:0px;transition:left 2.5s;';
			previous.style.cssText = 'left:-100%;transition:left 2.5s;';
		}
/*
		setTimeout(function(){
			previous.remove();
			now.id = 'activeContent';
			now.style.cssText = '';

		},1000);

*/
	}
};