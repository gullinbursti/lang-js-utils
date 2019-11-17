'use strict';

import { Strings } from '../index';


const DateTimes = {
	currYear       : ()=> (new Date().getFullYear()),
	durationFormat : (secs, frmt='mm:ss')=> {
		const hours = '' + ((secs / 3600) << 0);
		const mins = '' + ((secs - ((hours * 3600)) / 60) << 0);
		secs -= '' + (mins * 60);

		return (frmt.split('').map((char, i)=> {
			if (char === 'm') {
				return ((i < mins.length) ? mins.split('').reverse()[i] : '0');

			} else if (char === 's') {
				return ((i < secs.length) ? secs.split('').reverse()[i] : '0');

			} else {
				return (char);
			}
		}).reverse().join(''));
	},
	ellipsis       : ()=> (Array((DateTimes.epoch() % 4) + 1).join('.')),
	epoch          : (millisecs=false)=> ((millisecs) ? (new Date()).getTime() : ((new Date()).getTime() * 0.001) << 0),
	isLeapYear     : (date=new Date())=> ((date.getFullYear() % 4 === 0) && ((date.getFullYear() % 100 !== 0) || (date.getFullYear() % 400 === 0))),
	iso8601        : (date=new Date())=> (`${date.getFullYear()}-${Strings.lPad(date.getMonth(), '0', 2)}-${Strings.lPad(date.getDate(), '0', 2)}T${Strings.lPad(date.getHours(), '0', 2)}:${Strings.lPad(date.getMinutes(), '0', 2)}:${Strings.lPad(date.getSeconds(), 2)}${(date.getTimezoneOffset() === 0) ? 'Z' : date.toTimeString().split(' ')[1].replace(/^.+(.\d{4})/, '$1')}`),
	secsDiff       : (date1, date2=new Date())=> (Math.abs(date1.getTime() - date2.getTime()))
};


export default (DateTimes);
