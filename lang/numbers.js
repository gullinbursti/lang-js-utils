'use strict';

import { Strings } from '../index';

const Numbers = {
	commaFormat : (val)=> (val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')),
	isEven      : (val)=> (val % 2 === 0),
	isOdd       : (val)=> (!Numbers.isEven(val)),
	lPad        : (val, amt)=> (Strings.lPad(`${val}`, amt, '0')),
	rPad        : (val, amt)=> (Strings.rPad(`${val}`, amt)),
	toOrdinal   : (val)=> (`${val}${(val >= 10 && val <= 13) ? 'th' : ['th', 'st', 'nd', 'rd', 'th'][Math.min(4, val % 10)]}`)
};


export default (Numbers);
