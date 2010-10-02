var boxUniqueId = 1;
var hasTouchSupport = typeof(document.ontouchstart)!="undefined" && document.addEventListener;

function SetStyleForAll(box, name, set) {
	var capName = name.substring(0, 1).toUpperCase() + name.substring(1);
	var findHyphen = capName.indexOf("-");
	while (findHyphen >= 0) {
		capName = capName.substring(0, findHyphen) + capName.substring(findHyphen+1, findHyphen+2).toUpperCase() + capName.substring(findHyphen+2);
		findHyphen = capName.indexOf("-");
	}
	
	box.Element.style["Webkit" + capName] = set;
	box.Element.style["Moz" + capName] = set;
	box.Element.style[capName.substring(0, 1).toLowerCase() + capName.substring(1)] = set;
	
	var styleStr = "-webkit-" + name + ": " + set;
	styleStr += ";\r\n-moz-" + name + ": " + set;
	styleStr += ";\r\n" + name + ": " + set;
	return styleStr;
}

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
		if (transformScale.length > 0 && transformScale!="1.0" && transformScale!="1") {
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
		box.Element.firstChild.innerHTML = dojo.byId(this.ElementName + "Text").value;
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
	this.Flag = false;
	
	this.Init = function(box) {
		box.GradientDirection = -1;
		box.GradientFromColor = "#3333FF";
		box.GradientFromPosition = 0;
		box.GradientToColor = "#FFFF33";
		box.GradientToPosition = 100;
		box.GradientSet = "";
	}
	
	function percentToScale(percent) {
		if (percent==100)
			return "1.0";
		else if (percent<10)
			return "0.0" + percent;
		
		var str = "0." + percent;
		if (str.substring(str.length-1, str.length)=="0")
			str = str.substring(0, str.length-1);
		return str;
	}
	
	this.Update = function(isCodeUpdate) {
		var box = this.GetUpdateBox();
		var dir = dojo.byId(this.ElementName + "Direction");
		box.GradientDirection = dir.selectedIndex;
		if (dir.selectedIndex > 0) {
			var set;
			var fromColor = dojo.byId(this.ElementName + "FromColorText").value;
			var fromPosition = parseInt(dojo.byId(this.ElementName + "FromPositionText").value);
			if (isNaN(fromPosition) || fromPosition<0 || fromPosition>100)
				fromPosition = 0;
			var toColor = dojo.byId(this.ElementName + "ToColorText").value;
			var toPosition = parseInt(dojo.byId(this.ElementName + "ToPositionText").value);
			if (isNaN(toPosition) || toPosition<0 || toPosition>100)
				toPosition = 100;
			box.GradientFromColor = fromColor;
			box.GradientFromPosition = fromPosition;
			box.GradientToColor = toColor;
			box.GradientToPosition = toPosition;
			
			var mozFrom = fromColor, mozTo = toColor;
			if (fromPosition!=0)
				mozFrom += " " + fromPosition + "%";
			if (toPosition!=100)
				mozTo += " " + toPosition + "%";
			var mozColors = mozFrom + ", " + mozTo;
			
			var webkitColors = "color-stop(" + percentToScale(fromPosition) + ", " + fromColor + 
				"), color-stop(" + percentToScale(toPosition) + ", " + toColor + ")";
			
			switch (dir.selectedIndex) {
			case 1:
				box.Element.style.backgroundImage = "-moz-linear-gradient(left, " + mozColors + ")";
				box.Element.style.backgroundImage = "-webkit-gradient(linear, left top, right top, " + webkitColors + ")";
				set = "background-image: -moz-linear-gradient(left, " + mozColors + ")";
				set += ";\r\nbackground-image: -webkit-gradient(linear, left top, right top, " + webkitColors + ")";
				break;
			case 2:
				box.Element.style.backgroundImage = "-moz-linear-gradient(top, " + mozColors + ")";
				box.Element.style.backgroundImage = "-webkit-gradient(linear, left top, left bottom, " + webkitColors + ")";
				set = "background-image: -moz-linear-gradient(top, " + mozColors + ")";
				set += ";\r\nbackground-image: -webkit-gradient(linear, left top, left bottom, " + webkitColors + ")";
				break;
			case 3:
				box.Element.style.backgroundImage = "-moz-linear-gradient(-45deg, " + mozColors + ")";
				box.Element.style.backgroundImage = "-webkit-gradient(linear, left top, right bottom, " + webkitColors + ")";
				set = "background-image: -moz-linear-gradient(-45deg, " + mozColors + ")";
				set += ";\r\nbackground-image: -webkit-gradient(linear, left top, right bottom, " + webkitColors + ")";
				break;
			case 4:
				box.Element.style.backgroundImage = "-moz-linear-gradient(225deg, " + mozColors + ")";
				box.Element.style.backgroundImage = "-webkit-gradient(linear, right top, left bottom, " + webkitColors +")";
				set = "background-image: -moz-linear-gradient(225deg, " + mozColors + ")";
				set += ";\r\nbackground-image: -webkit-gradient(linear, right top, left bottom, " + webkitColors + ")";
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
		dojo.byId(this.ElementName + "Direction").selectedIndex = box.GradientDirection;
		dojo.byId(this.ElementName + "FromColorText").value = box.GradientFromColor;
		this.FromColorPalette.attr("value", box.GradientFromColor);
		this.FromPositionSlider.attr("value", box.GradientFromPosition);
		dojo.byId(this.ElementName + "ToColorText").value = box.GradientToColor;
		this.ToColorPalette.attr("value", box.GradientToColor);
		this.ToPositionSlider.attr("value", box.GradientToPosition);
	}
	
	this.ToStyle = function(box) {
		if (box.GradientSet.length > 0)
			return box.GradientSet + ";\r\n";
		else
			return "";
	}
	
	this.ForceDirection = function() {
		var dir = dojo.byId(this.ElementName + "Direction");
		if (dir.selectedIndex==0)
			dir.selectedIndex = 2;
	}

	var me = this;
	this.FromColorPalette = setupColorPalette(elementName + "FromColor", function() { me.Update(); }, function() { me.ForceDirection(); });
	this.FromPositionSlider = setupSlider(elementName + "FromPosition", 0, 100, function() { me.Update(); });
	this.ToColorPalette = setupColorPalette(elementName + "ToColor", function() { me.Update(); }, function() { me.ForceDirection(); });
	this.ToPositionSlider = setupSlider(elementName + "ToPosition", 0, 100, function() { me.Update(); });
	dojo.byId(elementName + "Direction").onchange = function() { me.Update(); };
}

function OutlineSetting(elementName, getUpdateBoxDelegate, afterUpdateDelegate) {
	this.ElementName = elementName;
	this.GetUpdateBox = getUpdateBoxDelegate;
	this.AfterUpdate = afterUpdateDelegate;
	
	this.Init = function(box) {
		box.OutlineWidth = 0;
		box.OutlineColor = "#000000";
		box.OutlineOffset = 0;
		box.OutlineSet = "";
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
			box.Element.style.outline = set;
			box.OutlineSet = "outline: " + set;
			
			var offset = parseInt(dojo.byId(this.ElementName + "OffsetText").value);
			if (offset!=0) {
				box.Element.style.outlineOffset = offset + "px";
				box.OutlineSet += ";\r\noutline-offset: " + offset + "px";
				box.OutlineOffset = offset;
			}
			else {
				box.Element.style.outlineOffset = "";
				box.OutlineOffset = 0;
			}
		}
		else {
			box.Element.style.outline = "";
			box.Element.style.outlineOffset = "";
			box.OutlineSet = "";
		}
		box.OutlineWidth = borderWidth;
		box.OutlineColor = borderColor;
		this.AfterUpdate(box);
	}

	this.Set = function(box) {
		dojo.byId(this.ElementName + "WidthText").value = box.OutlineWidth;
		this.WidthSlider.attr("value", box.OutlineWidth);
		dojo.byId(this.ElementName + "OffsetText").value = box.OutlineOffset;
		this.OffsetSlider.attr("value", box.OutlineOffset);
		dojo.byId(this.ElementName + "ColorText").value = box.OutlineColor;
		this.ColorPalette.attr("value", box.OutlineColor);
	}
	
	this.ToStyle = function(box) {
		if (box.OutlineSet.length > 0)
			return box.OutlineSet + ";\r\n";
		else
			return "";
	}

	var me = this;
	this.WidthSlider = setupSlider(elementName + "Width", 0, 50, function() { me.Update(); });
	this.OffsetSlider = setupSlider(elementName + "Offset", 0, 50, function() { me.Update(); });
	this.ColorPalette = setupColorPalette(elementName + "Color", function() { me.Update(); });
}

function ColumnSetting(elementName, getUpdateBoxDelegate, afterUpdateDelegate) {
	this.ElementName = elementName;
	this.GetUpdateBox = getUpdateBoxDelegate;
	this.AfterUpdate = afterUpdateDelegate;
	
	this.Init = function(box) {
		box.ColumnCount = 1;
		box.ColumnGap = 5;
		box.ColumnRuleWidth = 0;
		box.ColumnRuleColor = "#000000";
		box.ColumnSet = "";
	}
	
	this.Update = function() {
		var box = this.GetUpdateBox();
		var columnCount = parseInt(dojo.byId(this.ElementName + "CountText").value);
		if (columnCount>1) {
			var set = columnCount;
			box.ColumnSet = SetStyleForAll(box, "column-count", set);
			box.ColumnCount = columnCount;
			
			var columnGapString = dojo.byId(this.ElementName + "GapText").value;
			var columnGap = parseInt(columnGapString);
			if (columnGapString.length > 0 && !isNaN(columnGap)) {
				set = columnGap + "px";
				box.ColumnSet += ";\r\n" + SetStyleForAll(box, "column-gap", set);
				box.ColumnGap = columnGap;
			}
			else {
				SetStyleForAll(box, "column-gap", "");
				box.ColumnGap = "";
			}
			
			var ruleWidth = parseInt(dojo.byId(this.ElementName + "RuleWidthText").value);
			if (ruleWidth!=0 && !isNaN(ruleWidth)) {
				var ruleColor = dojo.byId(this.ElementName + "RuleColorText").value;
				set = ruleWidth + "px solid " + ruleColor;
				box.ColumnSet += ";\r\n" + SetStyleForAll(box, "column-rule", set);
				box.ColumnRuleWidth = ruleWidth;
				box.ColumnRuleColor = ruleColor;
			}
			else {
				SetStyleForAll(box, "column-rule", "");
				box.ColumnRuleWidth = 0;
			}
		}
		else {
			SetStyleForAll(box, "column-count", "");
			SetStyleForAll(box, "column-gap", "");
			SetStyleForAll(box, "column-rule", "");
			box.ColumnSet = "";
			box.ColumnCount = 1;
		}
		this.AfterUpdate(box);
	}
	
	this.Set = function(box) {
		dojo.byId(this.ElementName + "CountText").value = box.ColumnCount;
		this.CountSlider.attr("value", box.ColumnCount);
		dojo.byId(this.ElementName + "GapText").value = box.ColumnGap;
		this.GapSlider.attr("value", box.ColumnGap);
		dojo.byId(this.ElementName + "RuleWidthText").value = box.ColumnRuleWidth;
		this.RuleWidthSlider.attr("value", box.ColumnRuleWidth);
		dojo.byId(this.ElementName + "RuleColorText").value = box.ColumnRuleColor;
		this.RuleColorPalette.attr("value", box.ColumnRuleColor);
	}
	
	this.ToStyle = function(box) {
		if (box.ColumnSet.length > 0)
			return box.ColumnSet + ";\r\n";
		else
			return "";
	}

	var me = this;
	this.CountSlider = setupSlider(elementName + "Count", 1, 10, function() { me.Update(); });
	this.GapSlider = setupSlider(elementName + "Gap", 0, 50, function() { me.Update(); });
	this.RuleWidthSlider = setupSlider(elementName + "RuleWidth", 0, 50, function() { me.Update(); });
	this.RuleColorPalette = setupColorPalette(elementName + "RuleColor", function() { me.Update(); });
}

function Box() {
	var me = this;
	
	for (var setting in settings) {
		settings[setting].Init(this);
	}
	
	var div = document.createElement("DIV");
	div.id = "current" + boxUniqueId;
	div.innerHTML = "<div>" + this.Content + "</div>";
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
	div.className = "box";
	//div.style.cursor = "move";
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
	
	if (!hasTouchSupport) {
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
			else {
				value = parseFloat(textEl.value)*scale;
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

function setupColorPalette(baseName, updateFunc, clickFunc) {
	dojo.query("#" + baseName + "Text").connect("onkeyup", updateFunc);
	return new dijit.ColorPalette({
		palette: "7x10",
		onChange: function(value) {
			dojo.byId(baseName + "Text").value = value.toUpperCase();
			updateFunc();
		},
		onMouseDown: function() {
			if (typeof(clickFunc)!="undefined")
				clickFunc();
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
