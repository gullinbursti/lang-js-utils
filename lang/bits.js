'use strict';

import { Bools } from '../index';


const Bits = {
	contains : (val, bit)=> (((val & bit) === bit)),
	random   : ()=> (Bools.random() << 0)
};


export default (Bits);
