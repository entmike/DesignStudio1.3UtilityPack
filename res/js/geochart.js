sap.designstudio.sdk.Component.subclass("com.sample.utilities.GeoChart", function() {
	this.chart = null;
	
	this.drawMap = function(){
        var data = google.visualization.arrayToDataTable([  
          ['Country', 'Popularity'],  
          ['Germany', 200],  
          ['United States', 300],  
          ['Brazil', 400],  
          ['Canada', 500],  
          ['France', 600],  
          ['RU', 700]  
        ]);  
        var options = {};  
        // If you need it for subcomponent ID creation later.
        var domId = this.$().attr("id");
        // Attach chart to DOM element, NOT jQuery object.
        this.chart = new google.visualization.GeoChart(this.$()[0]);
        this.chart.draw(data, options);
    };      
      
    this.init = function() {
    	var callback = function(component){
    		var comp = component;
    		return function(){
    			comp.drawMap();
    		};
    	}(this);
    	google.load('visualization', '1', {'packages': ['geochart'], "callback" : callback});            
    };  

    this.afterUpdate = function() { };  
});