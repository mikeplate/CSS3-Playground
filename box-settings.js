var boxUniqueId = 1;

function BorderRadiusSetting(elementName, getUpdateBoxDelegate, afterUpdateDelegate) {
	this.ElementName = elementName;
	this.GetUpdateBox = getUpdateBoxDelegate;
	this.AfterUpdate = afterUpdateDelegate;
	
	this.Init = function(box) {
		box.BorderRadius = 0;
		box.BorderRadiusSet = "";
	}
	
	this.Update = function() {
		var box = this.GetUpdateBox();
		var set;
		var borderRadius = parseInt(dojo.byId(this.ElementName + "Text").value);
		if (borderRadius!=0) {
			set = borderRadius + "px";
			box.BorderRadiusSet = "-webkit-border-radius: " + set + ";";
			box.BorderRadiusSet += "\r\n-moz-border-radius: " + set + ";";
			box.BorderRadiusSet += "\r\nborder-radius: " + set;
		}
		else {
			set = "";
			box.BorderRadiusSet = "";
		}
		box.BorderRadius = borderRadius;
		box.Element.style.WebkitBorderRadius = set;
		box.Element.style.MozBorderRadius = set;
		box.Element.style.borderRadius = set;
		this.AfterUpdate(box);
	}

	this.Set = function(box) {
		dojo.byId(this.ElementName + "Text").value = box.BorderRadius;
		this.Slider.attr("value", box.BorderRadius);
	}
	
	this.ToStyle = function(box) {
		if (box.BorderRadiusSet.length > 0)
			return box.BorderRadiusSet + ";\r\n";
		else
			return "";
	}

	var me = this;
	this.Slider = setupSlider(elementName, 0, 50, function() { me.Update(); });
}

function BoxShadowSetting(elementName, getUpdateBoxDelegate, afterUpdateDelegate) {
	this.ElementName = elementName;
	this.GetUpdateBox = getUpdateBoxDelegate;
	this.AfterUpdate = afterUpdateDelegate;
	
	this.Init = function(box) {
		box.BoxShadowOffset = 0;
		box.BoxShadowBlur = 0;
		box.BoxShadowColor = "#000000";
		box.BoxShadowSet = "";
	}
	
	this.Update = function() {
		var box = this.GetUpdateBox();
		var set;
		var boxShadowOffset = parseInt(dojo.byId(this.ElementName + "OffsetText").value);
		var boxShadowBlur = parseInt(dojo.byId(this.ElementName + "BlurText").value);
		if (boxShadowOffset!=0 || boxShadowBlur!=0) {
			var boxShadowColor = dojo.byId(this.ElementName + "ColorText").value;
			set = boxShadowOffset+"px "+boxShadowOffset+"px "+boxShadowBlur+"px " + boxShadowColor;
			box.BoxShadowSet = "-webkit-box-shadow: " + set + ";";
			box.BoxShadowSet += "\r\n-moz-box-shadow: " + set + ";";
			box.BoxShadowSet += "\r\nbox-shadow: " + set;
			box.BoxShadowBlur = boxShadowBlur;
			box.BoxShadowColor = boxShadowColor;
		}
		else {
			set = "";
			box.BoxShadowSet = "";
		}
		box.BoxShadowOffset = boxShadowOffset;
		box.Element.style.WebkitBoxShadow = set;
		box.Element.style.MozBoxShadow = set;
		box.Element.style.boxShadow = set;
		this.AfterUpdate(box);
	}

	this.Set = function(box) {
		dojo.byId(this.ElementName + "OffsetText").value = box.BoxShadowOffset;
		this.OffsetSlider.attr("value", box.BoxShadowOffset);
		dojo.byId(this.ElementName + "BlurText").value = box.BoxShadowBlur;
		this.BlurSlider.attr("value", box.BoxShadowBlur);
		dojo.byId(this.ElementName + "ColorText").value = box.BoxShadowColor;
		this.ColorPalette.attr("value", box.BoxShadowColor);
	}
	
	this.ToStyle = function(box) {
		if (box.BoxShadowSet.length > 0)
			return box.BoxShadowSet + ";\r\n";
		else
			return "";
	}

	var me = this;
	this.OffsetSlider = setupSlider(elementName + "Offset", -50, 50, function() { me.Update(); });
	this.BlurSlider = setupSlider(elementName + "Blur", 0, 50, function() { me.Update(); });
	this.ColorPalette = setupColorPalette(elementName + "Color", function() { me.Update(); });
}

