'use strict';

import { Arrays } from '../index';


const Objects = {
	defineVal  : (obj, key, val)=> (Object.assign({}, obj, { [key] : val })),
	dropKey    : (obj, key)=> (Objects.dropKeys(obj, [key])),
	dropKeys   : (obj, keys)=> ({ ...Object.keys(obj).filter((k)=> (!Arrays.containsElement(keys, k))).reduce((newObj, k)=> ({...newObj, [k]: obj[k]}), {})}),
	dropMatch  : (obj, regex)=> (Objects.dropKeys(obj, Object.keys(obj).filter((key)=> (obj.hasOwnProperty(key) && regex.test(key))))),
	isEmpty    : (obj)=> (Object.keys(obj).length === 0),
	hasKey     : (obj, key)=> ((obj && typeof obj !== 'undefined') ? Object.keys(obj).some((k)=> (k === key)) : false),
	length     : (obj)=> (Object.keys(obj).length),
	reduceVals : (obj, init=0)=> (Object.values(obj).reduce((acc, val)=> ((acc << 0) + (val << 0)), init)),
	renameKey  : (obj, oldKey, newKey, overwrite=false)=> {
		if (obj && (Objects.hasKey(obj, oldKey) || (overwrite && !Objects.hasKey(obj, newKey)))) {
			delete Object.assign(obj, { [newKey] : obj[oldKey] })[oldKey];
		}
	},
	swapAtKeys : (obj, key1, key2)=> {
		const swap = obj[key1];
		obj[key1] = obj[key2];
		obj[key2] = swap;
	}
};


export default (Objects);


/*
const removeItem = (object, key, value)=> {
  if (value == undefined)
    return;

  for (var i in object) {
    if (object[i][key] == value) {
        object.splice(i, 1);
    }
  }
};

let collection = [{
 id : '5f299a5d-7793-47be-a827-bca227dbef95',
 title : 'one'
 }, {
 id : '87353080-8f49-46b9-9281-162a41ddb8df',
 title : 'two'
 }, {
 id : 'a1af832c-9028-4690-9793-d623ecc75a95',
 title : 'three'
}];

removeItem(collection, 'id', '87353080-8f49-46b9-9281-162a41ddb8df');
*/