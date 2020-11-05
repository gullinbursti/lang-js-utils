'use strict';


// import toStream from 'buffer-to-stream';
// import Datauri from 'datauri';
import { Image } from 'image-js';
// import ImageJS from 'imagejs';
// import Window from 'window';
// const window = new Window();

import { Arrays, Strings } from '../';

const AVATAR_BG_COLORS = [
	'#1abc9c',
	'#2ecc71',
	'#3498db',
	'#9b59b6',
	'#34495e',
	'#16a085',
	'#27ae60',
	'#2980b9',
	'#8e44ad',
	'#2c3e50',
	'#f1c40f',
	'#e67e22',
	'#e74c3c',
	'#95a5a6',
	'#f39c12',
	'#d35400',
	'#c0392b',
	'#bdc3c7',
	'#7f8c8d'
];

const Images = {
	dataURL        : (img, { width, height }, enc='image/png')=> {
		const canvas = window.document.createElement('canvas');
		canvas.width = width;
		canvas.height = height;

		const ctx = canvas.getContext('2d');
		ctx.drawImage(img, 0, 0, width, height);

		const imgData = canvas.toDataURL();
		canvas.remove();

		return (imgData);
	},
	dimensions     : async(dataURL)=> {
		const { width, height } = await Image.load(dataURL);
		return ({ width, height });
	},
	genColor        : (rgba, size)=> {
// 		console.log('genColor', { rgba, size });

		const canvas = window.document.createElement('canvas');
		const context = canvas.getContext('2d');

		document.body.appendChild(canvas);
		canvas.width = size.width;
		canvas.height = size.height;
		canvas.style.width = `${size.width}px`;
		canvas.style.height = `${size.height}px`;

		context.clearRect(0, 0, canvas.width, canvas.height);
		context.fillStyle = `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;
		context.fillRect(0, 0, size.width, size.height);

		const dataURL = canvas.toDataURL();
		canvas.remove();

		return (dataURL);
	},
	genLetterAvatar : (letter, size=128, txtColor=null)=> {
		letter = Strings.firstChar(letter).toUpperCase();

		const bgColor = Arrays.randomElement(AVATAR_BG_COLORS);
		const fgColor = (txtColor || (Number(`0x1${bgColor}`) ^ 0xffffff).toString(16).substr(1));

		console.log('[:][:][:][:][:][:][:][:][:][:][:][:][:]', { bgColor, fgColor });

		const canvas = window.document.createElement('canvas');
		const context = canvas.getContext('2d');

		document.body.appendChild(canvas);
		canvas.width = size;
		canvas.height = size;
		canvas.style.width = `${size}px`;
		canvas.style.height = `${size}px`;

		context.clearRect(0, 0, canvas.width, canvas.height);
		context.fillStyle = bgColor;
		context.fillRect(0, 0, size, size);

		context.font = `${(size * 0.5) << 0}px Monaco, monospace`;
		context.textAlign = 'center';
		context.textBaseline = 'middle';
		context.fillStyle = fgColor;
		context.fillText(letter, size * 0.5, size * 0.5);

		const dataURL = canvas.toDataURL();
		canvas.remove();

		return ({ dataURL, bgColor, fgColor });
	},
	genPlaceholder : ({ width, height }, caption=null, bgColor='#808080', fgColor='rgba(31, 31, 31, 0.875')=> {
		const canvas = window.document.createElement('canvas');
		const context = canvas.getContext('2d');

		document.body.appendChild(canvas);
		canvas.width = width;
		canvas.height = height;
		canvas.style.width = `${width}px`;
		canvas.style.height = `${height}px`;

		context.clearRect(0, 0, canvas.width, canvas.height);
		context.fillStyle = bgColor;
		context.fillRect(0, 0, width, height);

		context.lineWidth = 1.0;
		context.setLineDash([3, 2]);
		context.lineDashOffset = 0;
		context.beginPath();
		context.strokeStyle = fgColor;

		context.beginPath();
		context.moveTo(0, 0);
		context.lineTo(width, height);
		context.moveTo(width, 0);
		context.lineTo(0, height);
		context.stroke();

		if (caption) {
			context.textAlign = 'center';
			context.font = '10px Monaco, monospace';
			context.fillStyle = fgColor;
			context.fillText(caption, (width * 0.5) << 0, Math.max(0, height - 5));
		}

		const dataURL = canvas.toDataURL();
// 		const dataURL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABAAAAAMgCAYAAAC9FhA7AAC1RElEQVR4nOzdeYDU9P3/8Vd2F3YX';
		canvas.remove();

		return (dataURL);
	},
	resize     : (data, { width : height })=> {
		return (null);
	}
};


export default (Images);
