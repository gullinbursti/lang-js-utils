'use strict';


const Images = {
	dataURL : (img, { width, height }, enc='image/png')=> {
		const canvas = document.createElement('canvas');
		canvas.width = width;
		canvas.height = height;

		const ctx = canvas.getContext('2d');
		ctx.drawImage(img, 0, 0, width, height);

		const imgData = canvas.toDataURL();
		canvas.remove();

		return (imgData);
	},
};


export default (Images);
