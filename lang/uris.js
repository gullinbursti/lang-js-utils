'use strict';

import { Arrays, Files, Strings } from '../index';

const URIs = {
	extractURLs    : (val)=> {
		const matches = val.match(new RegExp('(?:(?:https?|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?!(?:10|127)(?:\\.\\d{1,3}){3})(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))(?::\\d{2,5})?(?:/\\S*)?', 'ig'));
		if (!matches) {
    return ([]);
  }

  return (matches.filter((value, index)=> (matches.indexOf(value) === index)));
	},
	firstComponent : (url=window.location.pathname, trim=true)=> ((trim) ? Strings.trimBounds(url, '/').split('/').shift() : url.substr(1).split('/').shift()),
	hostname       : (url=window.location.hostname)=> (url.replace(/^https?:\/\//g, '').split('/').shift()),
	lastComponent  : (url=window.location.pathname)=> (Files.basename(url)),
	protocol       : (url=window.location.protocol)=> ((/^https?/.test(url.toLowerCase())) ? url.split(':').shift() : null),
	queryString    : (url=window.location.search)=> (Arrays.convertToObject((url.includes('?')) ? url.split('?').pop().split('&').map((qs)=> ({ key : qs.split('=').shift(), val : qs.split('=').pop() })) : [])),
	subdomain      : (url=window.location.hostname)=> ((URIs.hostname(url).split('.').length >= 3) ? URIs.hostname(url).split('.').shift() : null),
	tdl            : (url=window.location.hostname)=> (URIs.hostname(url).split('.').pop())
};


export default (URIs);