function TextShadowSetting(elementName, getUpdateBoxDelegate, afterUpdateDelegate) {
	this.ElementName = elementName;
	this.GetUpdateBox = getUpdateBoxDelegate;
	this.AfterUpdate = afterUpdateDelegate;
	
	this.Init = function(box) {
		box.TextShadowOffset = 0;
		box.TextShadowBlur = 0;
		box.TextShadowColor = "#000000";
		box.TextShadowSet = "";
	}
	
	this.Update = function() {
		var box = this.GetUpdateBox();
		var set;
		var textShadowOffset = parseInt(dojo.byId(this.ElementName + "OffsetText").value);
		var textShadowBlur = parseInt(dojo.byId(this.ElementName + "BlurText").value);
		if (textShadowOffset!=0 || textShadowBlur!=0) {
			var textShadowColor = dojo.byId(this.ElementName + "ColorText").value;
			set = textShadowOffset+"px "+textShadowOffset+"px "+textShadowBlur+"px " + textShadowColor;
			box.TextShadowSet = "text-shadow: " + set;
			box.TextShadowBlur = textShadowBlur;
			box.TextShadowColor = textShadowColor;
		}
		else {
			set = "";
			box.TextShadowSet = "";
		}
		box.TextShadowOffset = textShadowOffset;
		box.Element.style.textShadow = set;
		this.AfterUpdate(box);
	}

	this.Set = function(box) {
		dojo.byId(this.ElementName + "OffsetText").value = box.TextShadowOffset;
		this.OffsetSlider.attr("value", box.TextShadowOffset);
		dojo.byId(this.ElementName + "BlurText").value = box.TextShadowBlur;
		this.BlurSlider.attr("value", box.TextShadowBlur);
		dojo.byId(this.ElementName + "ColorText").value = box.TextShadowColor;
		this.ColorPalette.attr("value", box.TextShadowColor);
	}
	
	this.ToStyle = function(box) {
		if (box.TextShadowSet.length > 0)
			return box.TextShadowSet + ";\r\n";
		else
			return "";
	}

	var me = this;
	this.OffsetSlider = setupSlider(elementName + "Offset", -50, 50, function() { me.Update(); });
	this.BlurSlider = setupSlider(elementName + "Blur", 0, 50, function() { me.Update(); });
	this.ColorPalette = setupColorPalette(elementName + "Color", function() { me.Update(); });
}

