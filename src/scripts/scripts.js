var nav = document.querySelectorAll('.navigation')
var navItem = document.querySelectorAll('.navigation_list_item')
var btnNavigation = document.querySelectorAll('.navigation_btn');
var btnLine = document.querySelectorAll('.navigation_btn_line');

var navModule = (function() {
	var _init = function() {
		_eventListeners()
	};

	var _eventListeners = function(event) {
		for (var btn of btnNavigation) {
			btn.addEventListener('click', _clickGumb)
		};
	};
	
	var _clickGumb = function() {
		for (var i = 0; i<btnLine.length; i++) {
			btnLine[i].classList.toggle('_active');	
		};

		nav[0].classList.toggle('_active');

		for (var i = 0; i<navItem.length; i++) {
			navItem[i].classList.toggle('_active');	
		};
	};
	return {
		init: _init
	};
})();

btnNavigation && navModule.init();