jQuery.sap.require("sap.m.Button");
sap.m.Button.extend("com.sample.utilities.MButton", {
	_buttonType : "",
	renderer : {},
	metadata : {				// Not to be confused with the Data Source metadata property
		properties : {
			buttonType : "string",		// 'type' in sap.m, but DS messes with it
		}
	},
	setType : function(s){
		if(s=="sdkui5") return; // Fix 1.3 SP0 bug '"sdkui5" is not a valid entry of the enumeration for property "type" of Element'
		sap.m.Button.prototype.setType.apply(this,arguments);		
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
		this.fireDesignStudioEvent("onclick");
	},
	init : function(){
		sap.m.Button.prototype.init.apply(this,arguments);
		this.attachBrowserEvent("click",this.dsClick,this);
	}
});