function TransformSetting(elementName, getUpdateBoxDelegate, afterUpdateDelegate) {
	this.ElementName = elementName;
	this.GetUpdateBox = getUpdateBoxDelegate;
	this.AfterUpdate = afterUpdateDelegate;
	
	this.Init = function(box) {
		box.TransformRotate = "0";
		box.TransformScale = "1.0";
		box.TransformSkew = "0";
		box.TransformSkewY = "0";
		box.TransformSet = "";
	}
	
	this.Update = function() {
		var box = this.GetUpdateBox();
		var set = "";
		var transformRotate = dojo.byId(this.ElementName + "RotateText").value;
		if (transformRotate.length > 0 && transformRotate!="0") {
			set = "rotate(" + transformRotate + "deg)";
			box.TransformRotate = transformRotate;
		}
		else {
			box.TransformRotate = 0;
		}
		var transformScale = dojo.byId(this.ElementName + "ScaleText").value;
		if (transformScale.length > 0 && transformScale!="1.0") {
			if (set.length > 0)
				set += " ";
			set += "scale(" + parseFloat(transformScale) + ")";
			box.TransformScale = transformScale;
		}
		else {
			box.TransformScale = "1.0";
		}
		var transformSkew = dojo.byId(this.ElementName + "SkewText").value;
		var transformSkewY = dojo.byId(this.ElementName + "SkewYText").value;
		if ((transformSkew.length > 0 && transformSkew!="0") || (transformSkewY.length > 0 && transformSkewY!="0")) {
			if (set.length > 0)
				set += " ";
			if ((transformSkew.length > 0 && transformSkew!="0") && (transformSkewY.length > 0 && transformSkewY!="0")) {
				set += "skew(" + transformSkew + "deg," + transformSkewY + "deg)";
				box.TransformSkew = transformSkew;
				box.TransformSkewY = transformSkewY;
			}
			else if (transformSkew.length > 0 && transformSkew!="0") {
				set += "skew(" + transformSkew + "deg)";
				box.TransformSkew = transformSkew;
				box.TransformSkewY = "0";
			}
			else {
				set += "skewY(" + transformSkewY + "deg)";
				box.TransformSkew = "0";
				box.TransformSkewY = transformSkewY;
			}
		}
		
		box.Element.style.WebkitTransform = set;
		box.Element.style.MozTransform = set;
		box.Element.style.OTransform = set;
		if (set.length > 0) {
			box.TransformSet = "-webkit-transform: " + set + ";\r\n";
			box.TransformSet += "-moz-transform: " + set + ";\r\n";
			box.TransformSet += "-o-transform: " + set;
		}
		else {
			box.TransformSet = "";
		}
		this.AfterUpdate(box);
	}

	this.Set = function(box) {
		dojo.byId(this.ElementName + "RotateText").value = box.TransformRotate;
		this.RotateSlider.attr("value", box.TransformRotate);
		dojo.byId(this.ElementName + "ScaleText").value = box.TransformScale;
		this.ScaleSlider.attr("value", parseFloat(box.TransformScale)*10);
		dojo.byId(this.ElementName + "SkewText").value = box.TransformSkew;
		this.SkewSlider.attr("value", box.TransformSkew);
		dojo.byId(this.ElementName + "SkewYText").value = box.TransformSkewY;
		this.SkewYSlider.attr("value", box.TransformSkewY);
	}
	
	this.ToStyle = function(box) {
		if (box.TransformSet.length > 0)
			return box.TransformSet + ";\r\n";
		else
			return "";
	}

	var me = this;
	this.RotateSlider = setupSlider(elementName + "Rotate", -180, 180, function() { me.Update(); });
	this.ScaleSlider = setupSlider(elementName + "Scale", 0, 5, function() { me.Update(); });
	this.SkewSlider = setupSlider(elementName + "Skew", -80, 80, function() { me.Update(); });
	this.SkewYSlider = setupSlider(elementName + "SkewY", -80, 80, function() { me.Update(); });
}

function BorderSetting(elementName, getUpdateBoxDelegate, afterUpdateDelegate) {
	this.ElementName = elementName;
	this.GetUpdateBox = getUpdateBoxDelegate;
	this.AfterUpdate = afterUpdateDelegate;
	
	this.Init = function(box) {
		box.BorderWidth = 0;
		box.BorderColor = "#000000";
		box.BorderSet = "";
	}
	
	this.Update = function() {
		var box = this.GetUpdateBox();
		var borderWidth = parseInt(dojo.byId(this.ElementName + "WidthText").value);
		var borderColor = dojo.byId(this.ElementName + "ColorText").value;
		if (borderWidth!=0 || borderColor.length>0) {
			if (borderColor.length==0) {
				borderColor = "#000000";
				dojo.byId(this.ElementName + "ColorText").value = borderColor;
			}
			var set = borderWidth+"px solid "+borderColor;
			box.Element.style.border = set;
			box.BorderSet = "border: " + set;
		}
		else {
			box.Element.style.border = "";
			box.BorderSet = "";
		}
		box.BorderWidth = borderWidth;
		box.BorderColor = borderColor;
		this.AfterUpdate(box);
	}

	this.Set = function(box) {
		dojo.byId(this.ElementName + "WidthText").value = box.BorderWidth;
		this.WidthSlider.attr("value", box.BorderWidth);
		dojo.byId(this.ElementName + "ColorText").value = box.BorderColor;
		this.ColorPalette.attr("value", box.BorderColor);
	}
	
	this.ToStyle = function(box) {
		if (box.BorderSet.length > 0)
			return box.BorderSet + ";\r\n";
		else
			return "";
	}

	var me = this;
	this.WidthSlider = setupSlider(elementName + "Width", 0, 50, function() { me.Update(); });
	this.ColorPalette = setupColorPalette(elementName + "Color", function() { me.Update(); });
}

