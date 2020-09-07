'use strict';


const Browsers = (typeof navigator !== 'undefined') ? {
	clipboardCopy : (str)=> {
		// 		navigator.clipboard.writeText(str);
		const txtArea = document.createElement('textarea');
		txtArea.innerText = str;
		document.body.appendChild(txtArea);
		txtArea.select();
		document.execCommand('copy');
		txtArea.remove();
	},
	clipboardText : ()=> (navigator.clipboard.readText().then((text)=> (text))),
	isOnline      : ()=> (navigator.onLine),
	isMobile      : {
		Android    : ()=> (/Android/i.test(navigator.userAgent)),
		BlackBerry : ()=> (/BlackBerry/i.test(navigator.userAgent)),
		iOS        : ()=> (/iPhone|iPad|iPod/i.test(navigator.userAgent)),
		iPad       : ()=> (/iPad/i.test(navigator.userAgent)),
		iPhone     : ()=> (/iPhone/i.test(navigator.userAgent) && !Browsers.isMobile.iPad()),
		Opera      : ()=> (/Opera Mini/i.test(navigator.userAgent)),
		Windows    : ()=> (/IEMobile|WPDesktop/i.test(navigator.userAgent)),
		ANY        : ()=> (Browsers.isMobile.Android() || Browsers.isMobile.iOS() || Browsers.isMobile.Windows() || Browsers.isMobile.Opera() || Browsers.isMobile.BlackBerry())
	},
	isSafari      : ()=> (/Mac OS X.+Safari/i).test(navigator.userAgent && !/Mac OS X.+Chrome/i.test(navigator.userAgent)),
	makeDownload  : (url, blank=false)=> {
		let link = document.createElement('a');
		link.target = (blank) ? '_blank' : '_self';
		link.href = url;
		link.download = url.split('/').pop();
		document.body.appendChild(link);
		link.click();
		link.remove();
	},
	scrollElement  : (element, coords={ x : 0, y : 0 })=> {
		if (element) {
			element.scrollTo(coords.x, coords.y);
		}
	},
	scrollOrigin   : (element)=> (Browsers.scrollElement(element))
} : {};


export default (Browsers);
