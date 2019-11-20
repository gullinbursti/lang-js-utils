'use strict';

import { Strings } from '../index';


const RegExes = {
	concat : (needle, prefix='', postfix='', flags='gi')=> (new RegExp(`${prefix}${Strings.quoted(needle)}${postfix}`, flags))
};


export default (RegExes);
