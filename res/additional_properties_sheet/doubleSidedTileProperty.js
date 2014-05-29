sap.designstudio.sdk.PropertyPage.subclass("com.sample.utilities.DoubleSidedTilePropertyPage",  function() {
	var that = this;
	this.frontHTMLEditor = null;
	this.backHTMLEditor = null;
	this.jsEditor = null;
	this.rendered = false;
	this.splitter = null;
	this.frontHTMLPlaceholder = null;
	this.backHTMLPlaceholder = null;
	this.jsPlaceholder = null;
	
	// 	this.callRuntimeHandler("sampleFunction", "arg1", "arg2");
	
	this.componentSelected = function(){
		//alert("!");
	};
	this.afterRendering = function(){
		// HTML Editor
		this.frontHTMLEditor = CodeMirror(function(e){
			that.frontHTMLPlaceholder.$().css({overflowX : "hide"});
			that.frontHTMLPlaceholder.getDomRef().appendChild(e);
		},{
			lineNumbers: true,
			mode: "text/html",
			theme: "eclipse",
			matchBrackets: true
		});
		this.backHTMLEditor = CodeMirror(function(e){
			that.backHTMLPlaceholder.$().css({overflowX : "hide"});
			that.backHTMLPlaceholder.getDomRef().appendChild(e);
		},{
			lineNumbers: true,
			mode: "text/html",
			theme: "eclipse",
			matchBrackets: true
		});
		// JS Editor
		
		this.jsEditor = CodeMirror(function(e){
			that.jsPlaceholder.getDomRef().appendChild(e);
		},{
			lineNumbers: true,
			mode: "text/javascript",
			theme: "eclipse",
			matchBrackets: true
		});
		
		this.rendered = true;
	};
	this.init = function() {
		this.splitter = new sap.ui.commons.Splitter({});
		this.splitter.setSplitterOrientation(sap.ui.commons.Orientation.horizontal);
		this.splitter.setSplitterPosition("50%");
		this.splitter.setMinSizeFirstPane("20%");
		this.splitter.setMinSizeSecondPane("20%");
		this.splitter.setWidth("100%");
		this.splitter.setHeight("100%");

		this.frontHTMLPlaceholder = new sap.ui.core.HTML({
			content : "<div></div>",
			width: "100%",
			height: "100%"
		});
		this.backHTMLPlaceholder = new sap.ui.core.HTML({
			content : "<div></div>",
			width: "100%",
			height: "100%"
		});
		this.jsPlaceholder = new sap.ui.core.HTML({
			content : "<div></div>",
			width: "100%",
			height: "100%"
		});
		
		
		this.splitter.addFirstPaneContent(new sap.ui.commons.layout.BorderLayout({
			width: "100%",
			height: "100%",
			center: new sap.ui.commons.layout.BorderLayoutArea({
				content : [
				    this.frontHTMLPlaceholder,
				    this.backHTMLPlaceholder
				]
			}),
			top : new sap.ui.commons.layout.BorderLayoutArea({
				size : "30px",
				content : [
					new sap.ui.commons.Label({
						text : "HTML",
						design : sap.ui.commons.LabelDesign.Bold 
					})    
				]
			})           
		}));
		this.splitter.addSecondPaneContent(new sap.ui.commons.layout.BorderLayout({
			width: "100%",
			height: "100%",
			center: new sap.ui.commons.layout.BorderLayoutArea({
				content : [
				    this.jsPlaceholder
				]
			}),
			top : new sap.ui.commons.layout.BorderLayoutArea({
				size : "30px",
				content : [
					new sap.ui.commons.Label({
						text : "JavaScript",
						design : sap.ui.commons.LabelDesign.Bold 
					})    
				]
			}),
			bottom : new sap.ui.commons.layout.BorderLayoutArea({
				size : "30px",
				content : [
				new sap.ui.commons.Button({
					text:"Apply", 
					tooltip:"Apply",
					press: function(){
						that.firePropertiesChanged(["frontHTML"]);
						that.firePropertiesChanged(["backHTML"]);
						that.firePropertiesChanged(["afterInit"]);
					}
				})]
			})               
		}));
		this.splitter.placeAt("splitterDiv");
		this.splitter.addEventDelegate({
			onAfterRendering : function(o){
				return function() {
					o.afterRendering.call(o);
				};
			}(this)
		});
	};
	
	this.afterInit = function(value){
		if( value === undefined){
			return this.jsEditor.getValue();
		}else{
			if(this.rendered == true) this.jsEditor.setValue(value);
			return this;
		}
	};
	
	this.frontHTML = function(value) {
		if (value === undefined) {
			return this.frontHTMLEditor.getValue();
		}else{
			if(this.rendered == true) this.frontHTMLEditor.setValue(value);
			return this;
		}
	};
	this.backHTML = function(value) {
		if (value === undefined) {
			return this.backHTMLEditor.getValue();
		}else{
			if(this.rendered == true) this.backHTMLEditor.setValue(value);
			return this;
		}
	};
});