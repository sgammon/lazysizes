
goog.module('third_party.lazysizes.fixIosSizes');
const lazySizes = goog.require('third_party.lazysizes');


var regPicture;
var lazySizesCfg = lazySizes.cfg;
var img = document.createElement('img');

if(('srcset' in img) && !('sizes' in img) && !window.HTMLPictureElement){
	regPicture = /^picture$/i;
	document.addEventListener('lazybeforeunveil', function(e){
		if(e.detail.instance != lazySizes){return;}

		var elem, parent, srcset, sizes, isPicture;
		var picture, source;
		if(e.defaultPrevented ||
			lazySizesCfg.noIOSFix ||
			!(elem = e.target) ||
			!(srcset = elem.getAttribute(lazySizesCfg.srcsetAttr)) ||
			!(parent = elem.parentNode) ||
			(
				!(isPicture = regPicture.test(parent.nodeName || '')) &&
				!(sizes = elem.getAttribute('sizes') || elem.getAttribute(lazySizesCfg.sizesAttr))
			)
		){return;}

		picture = isPicture ? parent : document.createElement('picture');

		if(!elem._lazyImgSrc){
			Object.defineProperty(elem, '_lazyImgSrc', {
				value: document.createElement('source'),
				writable: true
			});
		}
		source = elem._lazyImgSrc;

		if(sizes){
			source.setAttribute('sizes', sizes);
		}

		source.setAttribute(lazySizesCfg.srcsetAttr, srcset);
		elem.setAttribute('data-pfsrcset', srcset);
		elem.removeAttribute(lazySizesCfg.srcsetAttr);

		if(!isPicture){
			parent.insertBefore(picture, elem);
			picture.appendChild(elem);
		}
		picture.insertBefore(source, elem);
	});
}
