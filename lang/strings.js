'use strict';

import { Arrays, Maths, RegExes } from '../index';


//const EMAIL_NEEDLE_REGEX = new RegExp('^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$', 'i');
const URI_SANITIZED_REGEX = new RegExp('[\u2000-\u206F\u2E00-\u2E7F\'!"#$%&()*:;<=>?@[]^`{|}~]', 'g');

const Strings = {
	asciiEncode  : (str, enc='utf8')=> ((new Buffer(str, enc)).toString('ascii')),
	base64Decode : (str, enc='utf8')=> ((new Buffer(str, 'base64')).toString(enc)),
	base64Encode : (str, enc='ascii')=> ((new Buffer(str, enc)).toString('base64')),
	camelize     : (str, sep=' ', propName=false)=> (str.split((sep || ' ')).map((word, i)=> (word.replace(/^./, (c)=> ((!propName && i === 0) ? c.toLowerCase() : c.toUpperCase())))).join('')),
	capitalize   : (str, first=false)=> ((first) ? str.replace(/(\b\w)/i, (c)=> (c.toUpperCase())) : str.replace(/(\b\w)/gi, (c)=> (c.toUpperCase()))),
	// capitalize   : (str, lower=false)=> (str.replace(/^(\w+)$/gi, (c)=> ((lower) ? c.toLowerCase() : c)).replace(/(\b\w)/gi, (c)=> (c.toUpperCase()))),
	compare      : (str1, str2, cs=true)=> ((cs) ? (str1 === str2) : (str1.toUpperCase() === str2.toUpperCase())),
	countOf      : (str, substr)=> ((str.match(new RegExp(substr.toString(), 'g')) || []).length),
	firstChar    : (str)=> (str.charAt(0)),
	hexVal       : (str, pad=0)=> (`0x${(str << 0 > 0) ? Maths.hexVal(str << 0) : 0}`),
	indexedVal   : (val, arr, sep='_')=> {
		if (arr[val].length === 0) {
			arr[val] = 0;
		}

		return ({
			name : `${val}${sep}${++arr[val]}`,
			arr : [...arr]
		});
	},
// 	isEmail      : (str)=> (EMAIL_NEEDLE_REGEX.test(String(str))),
	isEmail      : (str)=> (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(String(str))),
	lastChar     : (str)=> (str.slice(-1)),
	lPad         : (str, amt, char='0')=> ((amt < 0 || String(str).length < amt) ? `${(new Array((amt > 0) ? amt - String(str).length + 1 : -amt + 1)).join(char)}${str}` : str),
	pluralize   : (str, val)=> (((val << 0) === 1) ? str : (Strings.lastChar(str) === 'y') ? `${str.slice(0, -1)}ies` : (Strings.lastChar(str) === 's') ? `${str}es` : `${str}s`),
// 	quoted      : (str)=> (str.replace(/([.?*+^$[\]\\(){}|\-:;#@!%])/g, '\\$1')),
	quoted      : (str, chars=['.?*+^$[\]\\(){}|-:;#@!%'])=> (str.replace(RegExes.concat(chars.join('')), '\\$1')),
	remove      : (str, needle)=> (Strings.replAll(str, needle)),
	repeat      : (str, len, sep='')=> (Arrays.repeatFill(len, str).join(sep)),
	replAll     : (str, needle, repl='')=> (str.split(needle).join(repl)),
	replCharAt  : (str, char, ind)=> ((ind > str.length - 1) ? str : `${str.substr(0, ind)}${char}${str.substr(ind + 1)}`),
	reverse     : (str)=> ([...str].reverse().join('')),
	randAlpha   : (len=1, cases=true)=> (Arrays.indexFill(len).map((i)=> ((cases && Maths.coinFlip()) ? String.fromCharCode(Maths.randomInt(65, 91)).toLowerCase() : String.fromCharCode(Maths.randomInt(65, 91)))).join('')),
	randHex     : (len=1, upper=true)=> (Arrays.indexFill(len).map((i)=> ((upper) ? Strings.lastChar(Maths.randomHex()).toUpperCase() : Strings.lastChar(Maths.randomHex()))).join('')),
	rPad        : (str, amt, char='0')=> ((str.length < amt) ? `${str}${(new Array(amt - String(str).length + 1)).join(char)}` : str),
	shuffle     : (str)=> (Arrays.shuffle([...str.split('')]).join('')),
	slugifyURI  : (str)=> (str.trim().replace(URI_SANITIZED_REGEX, '').replace(/[+,._\/\\\s]/g, '-').replace(/[^\w-]+/g, '').replace(/--+/g, '-').replace(/^-+|=+$/, '').toLowerCase()),
	trimBounds  : (str, char=' ')=> (str.split(char).filter((segment)=> (segment.length > 0)).join(char)),
	trimSlashes : (str, head=true, tail=true)=> (str.replace(((head && tail) ? /^\/+?(.+)\/+/ : (head && !tail) ? /^\/+(.+)$/ : (!head && tail) ? /^(.+)\/+$/ : /^(.+)$/), '$1')),
	truncate    : (str, len, ellipsis='…')=> ((str.trim().length > 0 && str.trim().length > len) ? `${str.trim().slice(0, Math.max(0, len - 1)).trim()}${ellipsis}` : str),
	utf8Encode  : (str, enc='ascii')=> ((new Buffer(str, enc)).toString('utf8'))
};

export default (Strings);
