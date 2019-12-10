'use strict';


import { Image } from 'image-js';
import Window from 'window';

const window = new Window();


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
	genPlaceholder : ({ width, height }, caption=null, bgColor='#808080', fgColor='rgba(31, 31, 31, 0.875')=> {
		const canvas = window.document.createElement('canvas');
		const context = canvas.getContext('2d');

		document.body.appendChild(canvas);
		canvas.width = width;
		canvas.height = height;
		canvas.style.width = width;
		canvas.style.height = height;

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
			context.font = `10px Monaco, monospace`;
			context.fillStyle = fgColor;
			context.fillText(caption, (width * 0.5) << 0, Math.max(0, height - 5));
		}

		const dataURL = canvas.toDataURL();
		canvas.remove();

		return (dataURL);
	}
};


export default (Images);
