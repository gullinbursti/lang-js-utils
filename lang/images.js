'use strict';


const Images = {
	dataURL        : (img, { width, height }, enc='image/png')=> {
		const canvas = document.createElement('canvas');
		canvas.width = width;
		canvas.height = height;

		const ctx = canvas.getContext('2d');
		ctx.drawImage(img, 0, 0, width, height);

		const imgData = canvas.toDataURL();
		canvas.remove();

		return (imgData);
	},
	genPlaceholder : ({ width, height }, bgColor='#999999', fgColor='rgb(31, 31, 31, 0.875')=> {
		const canvas = document.createElement('canvas');
		const context = canvas.getContext('2d');

		document.body.appendChild(canvas);
		canvas.width = width;
		canvas.height = height;

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

		const dataURL = canvas.toDataURL();
		canvas.remove();

		return (dataURL);
	}
};


export default (Images);