function BackgroundSetting(elementName, getUpdateBoxDelegate, afterUpdateDelegate) {
	this.ElementName = elementName;
	this.GetUpdateBox = getUpdateBoxDelegate;
	this.AfterUpdate = afterUpdateDelegate;
	
	this.Init = function(box) {
		box.BackgroundColor = "#DDDDDD";
		box.BackgroundSet = "";
	}
	
	this.Update = function() {
		var box = this.GetUpdateBox();
		var backgroundColor = dojo.byId(this.ElementName + "ColorText").value;
		box.Element.style.backgroundColor = backgroundColor;
		if (backgroundColor.length > 0)
			box.BackgroundSet = "background-color: " + backgroundColor;
		else
			box.BackgroundSet = "";
		box.BackgroundColor = backgroundColor;
		this.AfterUpdate(box);
	}

	this.Set = function(box) {
		dojo.byId(this.ElementName + "ColorText").value = box.BackgroundColor;
		this.ColorPalette.attr("value", box.BackgroundColor);
	}
	
	this.ToStyle = function(box) {
		if (box.BackgroundSet.length > 0)
			return box.BackgroundSet + ";\r\n";
		else
			return "";
	}

	var me = this;
	this.ColorPalette = setupColorPalette(elementName + "Color", function() { me.Update(); });
}

function OpacitySetting(elementName, getUpdateBoxDelegate, afterUpdateDelegate) {
	this.ElementName = elementName;
	this.GetUpdateBox = getUpdateBoxDelegate;
	this.AfterUpdate = afterUpdateDelegate;
	
	this.Init = function(box) {
		box.Opacity = "1.0";
		box.OpacitySet = "";
	}
	
	this.Update = function() {
		var box = this.GetUpdateBox();
		var set;
		var opacity = dojo.byId(this.ElementName + "Text").value;
		if (opacity.length > 0 && opacity != "1.0" && opacity != "1") {
			set = parseFloat(opacity);
			box.OpacitySet = "opacity: " + set;
		}
		else {
			set = "1.0";
			box.OpacitySet = "";
		}
		box.Opacity = set;
		box.Element.style.opacity = set;
		this.AfterUpdate(box);
	}

	this.Set = function(box) {
		dojo.byId(this.ElementName + "Text").value = box.Opacity;
		this.Slider.attr("value", box.Opacity*10);
	}
	
	this.ToStyle = function(box) {
		if (box.OpacitySet.length > 0)
			return box.OpacitySet + ";\r\n";
		else
			return "";
	}

	var me = this;
	this.Slider = setupSlider(elementName, 0, 1, function() { me.Update(); });
}

function TextSetting(elementName, getUpdateBoxDelegate, afterUpdateDelegate) {
	this.ElementName = elementName;
	this.GetUpdateBox = getUpdateBoxDelegate;
	this.AfterUpdate = afterUpdateDelegate;
	
	this.Init = function(box) {
		box.TextSize = 12;
		box.TextFont = "Verdana, Geneva, sans-serif";
		box.TextBold = false;
		box.TextItalic = false;
		box.TextColor = "#888888";
		box.TextAlignment = "Center";
		box.TextSet = "";
	}
	
	this.Update = function() {
		var box = this.GetUpdateBox();
		var textSize = parseInt(dojo.byId(this.ElementName + "SizeText").value);
		var textColor = dojo.byId(this.ElementName + "ColorText").value;
		var textAlign = dojo.byId(this.ElementName + "Alignment").options[dojo.byId(this.ElementName + "Alignment").selectedIndex].value;
		var fontFamily = this.FontComboBox.attr("value");
		var textBold = dojo.byId(this.ElementName + "Bold").checked;
		var textItalic = dojo.byId(this.ElementName + "Italic").checked;
		
		var el = box.Element;
		el.style.fontSize = textSize + "pt";
		el.style.color = textColor;
		el.style.textAlign = textAlign.toLowerCase();
		if (fontFamily.length > 0)
			el.style.fontFamily = fontFamily;
		el.style.fontWeight = textBold ? "bold":"";
		el.style.fontStyle = textItalic ? "italic":"";
		
		var set = "";
		if (fontFamily.length > 0)
			set += "font-family: " + fontFamily + ";\r\n";
		if (textBold)
			set += "font-weight: bold;\r\n";
		if (textItalic)
			set += "font-style: italic;\r\n";
		set += "font-size: " + textSize + "pt;\r\n";
		set += "color: " + textColor + ";\r\n";
		set += "text-align: " + textAlign.toLowerCase();
		box.TextSet = set;
		box.TextSize = textSize;
		box.TextFont = fontFamily;
		box.TextBold = textBold;
		box.TextItalic = textItalic;
		box.TextColor = textColor;
		box.TextAlignment = textAlign;
		this.AfterUpdate(box);
	}

	this.Set = function(box) {
		this.SizeSlider.attr("value", box.TextSize);
		this.FontComboBox.attr("value", box.TextFont);
		dojo.byId(this.ElementName + "Bold").checked = box.TextBold;
		dojo.byId(this.ElementName + "Italic").checked = box.TextItalic;
		dojo.byId(this.ElementName + "ColorText").value = box.TextColor;
		var el = dojo.byId(this.ElementName + "Alignment");
		for (var optionIndex = 0; optionIndex < el.options.length && el.options[optionIndex].text!=box.TextAlignment; optionIndex++) ;
		if (optionIndex < el.options.length)
			el.selectedIndex = optionIndex;
	}
	
	this.ToStyle = function(box) {
		if (box.TextSet.length > 0)
			return box.TextSet + ";\r\n";
		else
			return "";
	}

	var me = this;
	this.SizeSlider = setupSlider(elementName + "Size", 4, 50, function() { me.Update(); });
	this.ColorPalette = setupColorPalette(elementName + "Color", function() { me.Update(); });
	this.FontComboBox = setupComboBox(elementName + "Font", function() { me.Update(); });
	dojo.byId(elementName + "Alignment").onchange = function() { me.Update(); };
	setupCheckBox(elementName + "Bold", function() { me.Update(); });
	setupCheckBox(elementName + "Italic", function() { me.Update(); });
}

