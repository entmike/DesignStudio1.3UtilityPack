/**
 * Not a full-featured Addon.  This is an example of how to include d3v3 by using AMD Require module
 * into Design Studio without disrupting CVOM's d3v2.  d3v3 is required for TopoJSON.
 */

require.config({
	paths: {
		d3: "/aad/zen/mimes/sdk_include/com.sample.utilities/res/js/d3/d3.min",
		topojson : "/aad/zen/mimes/sdk_include/com.sample.utilities/res/js/d3/topojson.v1.min",
	},
	shim : {
		d3 : {
			exports : "d3"
		},
		topojson : {
			deps : ["d3"],
			exports : "topojson"
		},
		topo : {
			deps : ["d3","topojson"]
		}
	}
});

//Exception handling for require.js In case of an error it alerts the message. For example if topoJSON could not be loaded
require.onError = function (err) {
	if (err.requireType === 'timeout') {
		alert("error: "+err);
	} else {
		throw err;
	}
};

//Define require.js module with all needed js libs
define("runtime",function(require){
	var d3 = require("d3");
	var topojson = require("topojson");
	// return the required objects - can be used when module is used inside a require function
	return {
		d3 : d3,
		topojson : topojson
	};
});



sap.designstudio.sdk.Component.subclass("com.sample.utilities.Topo", function() {
	this._alive = false;
	this._metadata = null;

	this.metadata = function(o){
		if(o===undefined){
			return this._metadata;
		}else{
			this._metadata = o;
			return this;
		}		
	};
	
    this.init = function() {
    	var that = this;
    	if(!this._alive){
			require(["runtime"], function(r) {
				that.d3 = r.d3;
				that.topojson = r.topojson;
				that._alive = true;
				that.redraw();
			});
    	}else{
    		this.redraw();
    	}
    };
    
    this.afterUpdate = function() {
    	this.redraw();
    };
    
    this.redraw = function(){
    	var that = this;
    	this.$().css("overflow","hidden");
    	if(!this._alive) return;
    	var width = this.$().width();
    	var height = this.$().height();
    	
    	var projection = this.d3.geo.albersUsa()
    		.scale(width)
    		.translate([width/2, height /2]);
    	
    	var path = this.d3.geo.path()
    		.projection(projection);
    	
    	this.d3.select(this.$()[0]).selectAll("svg").remove();
    	
    	var svg = this.d3.select(this.$()[0]).append("svg")
    		.attr("width",width)
    		.attr("height",height);
    	
    	// TODO: Figure out platform URL path so this works beyond local mode.  But this is just for illustration for now.
    	this.d3.json("/aad/zen/mimes/sdk_include/com.sample.utilities/res/js/maps/us.json", function(err, us){
    		
    		svg.insert("path", ".graticule")
				.datum(that.topojson.feature(us, us.objects.land))
				.attr("class", "land")
				.attr("d", path);
    		
    		
    		svg.insert("path", ".graticule")
	        	.datum(that.topojson.mesh(us, us.objects.counties, function(a, b) { return a !== b && !(a.id / 1000 ^ b.id / 1000); }))
	        	.attr("class", "county-boundary")
	        	.attr("d", path);
    		
    		svg.insert("path", ".graticule")
	        	.datum(that.topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
	        	.attr("class", "state-boundary")
	        	.attr("d", path);
    	});
    	
    	
    	
    };
});