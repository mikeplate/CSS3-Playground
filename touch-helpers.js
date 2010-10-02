TouchHelpers = {
	IsSupported : (typeof(document.ontouchstart)!="undefined" && window.addEventListener) ? true:false,
	
	IsAnyMatch :  function(srcArray, cmpArray) {
		for (var i = 0; i<srcArray.length; i++) {
			for (var j = 0; j<cmpArray.length; j++) {
				if (srcArray[i]==cmpArray[j])
					return true;
			}
		}
		return false;
	}
};

function TouchScroller(mainElement, excludedClassNames) {
	if (!TouchScroller.IsInitialized) {
		TouchScroller.IsInitialized = true;
		if (TouchHelpers.IsSupported) {
			document.addEventListener("touchstart", function(e) { if (TouchScroller.Hold) e.preventDefault(); }, false);
			document.addEventListener("touchmove", function(e) { if (TouchScroller.Hold) e.preventDefault(); }, false);
		}
	}
	
	var _element = mainElement;
	var _touchStart = 0;
	var _scrollStart = 0;
	var _documentMouseUp = null;
	var _documentMouseMove = null;
	var _excludedClassNames = excludedClassNames ? (typeof(excludedClassNames)=="string" ? [excludedClassNames] : excludedClassNames) : null;
	
	function isAnyMatch(srcArray, cmpArray) {
		for (var i = 0; i<srcArray.length; i++) {
			for (var j = 0; j<cmpArray.length; j++) {
				if (srcArray[i]==cmpArray[j])
					return true;
			}
		}
		return false;
	}

	function isParentExcluded(parentEl) {
		while (parentEl && parentEl!=_element) {
			if (parentEl.tagName && (parentEl.tagName=="INPUT" || parentEl.tagName=="TEXTAREA" || parentEl.tagName=="SELECT" || parentEl.tagName=="LABEL")) {
				return true;
			}
			if (_excludedClassNames!=null && typeof(parentEl.className)!="undefined" && parentEl.className 
				&& TouchHelpers.IsAnyMatch(parentEl.className.split(" "), _excludedClassNames)) {
				return true;
			}
			parentEl = parentEl.parentNode;
		}
		return false;
	}

	this.OnStart = function(ev) {
		if (isParentExcluded(ev.target))
			return;
		if (_element.scrollHeight <= _element.clientHeight)
			return;
		
		_scrollStart = _element.scrollTop;
		if (TouchHelpers.IsSupported) {
			_touchStart = ev.touches[0].clientY;
		}
		else {
			_touchStart = ev.clientY;

			var me = this;
			if (document.addEventListener) {
				_documentMouseUp = function(ev) { me.OnEnd(ev); };
				document.addEventListener("mouseup", _documentMouseUp, false);
				_documentMouseMove = function(ev) { me.OnMove(ev); };
				document.addEventListener("mousemove", _documentMouseMove, false);
			}
			else {
				_documentMouseUp = function() { me.OnEnd(window.event); };
				document.attachEvent("onmouseup", _documentMouseUp);
			}
		}
		
		TouchScroller.Hold = true;
		ev.preventDefault();
	}

	this.OnMove = function(ev) {
		if (TouchScroller.Hold) {
			var pos = TouchHelpers.IsSupported ? ev.touches[0].clientY : ev.clientY;
			var offset = pos - _touchStart;
			_element.scrollTop = _scrollStart - offset;
		}
	}

	this.OnEnd = function(ev) {
		TouchScroller.Hold = false;
		if (_documentMouseUp != null) {
			if (document.addEventListener)
				document.removeEventListener("mouseup", _documentMouseUp, false);
			else
				document.detachEvent("onmouseup", _documentMouseUp);
			_documentMouseUp = null;
		}
		if (_documentMouseMove != null) {
			if (document.addEventListener)
				document.removeEventListener("mousemove", _documentMouseMove, false);
			else
				document.detachEvent("onmousemove", _documentMouseMove);
			_documentMouseUp = null;
		}
	}
	
	this.OnWheel = function(ev) {
		var isDown = ev.detail ? ev.detail > 0 : ev.wheelDelta < 0;
		if (isDown)
			_element.scrollTop += 20;
		else
			_element.scrollTop -= 20;
	}

	var me = this;
	if (TouchHelpers.IsSupported) {
		if (_element.addEventListener) {
			_element.addEventListener("touchstart", function(ev) { me.OnStart(ev); }, true);
			_element.addEventListener("touchmove", function(ev) { me.OnMove(ev); }, true);
			_element.addEventListener("touchend", function(ev) { me.OnEnd(ev); }, true);
		}
		else {
			_element.attachEvent("ontouchstart", function() { me.OnStart(window.event); });
			_element.attachEvent("ontouchmove", function() { me.OnMove(window.event); });
			_element.attachEvent("ontouchend", function() { me.OnEnd(window.event); });
		}
	}
	else {
		if (_element.addEventListener) {
			_element.addEventListener("mousedown", function(ev) { me.OnStart(ev); }, true);
			_element.addEventListener("mousemove", function(ev) { me.OnMove(ev); }, true);
			_element.addEventListener("mouseup", function(ev) { me.OnEnd(ev); }, true);
			if (typeof(document.onmousewheel)=="undefined") {
				if (window.opera)
					_element.addEventListener("mousewheel", function(ev) { me.OnWheel(ev); }, false);
				else
					_element.addEventListener("DOMMouseScroll", function(ev) { me.OnWheel(ev); }, false);
			}
			else {
				_element.addEventListener("mousewheel", function(ev) { me.OnWheel(ev); }, false);
			}
		}
		else {
			_element.attachEvent("onmousedown", function() { me.OnStart(window.event); }, true);
			_element.attachEvent("onmousemove", function() { me.OnMove(window.event); }, true);
			_element.attachEvent("onmouseup", function() { me.OnEnd(window.event); }, true);
			_element.attachEvent("onmousewheel", function() { me.OnWheel(window.event); }, false);
		}
	}
}

