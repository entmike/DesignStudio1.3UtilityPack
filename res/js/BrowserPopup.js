jQuery.sap.require("sap.m.Button");
sap.m.Button.extend("com.sample.utilities.BrowserPopup", {
	_buttonType : "",
	_title : "",
	_dialog : null,
	_showHeader : true,
	_browserWidth : "auto",
	_browserHeight : "auto",
	_items : [],
	renderer : {},
	metadata : {				// Not to be confused with the Data Source metadata property
		properties : {
			title : "string",			// Title
			url : "string",				// URL
			buttonType : "string",		// 'type' in sap.m, but DS messes with it
			showHeader: "boolean",		// Show Browser Title
			browserWidth : "string",	// Browser Width
			browserHeight : "string",	// Browser Height
			browserIcon : "string",		// Browser Icon
			openMethod : "string",
			showCloseButton : "boolean",
			clickTrigger : "float",
			showButton : "boolean"
		}
	},
	setShowButton : function(b){
		this._showButton = b;
		if(this._showButton == true){
			this.removeStyleClass("invisible");
			this.removeStyleClass("designTimeInvisible");
			
		}else{
			if(!(sap && sap.zen && sap.zen.designmode)){
				this.addStyleClass("invisible");
			}else{
				this.addStyleClass("designTimeInvisible");
			}
		}
	},
	getShowButton : function(){
		return this._showButton;
	},
	setClickTrigger : function(f){
		if(f != 0.0) this.dsClick(null);	// Hack
	},
	getClickTrigger : function(){
		return Math.random();
	},
	setType : function(s){
		if(s=="sdkui5") return; // Fix 1.3 SP0 bug '"sdkui5" is not a valid entry of the enumeration for property "type" of Element'
		sap.m.Button.prototype.setType.apply(this,arguments);		
	},
	setBrowserWidth : function(s){
		this._browserWidth = s; 
	},
	getBrowserWidth : function(){
		return this._browserWidth;
	},
	setBrowserHeight : function(s){
		this._browserHeight = s; 
	},
	getBrowserHeight : function(){
		return this._browserHeight;
	},
	setShowHeader : function(b){
		this._showHeader = b;
	},
	getShowHeader : function(){
		return this._showHeader;
	},
	setTitle : function(s){
		this._title = s;
	},
	getTitle : function(){
		return this._title;
	},
	setButtonType : function(s) {
		this._buttonType = s;
		this.setType(this._buttonType);
	},
	getButtonType : function(){
		return this._buttonType;
	},
	initDesignStudio : function() {
		// Called by sap.designstudio.sdkui5.Handler  (sdkui5_handler.js)
	},
	dsClick : function(oControlEvent){
		if(this.getOpenMethod()=="New Window"){
			window.open(this.getUrl());
		}
		if(this.getOpenMethod()=="Modal Browser Dialog"){
			if(this._dialog) this._dialog.destroy();
			this._dialog = new sap.m.Dialog({
			    title : this.getTitle(),
			    icon : this.getBrowserIcon(),
			    showHeader : this.getShowHeader(),
			    verticalScrolling : false,
			    horizontalScrolling : false,
			    contentWidth : this.getBrowserWidth() || "80%",
			    contentHeight : this.getBrowserHeight() || "80%",
			});
			var html = new sap.ui.core.HTML({
				content : ["<iframe style='overflow:hidden;overflow-x:hidden;overflow-y:hidden;height:100%;width:100%;position:absolute;top:0px;left:0px;right:0px;bottom:0px;'" ,
				           "height='100%' width='100%' src='" + this.getUrl() + "'>",
				           "</iframe>"].join()
			});
			this._dialog.open();
			this._dialog.addContent(html);
			if(this.getShowCloseButton()){
				var closeButton = new sap.m.Button({
					text : "Close"
				});
				closeButton.attachBrowserEvent("click",function(oControlEvent){
					if(this._dialog) {
						this._dialog.close();
						this._dialog.destroy();
					}
				},this);
				this._dialog.setEndButton(closeButton);
				
			}
		}
	},
	init : function(){
		sap.m.Button.prototype.init.apply(this,arguments);
		this.addStyleClass("utilPackBrowserPopup");
		this.attachBrowserEvent("click",this.dsClick,this);
	}
});