'use strict';

import { Bools, Maths, Strings } from '../index';


const Bits = {
	contains  : (val, bit)=> (((val & bit) === bit)),
	convertBytes : (inBytes, toType)=> (inBytes * 1024),
	genToggle : (val, len)=> ((Maths.isDivisible(val, 16)) ? Strings.reverse(Strings.replCharAt(Strings.reverse(Strings.repeat('0', len)), '1', (val / 16))) : ''),
	flipBit   : (val, pos)=> ((Maths.isDivisible(val, 16)) ? val ^ parseInt(`0x`, 16) : val),
	random    : ()=> (Bools.random() << 0)
};


export default (Bits);