function ContentSetting(elementName, getUpdateBoxDelegate, afterUpdateDelegate) {
	this.ElementName = elementName;
	this.GetUpdateBox = getUpdateBoxDelegate;
	this.AfterUpdate = afterUpdateDelegate;
	
	this.Init = function(box) {
		box.Content = dojo.byId(this.ElementName + "Text").value;
	}
	
	this.Update = function() {
		var box = this.GetUpdateBox();
		box.Content = dojo.byId(this.ElementName + "Text").value;
		box.Element.firstChild.nodeValue = dojo.byId(this.ElementName + "Text").value;
		this.AfterUpdate(box);
	}

	this.Set = function(box) {
		dojo.byId(this.ElementName + "Text").value = box.Content;
	}
	
	this.ToStyle = function(box) {
		return "";
	}

	var me = this;
	setupText(elementName + "Text", function() { me.Update(); });
}

function SingleNumberSetting(styleName, minValue, maxValue, unitSuffix, elementName, getUpdateBoxDelegate, afterUpdateDelegate) {
	this.StyleName = styleName;
	this.UnitSuffix = unitSuffix;
	this.ElementName = elementName;
	this.GetUpdateBox = getUpdateBoxDelegate;
	this.AfterUpdate = afterUpdateDelegate;
	
	this.StyleProperty = styleName;
	var find = this.StyleProperty.indexOf("-");
	while (find >= 0) {
		this.StyleProperty = this.StyleProperty.substring(0, find) + this.StyleProperty.substring(find+1, find+2).toUpperCase() + this.StyleProperty.substring(find+2);
		find = this.StyleProperty.indexOf("-");
	}
	
	this.Init = function(box) {
		box[this.StyleName] = 0;
		box[this.StyleName + "Set"] = "";
	}
	
	this.Update = function() {
		var box = this.GetUpdateBox();
		var set;
		var value = parseInt(dojo.byId(this.ElementName + "Text").value);
		if (value != 0 && !isNaN(value)) {
			if (this.UnitSuffix != null)
				set = value + this.UnitSuffix;
			else
				set = value;
			box[this.StyleName + "Set"] = this.StyleName + ": " + set;
		}
		else {
			set = "";
			box[this.StyleName + "Set"] = "";
		}
		box[this.StyleName] = value;
		box.Element.style[this.StyleProperty] = set;
		this.AfterUpdate(box);
	}

	this.Set = function(box) {
		dojo.byId(this.ElementName + "Text").value = box[this.StyleName];
		this.Slider.attr("value", box[this.StyleName]);
	}
	
	this.ToStyle = function(box) {
		if (box[this.StyleName + "Set"].length > 0)
			return box[this.StyleName + "Set"] + ";\r\n";
		else
			return "";
	}

	var me = this;
	this.Slider = setupSlider(elementName, minValue, maxValue, function() { me.Update(); });
}

