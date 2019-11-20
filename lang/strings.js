'use strict';

import { Arrays, Maths } from '../index';


//const EMAIL_NEEDLE_REGEX = new RegExp('^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$', 'i');
const URI_SANITIZED_REGEX = new RegExp('[\u2000-\u206F\u2E00-\u2E7F\'!"#$%&()*:;<=>?@[]^`{|}~]', 'g');

const Strings = {
	asciiEncode  : (str, enc='utf8')=> ((new Buffer(str, enc)).toString('ascii')),
	base64Decode : (str, enc='utf8')=> ((new Buffer(str, 'base64')).toString(enc)),
	base64Encode : (str, enc='ascii')=> ((new Buffer(str, enc)).toString('base64')),
	camelize     : (str, sep=' ', propName=false)=> (str.split((sep || ' ')).map((word, i)=> (word.replace(/^./, (c)=> ((!propName && i === 0) ? c.toLowerCase() : c.toUpperCase())))).join('')),
	capitalize   : (str, lower=false)=> (str.replace(/^(\w+)$/gi, (c)=> ((lower) ? c.toLowerCase() : c)).replace(/(\b\w)/gi, (c)=> (c.toUpperCase()))),
	countOf      : (str, substr)=> ((str.match(new RegExp(substr.toString(), 'g')) || []).length),
	firstChar    : (str)=> (str.charAt(0)),
// 	isEmail      : (str)=> (EMAIL_NEEDLE_REGEX.test(String(str))),
	isEmail      : (str)=> (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(String(str))),
	lastChar     : (str)=> (str.slice(-1)),
	lPad         : (str, amt, char='0')=> ((amt < 0 || String(str).length < amt) ? `${(new Array((amt > 0) ? amt - String(str).length + 1 : -amt + 1)).join(char)}${str}` : str),
	indexedVal   : (val, arr, divider='_')=> {
		if (arr[val].length === 0) {
			arr[val] = 0;
		}

		return ({
			name : `${val}${divider}${++arr[val]}`,
			arr : [...arr]
		});
	},
	pluralize   : (str, val)=> (((val << 0) === 1) ? str : (Strings.lastChar(str) === 'y') ? `${str.slice(0, -1)}ies` : (Strings.lastChar(str) === 's') ? `${str}es` : `${str}s`),
	quoted      : (str)=> (str.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1')),
	remove      : (str, needle)=> (Strings.replAll(str, needle)),
	repeat      : (str, len, sep='')=> (Arrays.repeatFill(len, str).join(sep)),
	replAll     : (str, needle, repl='')=> (str.split(needle).join(repl)),
	reverse     : (str)=> ([...str].reverse().join('')),
	randAlpha   : (len=1, cases=true)=> (Arrays.indexFill(len).map((i)=> ((cases && Maths.coinFlip()) ? String.fromCharCode(Maths.randomInt(65, 91)).toLowerCase() : String.fromCharCode(Maths.randomInt(65, 91)))).join('')),
	randHex     : (len=1, upper=true)=> (Arrays.indexFill(len).map((i)=> ((upper) ? Strings.lastChar(Maths.randomHex()).toUpperCase() : Strings.lastChar(Maths.randomHex()))).join('')),
	rPad        : (str, amt, char='0')=> ((str.length < amt) ? `${str}${(new Array(amt - String(str).length + 1)).join(char)}` : str),
	shuffle     : (str)=> (Arrays.shuffle([...str.split('')]).join('')),
	slugifyURI  : (str)=> (str.trim().replace(URI_SANITIZED_REGEX, '').replace(/[+,._\/\\\s]/g, '-').replace(/[^\w-]+/g, '').replace(/--+/g, '-').replace(/^-+|=+$/, '').toLowerCase()),
// 	trimBounds  : (str, char)=> (str.replace(new RegExp(RegExps.quote(char), 'g')), ''),
// 	trimBounds  : (str, char)=> (str.match(RegExps.concat(char, '^', '$'), '')),
	trimBounds  : (str, char)=> (str.split(char).filter((segment, i)=> (segment.length > 0)).join(char)),
	trimSlashes : (str, lead=true, trail=true)=> (str.replace(((lead && trail) ? /^\/?(.+)\// : (lead && !trail) ? /^\/(.+)$/ : (!lead && trail) ? /^(.+)\/$/ : /^(.+)$/), '$1')),
	truncate    : (str, len, ellipsis='…')=> ((str.trim().length > 0 && str.trim().length > len) ? `${str.trim().slice(0, Math.max(0, len - 1)).trim()}${ellipsis}` : str),
	utf8Encode  : (str, enc='ascii')=> ((new Buffer(str, enc)).toString('utf8'))
};

export default (Strings);
