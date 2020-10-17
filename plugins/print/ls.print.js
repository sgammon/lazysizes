
goog.module('third_party.lazysizes.print');
const lazySizes = goog.require('third_party.lazysizes');


var config, elements, onprint, printMedia;
// see also: http://tjvantoll.com/2012/06/15/detecting-print-requests-with-javascript/
if(window.addEventListener){
	config = lazySizes && lazySizes.cfg;
	elements = config.lazyClass || 'lazyload';
	onprint = function(){
		var i, len;
		if(typeof elements == 'string'){
			elements = document.getElementsByClassName(elements);
		}

		if(lazySizes){
			for(i = 0, len = elements.length; i < len; i++){
				lazySizes.loader.unveil(elements[i]);
			}
		}
	};

	addEventListener('beforeprint', onprint, false);

	if(!('onbeforeprint' in window) && window.matchMedia && (printMedia = matchMedia('print')) && printMedia.addListener){
		printMedia.addListener(function(){
			if(printMedia.matches){
				onprint();
			}
		});
	}
}
