'use strict';

import { Arrays } from '../index';


const Maths = {
	coinFlip    : (range=100)=> (Maths.randomInt(range * -0.5, range * 0.5) >= 0),
	clamp       : (val, lower, upper)=> (Math.min(Math.max(val, lower), upper)),
	cube        : (val)=> (Math.pow(val, 3)),
	diceRoll    : (sides=6)=> (Maths.randomInt(1, sides)),
	geom        : {
		cropFrame            : (srcFrame, cropFrame)=> ({
			origin : {
				x : Math.max(srcFrame.origin.x, cropFrame.origin.x),
				y : Math.max(srcFrame.origin.y, cropFrame.origin.y)
			},
			size   : {
				width  : Math.min(srcFrame.origin.x + srcFrame.size.width, cropFrame.origin.x + cropFrame.size.width) - Math.max(srcFrame.origin.x, cropFrame.origin.x),
				height : Math.min(srcFrame.origin.y + srcFrame.size.height, cropFrame.origin.y + cropFrame.size.height) - Math.max(srcFrame.origin.y, cropFrame.origin.y)
			}
		}),
		frameContainsFrame   : (frame1, frame2)=> (Maths.geom.rectContainsRect(Maths.geom.frameToRect(frame1), Maths.geom.frameToRect(frame2))),
		frameIntersectsFrame : (frame1, frame2)=> (Maths.geom.rectIntersectsRect(Maths.geom.frameToRect(frame1), Maths.geom.frameToRect(frame2))),
		frameToRect          : (frame)=> ({
			top    : frame.origin.y,
			left   : frame.origin.x,
			bottom : frame.origin.y + frame.size.height,
			right  : frame.origin.x + frame.size.width
		}),
		intersectionRect     : (rect1, rect2)=> ({
			top    : Math.max(rect1.top, rect2.top),
			left   : Math.max(rect1.left, rect2.left),
			bottom : Math.min(rect1.bottom, rect2.bottom),
			right  : Math.min(rect1.right, rect2.right)
		}),
		isSizeDimensioned    : (size, flag=0x11)=> (size.width !== 0 && size.height !== 0),
		lineMidpoint         : (pt1, pt2)=> ({ x : pt1.x + ((pt2.x - pt1.x) * 0.5), y : pt1.y + ((pt2.y - pt1.y) * 0.5) }),
		ptAngle              : (pt1, pt2)=> (Math.atan2(pt2.y - pt1.y, pt2.x - pt1.x)),
		ptDistance           : (pt1, pt2)=> (Math.sqrt(Maths.square(Math.abs(pt2.x - pt1.x)) + Maths.square(Math.abs(pt2.y - pt1.y)))),
		rectContainsRect     : (rect1, rect2)=> (rect1.top <= rect2.top && rect1.left <= rect2.left && rect1.right >= rect2.right && rect1.bottom >= rect2.bottom),
		rectIntersectsRect   : (rect1, rect2)=> (Math.max(rect1.left, rect2.left) < Math.min(rect1.right, rect2.right) && Math.max(rect1.top, rect2.top) < Math.min(rect1.bottom, rect2.bottom)),
		rectToFrame          : (rect)=> ({
			origin : {
				x : rect.left,
				y : rect.top
			},
			size   : {
				width  : rect.right - rect.left,
				height : rect.bottom - rect.top
			}
		}),
		sizeArea             : (size)=> (size.width * size.height),
		sizeOutboundsSize    : (size1, size2)=> (size1.width > size2.width || size1.height > size2.height),
		slope                : (pt1, pt2)=> ({ x : pt2.x - pt1.x, y : pt2.y - pt1.y }),
		unionRect            : (rect1, rect2)=> ({
			top    : Math.min(rect1.top, rect2.top),
			left   : Math.min(rect1.left, rect2.left),
			bottom : Math.max(rect1.bottom, rect2.bottom),
			right  : Math.max(rect1.right, rect2.right)
		})
	},
	factorial   : (val)=> (Arrays.indexFill(val, 1).reverse().reduce((acc, val)=> (acc * val))),
	half        : (val)=> (val * 0.5),
	quarter     : (val)=> (val * 0.25),
	randomFloat : (lower, upper, precision=15)=> ((Math.random() * (upper - lower)) + lower).toFixed(precision),
	randomHex   : (lower=0x0, upper=0xf)=> (`0x${Maths.randomInt(lower, upper).toString(16)}`),
	randomInt   : (lower, upper)=> (Math.round(Maths.randomFloat(lower, upper))),
	reciprocal  : (val)=> (1 / val),
	root        : (val, root)=> (Math.pow(val, Maths.reciprocal(root))),
	square      : (val)=> (Math.pow(val, 2)),
	toDegrees   : (val)=> (val * (180 / Math.PI)),
	toRadians   : (val)=> (val * (Math.PI / 180)),
	wrap        : (val, upper=Number.MAX_VALUE - 1, lower=0)=> ((val < lower) ? lower + (((upper + 1) - Math.abs(val)) % (upper + 1)) : lower + (val % (upper + 1)))
};


export default (Maths);
