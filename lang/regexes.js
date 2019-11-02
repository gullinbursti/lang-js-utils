'use strict';

import { Strings } from '../index';


const RegExes = {
	concat : (needle, prefix='', postfix='', flags='gi')=> (new RegExp(`${prefix}${Strings.quote(needle)}${postfix}`, flags))
};


export default (RegExes);
