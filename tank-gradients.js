/**
** TAAAAAAAAAAAAAAAANK Gradients
**
** v1.0a
**
** Made by Marc Guilmard (Toxicat)
** created 16/09/2014
** last edit ---
**
** In attempt to fix chrome issue #226753
** https://code.google.com/p/chromium/issues/detail?id=226753
** contact : guilma_p@epitech.eu
** github : https://github.com/Toxicat
**/

$(document).ready(function(){
	var gradients = $(".tank-gradient");
	
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
	
	for(var i = 0; i < gradients.length; ++i)
	{
		var g = gradients[i];
		var jq_g = $(g);
		var topColor = g.dataset.topColor;
		var bottomColor = g.dataset.bottomColor;
		var height = jq_g.height();
		
		var rDelta = (hexToRgb(bottomColor).r - hexToRgb(topColor).r) / (height - 1);
		var gDelta = (hexToRgb(bottomColor).g - hexToRgb(topColor).g) / (height - 1);
		var bDelta = (hexToRgb(bottomColor).b - hexToRgb(topColor).b) / (height - 1);
		
		var	container = document.createElement("div");
		var jq_c = $(container);
		jq_c.addClass("gradient-container");
		jq_g.append(jq_c);
		
		for(var j = 0; j < height; ++j)
		{
			var r = Math.round(hexToRgb(topColor).r + rDelta * j);
			var g = Math.round(hexToRgb(topColor).g + gDelta * j);
			var b = Math.round(hexToRgb(topColor).b + bDelta * j);
			var color = rgbToHex(r, g, b);
			
			var newGElement = document.createElement("div");
			var jq_e = $(newGElement);
			jq_e.addClass("gradient-element");
			jq_e.css("background-color", color);
			
			
			jq_c.append(jq_e);
		}
	}
});