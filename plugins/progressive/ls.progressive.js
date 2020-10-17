
goog.module('third_party.lazysizes.progressive');
const lazySizes = goog.require('third_party.lazysizes');


var regImg, onLoad;

if('srcset' in document.createElement('img')){
	regImg = /^img$/i;

	onLoad = function(e){
		e.target.style.backgroundSize = '';
		e.target.style.backgroundImage = '';
		e.target.removeEventListener(e.type, onLoad);
	};

	document.addEventListener('lazybeforeunveil', function(e){
		if(e.detail.instance != lazySizes){return;}

		var img = e.target;
		if(!regImg.test(img.nodeName)){
			return;
		}
		var src = img.getAttribute('src');
		if(src) {
			img.style.backgroundSize = '100% 100%';
			img.style.backgroundImage = 'url(' + src + ')';
			img.removeAttribute('src');
			img.addEventListener('load', onLoad);
		}
	}, false);
}
