'use strict';

import { Maths, Objects } from '../index';


const Arrays = {
// 	containsElement  : (arr, element)=> (arr.indexOf(element) > -1),
	containsElement  : (arr, element)=> (Arrays.containsElements(arr, [element])),
	containsElements : (arr, elements, all=true)=> ((all) ? elements.every((element)=> (arr.indexOf(element) > -1)) : elements.some((element)=> (arr.indexOf(element) > -1))),
	convertToObject  : (arr)=> {
		let obj = {};
		arr.forEach((element)=> {
			if (Objects.hasKey(element, 'key') && Objects.hasKey(element, 'val')) {
				obj[element.key] = element.val;
			}
		});

		return (obj);
	},
// 	dropElement      : (arr, element)=> (arr.filter((item)=> (item !== element))),
	dropElement      : (arr, element)=> (Arrays.dropElements(arr, [element])),
	dropElements     : (arr, elements)=> (arr.filter((element)=> (!Arrays.containsElement(elements, element)))),
	indexFill        : (len, ind=0)=> (Arrays.indexMap(Arrays.repeatFill(len)).map((i)=> (i + ind))),
	indexMap         : (arr)=> (arr.map((element, i)=> (i))),
  isEmpty          : (arr)=> (arr.length === 0),
  pruneObjDupKeys  : (arr, key)=> (arr.map((obj1, i, org)=> ((org.find((obj2, ii)=> (i > ii && obj1[key] === obj2[key])) ? null : obj1))).filter((obj)=> (obj !== null))),
	randomElement    : (arr)=> (arr[Arrays.randomIndex(arr)]),
	randomIndex      : (arr)=> (Maths.randomInt(0, arr.length - 1)),
	repeatFill       : (len, val=null)=> (new Array(len).fill(val)),
	shuffle          : (arr)=> {
		let indexes = Arrays.indexMap(arr);
		indexes.forEach((element, i)=> {
			const ind = (arr.length - 1) - i;
			Arrays.swapAtIndexes(indexes, (ind > 0) ? Maths.randomInt(0, ind - 1) : Arrays.randomIndex(indexes), ind);
		});

		return (indexes.map((ind)=> (arr[ind])));
	},
	swapAtIndexes    : (arr, i, ii)=> {
		const swap = arr[i];
		arr[i] = arr[ii];
		arr[ii] = swap;
	},
	wrapElement      : (arr, ind)=> (arr[Arrays.wrapIndex(arr, ind)]),
	wrapIndex        : (arr, ind)=> (Maths.wrap(ind, arr.length - 1))
};


export default (Arrays);
