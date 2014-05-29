sap.ui.core.Control.extend("my.Highcharts", {      // Inherit from sap.ui.core.Control
	metadata : {
		properties : {
			"name" : "string",                 // setter and getter are created behind the scenes, including data binding and type validation 
			"chartConfig" : "object"
		}
    },
    noData : function(title,msg){
    	this.setChartConfig({
            title: { text: title },
            lang: { noData: msg },
            noData: { style: { fontWeight: 'bold', fontSize: '15px', color: '#303030' } }
        });
    },
    getChart : function(){
    	var c=null;
    	if(this._alive){
    		c = this.$().highcharts();
    	}
    	return c;
    },
    setChartConfig : function(o){
    	this.setProperty("chartConfig",o,true);
    	if(this._alive && this.$()[0]) this.$().highcharts(o);
    	return this;
    },
    getChartConfig : function() {
    	return this.getProperty("chartConfig");
    },
    init : function(){
    	var that = this;
    	// Default Chart Config
    	this.setProperty("chartConfig",{
            title: {
                text: 'Initial State'
            },       
            lang: {
                noData: "If you can read this, something isn't working."
            },
            noData: {
                style: {    
                    fontWeight: 'bold',     
                    fontSize: '15px',
                    color: '#303030'        
                }
            }
        },true);
    },
    onAfterRendering : function(){
    	this._chart = this.$().highcharts(this.getProperty("chartConfig"));
    	this._alive = true;
    },
    renderer : function(oRm, oControl) {      // the part creating the HTML
        oRm.write("<div id='" + oControl.getId() + "' style='width:100%;height:100%;background-color:red;'>");
        // oRm.writeEscaped(oControl.getName()); // write the Control property 'name', with XSS protection
        oRm.write("</div>");
    }
});