TouchScroller.IsInitialized = false;
TouchScroller.Hold = false;

function TouchProxy(mainElement, proxiedClassNames) {
	var _element = mainElement;
	var _proxiedClassNames = proxiedClassNames ? (typeof(proxiedClassNames)=="string" ? [proxiedClassNames] : proxiedClassNames) : null;
	var touchActive = false;
	
	function isProxyTarget(el, classNames) {
		while (el != null) {
			if (el.className && TouchHelpers.IsAnyMatch(el.className.split(" "), classNames))
				return true;
			el = el.parentNode;
		}
		return false;
	}
	
	this.EventReceiver = function(event) {
		var touches = event.changedTouches, first = touches[0];
		
		if (!touchActive) {
			if (event.type!="touchstart" || event.touches.length>1 || !isProxyTarget(first.target, _proxiedClassNames))
				return;
			touchActive = true;
		}
		else if (event.type=="touchend") {
			touchActive = false;
		}

		var type;
		switch(event.type)
		{
			case "touchstart": type = "mousedown"; break;
			case "touchmove":  type = "mousemove"; break;        
			case "touchend":   type = "mouseup"; break;
			default: return;
		}
		
		var simulatedEvent = document.createEvent("MouseEvent");
		simulatedEvent.initMouseEvent(type, true, true, window, 1, first.screenX, first.screenY, first.clientX, first.clientY, 
			false, false, false, false, 0, null);
		first.target.dispatchEvent(simulatedEvent);
		event.preventDefault();
	}

	if (TouchHelpers.IsSupported) {
		var me = this;
		_element.addEventListener("touchstart", function(ev) { me.EventReceiver(ev); }, true);
		_element.addEventListener("touchmove", function(ev) { me.EventReceiver(ev); }, true);
		_element.addEventListener("touchend", function(ev) { me.EventReceiver(ev); }, true);
	}
}
