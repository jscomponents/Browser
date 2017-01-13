/**
 *
 * Objeto Literal Browser. Documentacao completa disponivel em: 
 * http://code.google.com/p/jscomponentes/wiki/Browser
 *
 * Browser.js
 * http://jscomponentes.googlecode.com/svn/trunk/Browser/js/Browser/Browser.js
 * @author: Edy Segura - edy@segura.pro.br
 *
 */
var Browser = {
	
	//atributos publicos
	name    : navigator.appName,
	ua      : navigator.userAgent.toLowerCase(),
	version : parseFloat(navigator.appVersion.substr(21)) || parseFloat(navigator.appVersion),
	java    : navigator.javaEnabled(),
	win     : navigator.platform == 'Win32',
	dom     : (document.createElement && document.getElementById) ? true : false,
	
	//search engine's
	isAddSearchProvider : (window.external && ("AddSearchProvider" in window.external)) ? true : false,
	isAddSearchEngine   : (window.sidebar && ("addSearchEngine" in window.sidebar)) ? true : false,
	
	
	addBookmark: function(location, title) {
		location = (location) ? location : document.location.href;
		title    = (title) ? title : document.title;
		
		if(Browser.isIE) {
			window.external.AddFavorite(location, title);
		}
		else if(typeof window.sidebar == "object" && typeof window.sidebar.addPanel == "function") {
      window.sidebar.addPanel(title, location, "");
		}
		else {
			if(confirm("Seu navegador não suporta a extensão sidebar. Você quer fazer o upgrade agora?")) {
				document.location.href = "http://getfirefox.com/";
			}
		}
	},
	
	
	installSearchEngine: function() {
		var urlSearch = arguments[0];
		var urlIcon   = arguments[1];
		var title     = arguments[2];
		var msgError  = "Your browser not supported search engine.";
		
		if(arguments.length == 1) {
			// Firefox 2 and IE 7, OpenSearch
			if(window.external && ("AddSearchProvider" in window.external)) {
				window.external.AddSearchProvider(urlSearch);
			}
			else {
				alert(msgError);
			}
		}
		else if(arguments.length == 3) {
			//Firefox <= 1.5, Sherlock
			if(window.sidebar && ("addSearchEngine" in window.sidebar)) {
				window.sidebar.addSearchEngine(urlSearch, urlIcon, title, "");
			}
			else {
				alert(msgError);
			}
		}
		
	},
	
	
	getPageSize: function() {
		var scrollX, scrollY, pageSize;
		var viewWidth, viewHeight;
		var pageWidth, pageHeight;
		
		if(window.innerHeight && window.scrollMaxY) {	
			scrollX = document.body.scrollWidth;
			scrollY = window.innerHeight + window.scrollMaxY;
		} 
		else if(document.body.scrollHeight > document.body.offsetHeight){
			scrollX = document.body.scrollWidth;
			scrollY = document.body.scrollHeight;
		} 
		else { 
			scrollX = document.body.offsetWidth;
			scrollY = document.body.offsetHeight;
		}
		
		if(self.innerHeight) {
			viewWidth  = self.innerWidth;
			viewHeight = self.innerHeight;
		} 
		else if(document.documentElement && document.documentElement.clientHeight) { 
			viewWidth  = document.documentElement.clientWidth;
			viewHeight = document.documentElement.clientHeight;
		} 
		else if(document.body) {
			viewWidth  = document.body.clientWidth;
			viewHeight = document.body.clientHeight;
		}
		
		//coordenada X
		if(scrollX < viewWidth){	
			pageWidth = viewWidth;
		} 
		else {
			pageWidth = scrollX;
		}
		
		//coordenada Y
		if(scrollY < viewHeight){
			pageHeight = viewHeight;
		} 
		else { 
			pageHeight = scrollY;
		}
		
		//retorna objeto
		return pageSize = {
			pageWidth  : pageWidth,
			pageHeight : pageHeight,
			viewWidth  : viewWidth,
			viewHeight : viewHeight
		};
		
	},

	
	getScroll: function() {
		var scrollX = 0, scrollY = 0, pageScroll;
		
		if(self.pageYOffset) {
			scrollX = self.pageXOffset;
			scrollY = self.pageYOffset;
		}
		else if(document.documentElement && document.documentElement.scrollTop) {
			scrollX = document.documentElement.scrollLeft;
			scrollY = document.documentElement.scrollTop;
		}
		else if(document.body) {
			scrollX = document.body.scrollLeft;
			scrollY = document.body.scrollTop;
		}
		
		//retorna objeto
		return pageScroll = {
			x : scrollX,
			y : scrollY
		};
		
	}
	
};

//atributos publicos do objeto literal Browser
Browser.isSafari  = Browser.ua.indexOf("safari") >= 0;
Browser.isOpera   = Browser.ua.indexOf("opera")  >= 0;
Browser.isMac     = Browser.ua.indexOf("mac")    >= 0;
Browser.isGecko   = Browser.ua.indexOf("gecko")  >= 0;
Browser.isFirefox = !Browser.isOpera && !Browser.isSafari && (Browser.name == "Netscape");
Browser.isIE      = !Browser.isOpera && (Browser.name == "Microsoft Internet Explorer");
Browser.isIE6     = Browser.isIE && Browser.ua.indexOf("msie 6.0") >= 0;
Browser.isIE7     = Browser.isIE && Browser.ua.indexOf("msie 7.0") >= 0;
