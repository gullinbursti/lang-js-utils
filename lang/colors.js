'use strict';


const Colors = {
	componentHex : (hex, comp)=> {
		const comps = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i.exec(hex);
		return ((comps) ? comps[(comp === 'r') ? 1 : (comp === 'g') ? 2 : (comp === 'b') ? 3 : (comp === 'a' && comps.length === 5) ? 4 : 0] : null);
	},
// 	rgbToHex : (rgb)=> (`#${rgb.r.toString(16)}${rgb.g.toString(16)}${rgb.b.toString(16)}`),
	rgbToHex     : (rgb)=> (`#${((1 << 24) + (rgb.r << 16) + (rgb.g << 8) + rgb.b).toString(16).slice(1)}`),
// 	rgbaToHex : (rgb)=> (`#${rgb.r.toString(16)}${rgb.g.toString(16)}${rgb.b.toString(16)}${((rgb.a * 255) << 0).toString(16)}`),
	rgbaToHex    : (rgba)=> {
		const hex = {
			r : rgba.r.toString(16),
			g : rgba.g.toString(16),
			b : rgba.b.toString(16),
			a : ((rgba.a * 255) << 0).toString(16)
		};

		return (`#${(hex.r.length > 1) ? hex.r : `0${hex.r}`}${(hex.g.length > 1) ? hex.g : `0${hex.g}`}${(hex.b.length > 1) ? hex.b : `0${hex.b}`}${(hex.a.length > 1) ? hex.a : `0${hex.a}`}`);
	},
	rgbaToRGB    : (rgba, flatten=true)=> {
		return ({
			r : rgba.r,
			g : rgba.g,
			b : rgba.b
		});
	},
	hexToRGB    : (hex)=> {
		const comps = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return ((comps) ? {
			r : parseInt(comps[1], 16),
			g : parseInt(comps[2], 16),
			b : parseInt(comps[3], 16)
		} : null);
	}, 
	invertHex   : (hex)=> ((Number(`0x1${hex}`) ^ 0xffffff).toString(16).substr(1)),
	invertRGB   : (rgb)=> (Colors.invertHex(Colors.rgbToHex(rgb))),
	invertRGBA  : (rgba)=> (Colors.invertRGB(Colors.rgbaToRGB(rgba)))
};


export default (Colors);
