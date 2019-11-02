'use strict';

import { Arrays, Files, Strings } from '../index';

const URIs = {
	firstComponent : (url=window.location.pathname, trim=true)=> ((trim) ? Strings.trimBounds(url, '/').split('/').shift() : url.substr(1).split('/').shift()),
	hostname       : (url=window.location.hostname)=> (url.replace(/^https?:\/\//g, '').split('/').shift()),
	lastComponent  : (url=window.location.pathname)=> (Files.basename(url)),
	protocol       : (url=window.location.protocol)=> ((/^https?/.test(url.toLowerCase())) ? url.split(':').shift() : null),
	queryString    : (url=window.location.search)=> (Arrays.convertToObject((url.includes('?')) ? url.split('?').pop().split('&').map((qs)=> ({ key : qs.split('=').shift(), val : qs.split('=').pop() })) : [])),
	subdomain      : (url=window.location.hostname)=> ((URIs.hostname(url).split('.').length >= 3) ? URIs.hostname(url).split('.').shift() : null),
	tdl            : (url=window.location.hostname)=> (URIs.hostname(url).split('.').pop())
};


export default (URIs);
