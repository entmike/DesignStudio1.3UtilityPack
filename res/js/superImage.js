sap.ui.commons.Image.extend("com.sample.utilities.SuperImage", {
	renderer : {},
	metadata : {				// Not to be confused with the Data Source metadata property
		properties : {
			onclick : "string"	// While 'onclick' is technically a DS Event, it does pass some information, so let's take it.
		}
	},
	initDesignStudio : function() {
		// Called by sap.designstudio.sdkui5.Handler  (sdkui5_handler.js)
	},
	// Override onclick setter to then attach/detach Design Studio event raising.
	setOnclick : function(s){
		if(s && s != ""){		// If there's onclick BIAL, then add an event listener (and get a hand cursor).
			this.attachPress(this.clickHandler);
		}else{					// If not, remove the event listener (which will get rid of the hand cursor, too)
			this.detachPress(this.clickHandler);
		}
	},
	clickHandler : function(){
		this.fireDesignStudioEvent("onclick");
	}
});