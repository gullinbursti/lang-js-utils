'use strict';

import { Strings } from '../index';


const Files = {
	basename     : (path)=> (path.split('/').pop()),
	dirname      : (path)=> (path.split('/').slice(0, -2).pop()),
	extension    : (path)=> (path.split('.').pop()),
	filename     : (path, sep='.')=> (Files.basename(path).split(sep).slice(0, -1).join(sep)),
	truncateName : (path, len)=> (`${Strings.truncate(Files.filename(path).split('').slice(0, -2).join(''), len - 2)}${Files.filename(path).split('').slice(-2).join('')}.${Files.extension(path)}`)
};


export default (Files);
