/**
** TAAAAAAAAAAAAAAAANK Gradients
**
** v1.0c
**
** Made by Marc Guilmard (Toxicat)
** created 16/09/2014
** last edit 16/09/2014
**
** In attempt to fix chrome issue #226753
** https://code.google.com/p/chromium/issues/detail?id=226753
** contact : guilma_p@epitech.eu
** github : https://github.com/Toxicat
**/

$(document).ready(function() {
	var gradients = $(".tank-gradient");
	
	function fixedModulo(a, b)
	{
		return ((a%b)+b)%b;
	}
	
	function componentToHex(c) {
		var hex = c.toString(16);
		return hex.length == 1 ? "0" + hex : hex;
	}

	function rgbToHex(r, g, b) {
		return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
	}
	
	function hexToRgb(hex) {
		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result ? {
			r: parseInt(result[1], 16),
			g: parseInt(result[2], 16),
			b: parseInt(result[3], 16)
		} : null;
	}
	
	function hueCalculation(prime, delta, c_max) {
		if (c_max == prime.r) {
				var p = prime.g - prime.b;
				var d = p / delta;
				var m = fixedModulo(d, 6);
				var h = Math.round(60 * m);
			return (h);
		}
		else if (c_max == prime.g)
			return (60 * (((prime.b - prime.r) / delta) + 2));
		else
			return (60 * (((prime.r - prime.g) / delta) + 4));
	}
	
	function satCalculation(delta, c_max) {
		if (delta == 0)
			return (0);
		else
			return (delta / c_max);
	}
	
	function rgbToHsv(rgb) {
		
		console.log(rgb);
		
		var prime = {	r: rgb.r / 255,
						g: rgb.g / 255,
						b: rgb.b / 255
					};
					
		var c_max = Math.max(prime.r, prime.g, prime.b);
		var c_min = Math.min(prime.r, prime.g, prime.b);
		var delta = c_max - c_min;
		
		return {	h: hueCalculation(prime, delta, c_max),
					s: satCalculation(delta, c_max),
					v: c_max
				};
	}
	
	function primeCalculation(c, x, h) {
		if (h < 60)
			return { r: c, g: x, b: 0 };
		else if (h < 120)
			return { r: x, g: c, b: 0 };
		else if (h < 180)
			return { r: 0, g: c, b: x };
		else if (h < 240)
			return { r: 0, g: x, b: c };
		else if (h < 300)
			return { r: x, g: 0, b: c };
		else if (h <= 360)
			return { r: c, g: 0, b: x };
	}
	
	function hsvToRgb(hsv) {
		var c = hsv.v * hsv.s;
		var x = c * (1 - Math.abs(((hsv.h / 60) % 2) - 1));
		var m = hsv.v - c;
		
		console.log(c, x, m);
		
		var prime = primeCalculation(c, x, hsv.h);
		
		console.log(prime);
		
		return {	r: Math.round((prime.r + m) * 255),
					g: Math.round((prime.g + m) * 255),
					b: Math.round((prime.b + m) * 255)
				};
	}
	
	function hsvCalculation(jq_c, topRGB, bottomRGB, height) {
		var topHSV = rgbToHsv(topRGB);
		var bottomHSV = rgbToHsv(bottomRGB);
		
		var hDelta = (bottomHSV.h - topHSV.h) / (height - 1);
		var sDelta = (bottomHSV.s - topHSV.s) / (height - 1);
		var vDelta = (bottomHSV.v - topHSV.v) / (height - 1);
		
		for (var j = 0; j < height; ++j)
		{
			var hsv = { h: topHSV.h + hDelta * j,
						s: topHSV.s + sDelta * j,
						v: topHSV.v + vDelta * j
						};
			var rgb = hsvToRgb(hsv);
			var color = rgbToHex(rgb.r, rgb.g, rgb.b);
			
			var newGElement = document.createElement("div");
			var jq_e = $(newGElement);
			jq_e.addClass("gradient-element");
			jq_e.css("background-color", color);
			
			jq_c.append(jq_e);
		}
	}
	
	function rgbCalculation(jq_c, topRGB, bottomRGB, height) {
		var rDelta = (bottomRGB.r - topRGB.r) / (height - 1);
		var gDelta = (bottomRGB.g - topRGB.g) / (height - 1);
		var bDelta = (bottomRGB.b - topRGB.b) / (height - 1);
		
		for(var j = 0; j < height; ++j)
		{
			var r = Math.round(topRGB.r + rDelta * j);
			var g = Math.round(topRGB.g + gDelta * j);
			var b = Math.round(topRGB.b + bDelta * j);
			var color = rgbToHex(r, g, b);
			
			var newGElement = document.createElement("div");
			var jq_e = $(newGElement);
			jq_e.addClass("gradient-element");
			jq_e.css("background-color", color);
			
			jq_c.append(jq_e);
		}
	}
	
	for(var i = 0; i < gradients.length; ++i)
	{
		var g = gradients[i];
		var jq_g = $(g);
		
		var mode = g.dataset.mode;
		var height = jq_g.innerHeight();
		
		var topColor = g.dataset.topColor;
		var bottomColor = g.dataset.bottomColor;
		var topRGB = hexToRgb(topColor);
		var bottomRGB = hexToRgb(bottomColor);
		
		
		
		var	container = document.createElement("div");
		var jq_c = $(container);
		jq_c.addClass("gradient-container");
		jq_g.append(jq_c);
		
		if (mode === "HSV")
			hsvCalculation(jq_c, topRGB, bottomRGB, height);
		else
			rgbCalculation(jq_c, topRGB, bottomRGB, height);
	}
});