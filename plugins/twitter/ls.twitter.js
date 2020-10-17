
goog.module('third_party.lazysizes.twitter');
const lazySizes = goog.require('third_party.lazysizes');


var scriptadded;

function loadExecuteTwitter(){
	if(window.twttr && twttr.widgets){
		twttr.widgets.load();
		return;
	}

	if(scriptadded){
		return;
	}

	var elem = document.createElement('script');
	var insertElem = document.getElementsByTagName('script')[0];

	elem.src = '//platform.twitter.com/widgets.js';

	scriptadded = true;
	insertElem.parentNode.insertBefore(elem, insertElem);
}

document.addEventListener('lazybeforeunveil', function(e){
	if(e.detail.instance != lazySizes){return;}

	var twttrWidget = e.target.getAttribute('data-twitter');

	if(twttrWidget){
		lazySizes.aC(e.target, twttrWidget);
		loadExecuteTwitter();
	}
});