function GradientBackgroundSetting(elementName, getUpdateBoxDelegate, afterUpdateDelegate) {
	this.ElementName = elementName;
	this.GetUpdateBox = getUpdateBoxDelegate;
	this.AfterUpdate = afterUpdateDelegate;
	
	this.Init = function(box) {
		box.GradientDirection = "";
		box.GradientFromColor = "#3333FF";
		box.GradientToColor = "#FFFF33";
		box.GradientSet = "";
	}
	
	this.Update = function(isUserTriggered) {
		var box = this.GetUpdateBox();
		var dir = dojo.byId(this.ElementName + "Direction");
		if (dir.selectedIndex == 0 && typeof(isUserTriggered)!="undefined" && isUserTriggered) {
			dir.selectedIndex = 1;
		}
		if (dir.selectedIndex > 0) {
			var set;
			var fromColor = dojo.byId(this.ElementName + "FromColorText").value;
			var toColor = dojo.byId(this.ElementName + "ToColorText").value;
			switch (dir.selectedIndex) {
			case 1:
				box.Element.style.backgroundImage = "-moz-linear-gradient(left, " + fromColor + ", " + toColor + ")";
				box.Element.style.backgroundImage = "-webkit-gradient(linear, left top, right top, color-stop(0.0, " + fromColor + "), color-stop(1.0, " + toColor + "))";
				set = "background-image: -moz-linear-gradient(left, " + fromColor + ", " + toColor + ")";
				set += ";<br />background-image: -webkit-gradient(linear, left top, right top, color-stop(0.0, " + fromColor + "), color-stop(1.0, " + toColor + "))";
				break;
			case 2:
				box.Element.style.backgroundImage = "-moz-linear-gradient(top, " + fromColor + ", " + toColor + ")";
				box.Element.style.backgroundImage = "-webkit-gradient(linear, left top, left bottom, color-stop(0.0, " + fromColor + "), color-stop(1.0, " + toColor + "))";
				set = "background-image: -moz-linear-gradient(top, " + fromColor + ", " + toColor + ")";
				set += ";<br />background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0.0, " + fromColor + "), color-stop(1.0, " + toColor + "))";
				break;
			case 3:
				box.Element.style.backgroundImage = "-moz-linear-gradient(-45deg, " + fromColor + ", " + toColor + ")";
				box.Element.style.backgroundImage = "-webkit-gradient(linear, left top, right bottom, color-stop(0.0, " + fromColor + "), color-stop(1.0, " + toColor + "))";
				set = "background-image: -moz-linear-gradient(-45deg, " + fromColor + ", " + toColor + ")";
				set += ";<br />background-image: -webkit-gradient(linear, left top, right bottom, color-stop(0.0, " + fromColor + "), color-stop(1.0, " + toColor + "))";
				break;
			case 4:
				box.Element.style.backgroundImage = "-moz-linear-gradient(225deg, " + fromColor + ", " + toColor + ")";
				box.Element.style.backgroundImage = "-webkit-gradient(linear, right top, left bottom, color-stop(0.0, " + fromColor + "), color-stop(1.0, " + toColor + "))";
				set = "background-image: -moz-linear-gradient(225deg, " + fromColor + ", " + toColor + ")";
				set += ";<br />background-image: -webkit-gradient(linear, right top, left bottom, color-stop(0.0, " + fromColor + "), color-stop(1.0, " + toColor + "))";
				break;
			case 5:
				box.Element.style.backgroundImage = "-moz-radial-gradient(center, ellipse, " + fromColor + ", " + toColor + ")";
				var height = box.Element.offsetHeight;
				box.Element.style.backgroundImage = "-webkit-gradient(radial, center center, 0, center center, " + height + ", color-stop(0.0, " + fromColor + "), color-stop(1.0, " + toColor + "))";
				set = "background-image: -moz-radial-gradient(center, ellipse, " + fromColor + ", " + toColor + ")";
				set += ";<br />background-image: -webkit-gradient(radial, center center, 0, center center, " + height + ", color-stop(0.0, " + fromColor + "), color-stop(1.0, " + toColor + "))";
				break;
			}
			box.GradientSet = set;
		}
		else {
			box.Element.style.backgroundImage = "";
			box.GradientSet = "";
		}
		this.AfterUpdate(box);
	}

	this.Set = function(box) {
		dojo.byId(this.ElementName + "ColorText").value = box.BackgroundColor;
		this.ColorPalette.attr("value", box.BackgroundColor);
	}
	
	this.ToStyle = function(box) {
		if (box.GradientSet.length > 0)
			return box.GradientSet + ";\r\n";
		else
			return "";
	}

	var me = this;
	this.FromColorPalette = setupColorPalette(elementName + "FromColor", function() { me.Update(true); });
	this.ToColorPalette = setupColorPalette(elementName + "ToColor", function() { me.Update(true); });
	dojo.byId(elementName + "Direction").onchange = function() { me.Update(); };
}

