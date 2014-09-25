sap.designstudio.sdk.Component.subclass("com.sample.utilities.GeoChart", function() {
	this.chart = null;
	this._alive = false;
	
	this.drawMap = function(){
		this._alive = true;
		var data = google.visualization.arrayToDataTable([
	      ['Country', 'Popularity'],
	        ['AR', 170],
	        ['AL', 250],
	        ['MS', 175],
	        ['KY', 200],
	        ['TN', 300],
	        ['WA', 275],
	        ['OR', 250],
	        ['CA', 200]
	    ]);
	
	    var options = {
	        region : "US",
	        resolution : "provinces",
	        colorAxis : {colors : ["#009966","#006699","#662200"]}
	    };
        // If you need it for subcomponent ID creation later.
        var domId = this.$().attr("id");
        // Attach chart to DOM element, NOT jQuery object.
        this.chart = new google.visualization.GeoChart(this.$()[0]);
        this.chart.draw(data, options);
    };      
    
    this.init = function() {
    	if(this._alive){
    		this.drawMap();
    		return;
    	}
    	google.load('visualization', '1', {'packages': ['geochart'], "callback" : function(component){
    		var comp = component;
    		return function(){
    			comp.drawMap();
    		};
    	}(this)});            
    };  

    this.afterUpdate = function() {
    	if(this._alive) this.drawMap();
    };  
});