/**
 *
 * Objeto Literal Index para uso do componente Browser.js
 * @author: Edy Segura - edy@segura.pro.br
 *
 */
var Index = {
	
	init: function() {
		Index.buildTable();
		Index.createButtons();
		Index.setWinResize();
	},
	
	
	setWinResize: function() {
		Index.getPageSize();
		Index.getPageScroll();
		window.onresize = Index.getPageSize;
		window.onscroll = Index.getPageScroll;
	},
	
	
	createButtons: function() {
		var button1 = document.createElement('button'),
		    button2 = document.createElement('button'),
		    button3 = document.createElement('button');
		
		button1.onclick = function() {
			if(Browser && Browser.addBookmark) {
				Browser.addBookmark("http://edysegura.com", "Edy Segura");
			}
		}
		
		button2.onclick = function() {
			if(Browser && Browser.isAddSearchProvider) {
				Browser.installSearchEngine("http://files.edysegura.com/xml/opensearch/edysegura.com.xml");
			}
		}
		
		button3.onclick = function() {
			if(Browser && Browser.isAddSearchEngine) {
				Browser.installSearchEngine("http://files.edysegura.com/xml/sherlock/edysegura.com.src", 
                                    "http://us.i1.yimg.com/us.yimg.com/i/yg/img/logo/favicon.ico",  
                                    "Edy Search");
			}
		}
		
		button1.appendChild(document.createTextNode('Adicionar ao favoritos'));
		document.body.appendChild(button1);
		
		if(Browser.isAddSearchProvider) {
			button2.appendChild(document.createTextNode('Adicionar search engine (OpenSearch)'));
			document.body.appendChild(button2);
		}
		
		if(Browser.isAddSearchProvider) {
			button3.appendChild(document.createTextNode('Adicionar search engine (Sherlock)'));
			document.body.appendChild(button3);
		}
		
	},
	
	
	buildTable: function() {
		var table = document.getElementById('properties'),
		    tbody = table.appendChild(document.createElement('tbody')),
		    pattern = /addBookmark|installSearchEngine|getPageSize|getScroll/,
				row, cellProperty, cellValue;
		
		//percorrendo o objeto Browser
		for(var property in Browser) {
			if(pattern.test(property)) continue;
			
			row          = tbody.insertRow(tbody.rows.length);
			cellProperty = row.insertCell(row.cells.length);
			cellValue    = row.insertCell(row.cells.length);
			
			cellProperty.innerHTML = property;
			cellValue.innerHTML    = Browser[property];
		}
		
		table.removeChild(table.tBodies[0]);
	},
	
	
	getPageSize: function() {
		var pageSize   = Browser.getPageSize(),
		    pageWidth  = document.getElementById('pageWidth'),
		    pageHeight = document.getElementById('pageHeight'),
		    viewWidth  = document.getElementById('viewWidth'),
		    viewHeight = document.getElementById('viewHeight');
		
		pageWidth.innerHTML  = pageSize.pageWidth;
		pageHeight.innerHTML = pageSize.pageHeight;
		viewWidth.innerHTML  = pageSize.viewWidth;
		viewHeight.innerHTML = pageSize.viewHeight;
	},
	
	
	getPageScroll: function() {
		var pageScroll = Browser.getScroll(),
		    scrollTop  = document.getElementById("scrollTop"),
		    scrollLeft = document.getElementById("scrollLeft");
		
		scrollLeft.innerHTML = pageScroll.x;
		scrollTop.innerHTML  = pageScroll.y;
	}
	
};

//inicializacao
window.onload = Index.init;
