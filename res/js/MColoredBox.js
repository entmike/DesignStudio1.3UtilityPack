sap.ui.core.Control.extend("com.sample.utilities.MColoredBox", {
	renderer : {
		render : function(oRenderManager, oControl){
			if(!oControl) return;
			oRenderManager.write("<div");
			oRenderManager.writeControlData(oControl);
			oRenderManager.addClass("utilPackColoredBox");
			oRenderManager.writeClasses();
			oRenderManager.addStyle("width",oControl.getWidth());
			oRenderManager.addStyle("height",oControl.getHeight());
			oRenderManager.addStyle("background-color",oControl.getColor());
			oRenderManager.writeStyles();
			oRenderManager.write(">");
			oRenderManager.write(oControl.getContent());
			oRenderManager.write("</div>");
		}
	},
	onAfterRendering: function (){
        // Stub
    },
	metadata : {				// Not to be confused with the Data Source metadata property
		properties : {
			content : "string",
			color : "string",
			width : {type : "sap.ui.core.CSSSize", defaultValue : "50px"},
            height : {type : "sap.ui.core.CSSSize", defaultValue : "50px"}
		}
	},
	initDesignStudio : function(){
		// Stub
	},
	init : function(){
		// Stub
	}	
});