function Box() {
	var me = this;
	
	for (var setting in settings) {
		settings[setting].Init(this);
	}
	
	var div = document.createElement("DIV");
	div.id = "current" + boxUniqueId;
	div.innerHTML = this.Content;
	div.style.position = "absolute";
	if (current==null) {
		div.style.left = "100px";
		div.style.top = "100px";
		div.style.width = "300px";
		div.style.height = "150px";
	}
	else {
		div.style.left = (parseInt(current.Element.style.left)+20) + "px";
		div.style.top = (parseInt(current.Element.style.top)+20) + "px";
		div.style.width = current.Element.style.width;
		div.style.height = current.Element.style.height;
	}
	div.style.cursor = "move";
	dojo.query(div).connect("onmousedown", function() {
		if (current != me) {
			current = me;
			SetControls(current);
			Flash(current);
		}
	});
	dojo.byId("content").appendChild(div);
	this.Element = div;
	boxUniqueId++;

	var moveable = new dojo.dnd.Moveable(this.Element);
	moveable.onMoveStop = function(mover, leftTop) {
		OutputSource();
	};
	
	var resize = new dojox.layout.ResizeHandle({
		targetId: this.Element.id,
		minWidth: 5,
		minHeight: 5
	});
	resize.activeResize = true;
	resize.animateSizing = false;
	resize.placeAt(this.Element.id);
	resize.onResize = function(ev) {
		OutputSource();
	};
	var resizeDiv = div.childNodes[div.childNodes.length-1];
	resizeDiv.style.visibility = "hidden";
	dojo.connect(this.Element, "onmouseover", function() { 
		var resizeDiv = div.childNodes[div.childNodes.length-1];
		resizeDiv.style.visibility = "visible";
	});
	dojo.connect(this.Element, "onmouseout", function() { 
		var resizeDiv = div.childNodes[div.childNodes.length-1];
		resizeDiv.style.visibility = "hidden";
	});
}

function setupSlider(baseName, minValue, maxValue, updateFunc) {
	var textEl = dojo.byId(baseName + "Text");
	var scale = 1;
	if (textEl.value.indexOf(".") >= 0) {
		var digitCount = textEl.value.length - textEl.value.indexOf(".") - 1;
		while (digitCount > 0) {
			scale *= 10;
			digitCount--;
		}
	}
	var defaultValue = parseInt(textEl.value);

	var slider = new dijit.form.HorizontalSlider({
		name: baseName+"SliderWidget",
		value: defaultValue*scale,
		minimum: minValue*scale,
		maximum: maxValue*scale,
		discreteValues: maxValue*scale-minValue*scale+1,
		intermediateChanges: true,
		style: "margin-top: 3px;",
		onChange: function(value) {
			dojo.byId(baseName + "Text").value = value / scale;
			updateFunc();
		}
	}, baseName + "Slider");
	
	dojo.query("#" + baseName + "Text").connect("onkeyup", function() {
		if (textEl.value.length > 0) {
			var value = null;
			if (scale==1) {
				value = parseInt(textEl.value);
			}
			if (value != null && !isNaN(value)) {
				if (value >= slider.attr("minimum") && value <= slider.attr("maximum"))
					slider.attr("value", value);
				updateFunc();
			} 
		}
	});
	
	return slider;
}

function setupColorPalette(baseName, updateFunc) {
	dojo.query("#" + baseName + "Text").connect("onkeyup", updateFunc);
	return new dijit.ColorPalette({
		palette: "7x10",
		onChange: function(value) {
			dojo.byId(baseName + "Text").value = value.toUpperCase();
			updateFunc();
		}
	}, baseName + "Palette");
}

function setupText(elementName, updateFunc) {
	dojo.query("#" + elementName).connect("onkeyup", updateFunc);
}

function setupComboBox(elementName, updateFunc) {
	return new dijit.form.ComboBox({
		onChange: function() {
			updateFunc();
		},
		onKeyUp: function() {
			updateFunc();
		}
	}, elementName);
}

function setupCheckBox(elementName, updateFunc) {
	dojo.query("#" + elementName).connect("onclick", updateFunc);
}
