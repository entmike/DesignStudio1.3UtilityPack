jQuery.sap.require("sap.m.Page");
sap.m.Page.extend("com.sample.utilities.MPageHeader", {
	renderer : {},
	metadata : {				// Not to be confused with the Data Source metadata property
		properties : {
			
		}
	},
	initDesignStudio : function() {
		// Called by sap.designstudio.sdkui5.Handler  (sdkui5_handler.js)
	},
	dsClick : function(oControlEvent){
		this.fireDesignStudioEvent("onnav");
	},
	setShowNavButton : function(b){
		sap.m.Page.prototype.setShowNavButton.apply(this,arguments);
		if(this._navBtn) this._navBtn.attachBrowserEvent("click",this.dsClick,this);
	},
	init : function(){
		sap.m.Page.prototype.init.apply(this,arguments);
		this.addStyleClass("utilPackPageHeader");
		if(this._navBtn) this._navBtn.attachBrowserEvent("click",this.dsClick,this);
	}
});