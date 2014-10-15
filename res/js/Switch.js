jQuery.sap.require("sap.m.Switch");
sap.m.Switch.extend("com.sample.utilities.Switch", {
	_status : "Off",
	renderer : {},
	metadata : {				// Not to be confused with the Data Source metadata property
		properties : {
			status : "string"
		}
	},
	setType : function(s){
		sap.m.Switch.prototype.setType.apply(this,arguments);
	},
	setState : function(b){
		sap.m.Switch.prototype.setState.apply(this,arguments);
		//alert("Something setting me to " + b);
		// this.fireDesignStudioPropertiesChanged(["state"]);
	},
	/*getState : function(b){
		return sap.m.Switch.prototype.getState.apply(this,arguments);
	},*/
	setStatus : function(s){
		// No effect
	},
	getStatus : function() {
		return this._status;
	},
	initDesignStudio : function(){
		// Stub
	},
	init : function(){
		this.attachBrowserEvent("click",this.switchSwitch,this);
		this.attachChange(this.switchSwitch,this);
	},
	switchSwitch : function(oControlEvent){
		var s = this.getState();
		if(s==true){
			this.setState(false);
		}else{
			this.setState(true);
		}
		// this.fireDesignStudioEvent("onChange");		
	}
});