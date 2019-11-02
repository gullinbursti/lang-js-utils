'use strict';

import { Maths } from '../index';


const Bools = {
	plusMinus : (bool=true)=> (((bool << 0) * 2) - 1),
	random    : ()=> (Maths.coinFlip())
};


export default (Bools);
