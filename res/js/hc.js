sap.designstudio.sdk.Component.subclass("com.sample.utilities.HighCharts", function() {
    "use strict";
    this._metadata = null;
	this._dataResultCellSet = null;
	
    var that = this;				// Lazy scoping
    this.dsUtil = null;
	this._alive = false;
	this._filterBar = null;
	this._borderLayout = null;
	this._highChartsWrapper = null;
	this._resetButton = null;

	/* Autogenerate setter/getter and their default values for the following properties.
	 * Since 95% of the time, there's no additional logic, just create the getters and setters and move on.
	 * Also this JSON Object serves as a nice key/value storage for the internal values set and got.
	 */
	this.autoProperties = {
		xAxisRotation : 0,
		useDummyData : true,
		excessDimensions : "Filter",
		visMethod : "Line Chart",
		colsBy : "NONE",
		groupBy : "NONE",
		floatLegend : false,
		legendAlign : "right",
		legendVerticalAlign : "top",
		legendLayout : "vertical"
	};
	/*
	 * Create the aforementioned getter/setter and attach to 'this'.
	 */
	for(var property in this.autoProperties){
		this[property] = function(property){
			return function(value){
				try{
					if(value===undefined){
						return this.autoProperties[property];
					}else{
						this.autoProperties[property] = value;
						return this;
					}
				}catch(e){
					alert(e);
				}
			};
		}(property);
	}
	/* SDK-Provided ResultCellSet Property
	 * Cannot use default getter/setter, since we can return dummy data when no Datasource is bound
	 */
	this.dataResultCellSet = function(value) {
		try{
			if (value === undefined) {
				return (this._dataResultCellSet)?(this._dataResultCellSet):(this.useDummyData())?hcWrapper.dummyData.resultCellSet:null;
			} else {
				this._dataResultCellSet = value;
				return this;
			}
		}catch(e){
			alert(e);
		}
	};
	/* SDK-Provided Metadata Property
	 * Cannot use default getter/setter, since we can return dummy data when no Datasource is bound
	 */
	this.metadata = function(value) {
		try{
			if (value === undefined) {
				return (this._metadata)?(this._metadata):(this.useDummyData())?hcWrapper.dummyData.metadata:null;	
			} else {
				this._metadata = value;
				return this;
			}
		}catch(e){
			alert(e);
		}
	};
	
	/*
	 * Serialize SDK-Provided metadata as String - Used in the 'Additional Properties' sheet.
	 * Not sure why we cannot use a normal getter/setter but this is how SAP's example does it for JSON objects.
	 */ 
	this.getMetadataAsString = function() {
		return JSON.stringify(this.metadata());
	};
	
	/*
	 *  
	 */
	this._visRoutines = hcWrapper.chartConfigs;

	// Convert Dimension Index to Dimension Key
	this.indexDimension = function(idx){
		if(idx==-1) return "NONE";
		if(!this.metadata()) return null;
		if(this.metadata().dimensions.length>=idx) return this.metadata().dimensions[idx].key;
		return null;
	};
	// Convert Dimension Key to Dimension Index
	this.dimensionIndex = function(key){
		if(key=="NONE") return -1;
		if(!this.metadata()) return null;
		for(var i=0;i<this.metadata().dimensions.length;i++){
			if(this.metadata().dimensions[i].key==key) return i;
		}
		return null;
	};
	// Convert Dimension's Member Key to Dimension Index
	this.memberIndex = function(key,dimId){
		if(!this.metadata()) return null;
		var dim = this.metadata().dimensions[dimId];
		for(var i=0;i<dim.members.length;i++){
			if(dim.members[i].key==key) return i;
		}
		return null;
	};

	// Remaining unused Dimension Indices based on provided selection key
	this.getUnusedDimensions = function(key){
		var d = [];
		if(!this.metadata()) return d;
		for(var i=0;i<this.metadata().dimensions.length;i++){
			if(key[i]==-1) d.push(i);
		}
		return d;
	};
	// Dimension Text of a provided tuple selection
	this.getLabel = function(a){
		var l = "";
		for(var i=0;i<a.length;i++){
			if(a[i]!=-1){	// Only return when selection is made
				l+=this.metadata().dimensions[i].members[a[i]].text+" ";
			}
		}
		return l;
	};
	// Create a blank tuple search key
	this.createBlankKey = function(){
		var rsl = this.dataResultCellSet();
		var newKey = [];
		if(!rsl || !rsl.tuples) return newKey;
		var keyLength = rsl.tuples[0].length;
		for(var i=0;i<keyLength;i++) newKey.push(-1);
		return newKey;
	};
	// Select tuples by provided tuple key (-1 in a position = all)
	this.selectTuples  = function(key){
		var rsl = this.dataResultCellSet();
		if(!key || !rsl || !rsl.data) return null;
		var t = [];
		for(var i=0;i< rsl.tuples.length; i++){
			var match = true;
			for(var k=0;k<key.length;k++){
				if(key[k]!=-1 && rsl.tuples[i][k] != key[k]) {
					match = false;
					k=key.length;	// Bail out of loop early optimization
				}
			};
			if(match) t.push(i);
		};
		return t;
	};
	// Format a measure based on CVOM library methods
	this.formatValue = function (value, tuple) {
		if (value === null) return "";
		if (this.metadata()) {
			for (var i = 0; i < this.metadata().dimensions.length; i++) {
				var strFormat = this.metadata().dimensions[i].members[tuple[i]].formatString;
				if (strFormat) {
					sap.common.globalization.NumericFormatManager.setPVL(this.metadata().locale);
					return sap.common.globalization.NumericFormatManager.format(value, strFormat);
				}
			}
		}
		return value;
	};
	// Compare 2 arrays/tuples 
	this.arraysIdentical = function(a, b) {
	    var i = a.length;
	    if (i != b.length) return false;
	    while (i--) {
	        if (a[i] !== b[i]) return false;
	    }
	    return true;
	};
	// Determine unique members of a given dimension and tuple indexes
	this.getUniqueMembers = function(dimIdx,tupleIdxs){
		if(tupleIdxs === undefined) return null;
		var rsl = this.dataResultCellSet();
		var u = [];
		for(var i=0;i<tupleIdxs.length;i++){
			var memberID = rsl.tuples[tupleIdxs[i]][dimIdx];
			var found = false;
			for(var j=0;j<u.length;j++){
				if(u[j]==memberID) found = true;
			}
			if(!found) u.push(memberID);
		}
		return u;
	};
	this.createCartesianChart = function(key,seriesDimension,columnsDimension,routine){
		var config = routine.config;
		var chartType = (config && config.chart && config.chart.type)?config.chart.type:"bar";	// Default
	
		var c={
			chart : (config && config.chart)?config.chart:{
				type : "bar"
			},
			credits: (config && config.credits)?config.credits:{
	            enabled: false
	        },
			title : {
				text : "Generic Chart"
			},
			plotOptions : (config && config.plotOptions)?config.plotOptions:{},
			series : [],
			yAxis : (config && config.yAxis)?config.yAxis:{
				title : {
					text : "Y-Axis"
				}
			},
			xAxis : (config && config.xAxis)?config.xAxis:{
				categories : [],
				title :{
					text : "X-Axis"
				},labels : {
					formatter : function(){
						var newVal = this.value;
						if(newVal.length>20) newVal = newVal.substring(0,20)+"...";
						return newVal;
					},
					staggerLines : 1,
					rotation : this.xAxisRotation()
				}
			},
			legend : (config && config.legend)?config.legend:{
				layout : this.legendLayout(),
				align : this.legendAlign(),
				verticalAlign : this.legendVerticalAlign(),
				borderWidth : 1,
				floating : this.floatLegend()
			},noData : {
	            style: {    
	                fontWeight: 'bold',     
	                fontSize: '15px',
	                color: '#303030'        
	            }
	        }
		};
		var rsl = this.dataResultCellSet();
		var tupleIdxs = this.selectTuples(key);
		var m=this.metadata();
		var seriesLabels = [];
		var cDimension = m.dimensions[columnsDimension];
		var sDimension = m.dimensions[seriesDimension];
		
		//
		c.title.text = this.getLabel(key);
		c.xAxis.title.text = cDimension.text;
		c.yAxis.title.text = sDimension.text;
		var uniqueColumns = this.getUniqueMembers(columnsDimension,tupleIdxs);
		var uniqueSeries = this.getUniqueMembers(seriesDimension,tupleIdxs);
		
		if(c.chart.type !="scatter" && c.chart.type !="bubble"){
			for(var i=0;i<uniqueColumns.length;i++){
				c.xAxis.categories.push(cDimension.members[uniqueColumns[i]].text);
			};
			for(var i=0;i<uniqueSeries.length;i++){
				var series = {
					name : sDimension.members[uniqueSeries[i]].text,
					data : []
				};
				var hasData = false;
				for(var j=0;j<uniqueColumns.length;j++){
					var seriesKey = key.slice(0);
					seriesKey[seriesDimension] = uniqueSeries[i];
					seriesKey[columnsDimension] = uniqueColumns[j];
					var tupleIndex = this.selectTuples(seriesKey);
					if(tupleIndex==null || tupleIndex.length==0 || rsl.data[tupleIndex[0]]==null){
						series.data.push(null);					// Need ordinal position whether data or not
					}else{
						series.data.push(rsl.data[tupleIndex[0]]);	// There can be only one
						hasData = true;
					}
				}
				if(hasData) c.series.push(series);					// Cannot contain all nulls
			}
		}else{
			for(var i=0;i<uniqueSeries.length;i++){
				var series = {
					name : sDimension.members[uniqueSeries[i]].text,
					data : []
				};
				var hasData = false;
				var containsNulls = false;
				var point = [];
				for(var j=0;j<uniqueColumns.length;j++){
					if(j==0) c.xAxis.title.text = cDimension.members[uniqueColumns[j]].text;
					if(j==1) c.yAxis.title.text = cDimension.members[uniqueColumns[j]].text;				
					var seriesKey = key.slice(0);
					seriesKey[seriesDimension] = uniqueSeries[i];
					seriesKey[columnsDimension] = uniqueColumns[j];
					var tupleIndex = this.selectTuples(seriesKey);
					if(tupleIndex==null || tupleIndex.length==0 || rsl.data[tupleIndex[0]]==null){
						point.push(null);					// Need ordinal position whether data or not
						containsNulls = true;
					}else{
						point.push(rsl.data[tupleIndex[0]]);	// There can be only one
						hasData = true;
					}
				}
				if(c.chart.type == "scatter") c.plotOptions.scatter.tooltip.pointFormat = c.xAxis.title.text + ": {point.x}<br/>"+c.yAxis.title.text+": {point.y}";
				//if(c.chart.type == "bubble") c.plotOptions.bubble.tooltip.pointFormat = c.xAxis.title.text + ": {point.x}<br/>"+c.yAxis.title.text+": {point.y}";
				if(hasData && !containsNulls) series.data.push(point);				// Cannot contain any nulls
				if(hasData && !containsNulls) c.series.push(series);					// Cannot contain all nulls
			}
		}
		this._highChartsWrapper.setChartConfig(c);
	};
	//The main event
    this.afterUpdate = function(){
    	try{
    		var oRoutine = null;
        	for(var i=0;i<this._visRoutines.length;i++){
        		if(this._visRoutines[i].method == this.visMethod()) oRoutine=this._visRoutines[i];
        	}
    		var rsl = this.dataResultCellSet();
    		if(!rsl || !rsl.data) {
    			this.resetFilterPanel();
    			this._highChartsWrapper.noData("Alert", "No Data found.  Check your Data Source and Chart Selection.");
    			return;
        	}
    		var m=this.metadata();
    		// Convert Dimension Key to Dimension Metadata Index
    		var groupBy = this.dimensionIndex(this.groupBy());
    		var colsBy = this.dimensionIndex(this.colsBy());
    		if(colsBy == null || groupBy == null){
    			this._highChartsWrapper.noData("Error", "Invalid Dimension found for Series Dimension and/or Axis Dimension.");
    			return;
    		}
    		if(oRoutine.renderMethod=="JSON Dump"){
    			this._highChartsWrapper.noData("JSON Dumpage",JSON.stringify(this.metadata()));
    		}
    		if(oRoutine.renderMethod=="Cartesian"){
    	    	var xAxis = colsBy;
    	    	var seriesDim = groupBy;
    	    	if(seriesDim == -1 || xAxis == -1) {
    	    		this._highChartsWrapper.noData("Alert","You must select a Dimension for a Series and Axis.");
        			return;
    	    	}
    	    	if(seriesDim == xAxis) {
    	    		this._highChartsWrapper.noData("Alert","Your Series and Axis Dimensions cannot be the same.");
        			return;
    	    	}
    	    	// keys[] is for iterating over excess dimensions - Filtering Logic is the only method implemented currently.
    	    	// Find unique key combinations for Column Dimension
    	    	var keyCandidates = rsl.tuples.slice(0);
    	    	var keys = [];
    	    	for(var i=0;i<keyCandidates.length;i++){
    	    		var keyCandidate = keyCandidates[i].slice(0);
    	    		keyCandidate[seriesDim] = -1;	// Ignore differing members for Dimension used as columns
    	    		keyCandidate[xAxis] = -1;	// Ignore differing members for Dimension used as series
    	    		var dupe = false;
    	    		for (var j=0;j<keys.length;j++){
    	    			if(this.arraysIdentical(keys[j], keyCandidate)) dupe = true;
    	    		}
    	    		if(!dupe) keys.push(keyCandidate.slice(0));
    	    	}
    	    	this.resetFilterPanel();
    		}
    	}catch(fff){		// Because what could possibly go right ;)?
    		var msg = "";
    		for (var i in fff) msg+= i + ' = ' + fff[i]+"\n";
    		alert(fff);
    	}
    };
    
    /*
     *	Re-render comboboxes with new LOVs for the excess dimensions.
     *	Also, then only show relevant LOVs for the sibling combos during the onclick anon function logic.
     *	Yes, this is ugly, but it's a Proof-of-concept! 
     */
    this.resetFilterPanel = function(){
    	this._filterBar.destroyItems();
    	var rsl = this.dataResultCellSet();
    	if(!rsl || !rsl.data) return;
    	var seriesDim = this.dimensionIndex(this.groupBy());
		var xAxis = this.dimensionIndex(this.colsBy());
		var oRoutine = null;
    	for(var i=0;i<this._visRoutines.length;i++){
    		if(this._visRoutines[i].method == this.visMethod()) oRoutine=this._visRoutines[i];
    	}
    	//	Filter Panel Logic
		var uKey = this.createBlankKey();
		uKey[seriesDim]=1;
		uKey[xAxis]=1;
		// Get excess dimensions
		var uDimensions = this.getUnusedDimensions(uKey);
		// Empty toolbar
		
		for(var i=0;i<uDimensions.length;i++){
			var cbo = new sap.ui.commons.ComboBox({
				// editable : false,
				displaySecondaryValues : true,
				tooltip : this.metadata().dimensions[uDimensions[i]].text
			});
			var members = this.metadata().dimensions[uDimensions[i]].members;
			for(var m=0;m<members.length;m++){
				cbo.addItem(new sap.ui.core.ListItem({
					key : members[m].key,
					text: members[m].text,
					additionalText : members[m].key 
				}));
			}
			cbo.setSelectedKey(members[0].key);
			// Filter Combo Event Listener
			// BIG UGLY ANONYMOUS FUNCTION CLOSURE - DON'T HATE ME.
			cbo.attachChange(function(series,xAxis,myIndex){
				return function(){
					that._resetButton.setVisible(true);
					var allCombos = that._filterBar.getItems();
					// Pass 1 - Get selected values for all combos and note the current combobox being used and its value
					var key1 = that.createBlankKey();
					var j=-1;
					for(var i=0;i<key1.length;i++){
						if(i!=series && i!=xAxis){
							j++;		// Combobox Index
							var dimKey = allCombos[j].getSelectedKey();
							if(i==myIndex){
								var mySelectedKey = dimKey;
							}
							key1[i]=that.memberIndex(dimKey,i);
							
						}
					}
					// Pass 2 - Update other comboboxes with relevant LOVs
					var lovKey = that.createBlankKey();
					lovKey[myIndex] = that.memberIndex(mySelectedKey,myIndex);
					var lovTuples = that.selectTuples(lovKey);
					var j=-1;
					for(var i=0;i<key1.length;i++){
						var comboDimension = that.metadata().dimensions[i];
						if( i!=series && i!=xAxis){
							j++;		// Combobox Index
							// wtf
							if(i!=myIndex){
								allCombos[j].removeAllItems();
								var uniqueMembers = that.getUniqueMembers(i,lovTuples);
								var validKey = false;
								for(var m=0;m<uniqueMembers.length;m++){
									// Find old key, if exists still
									if(key1[i]==uniqueMembers[m]) validKey = true;
									allCombos[j].addItem(new sap.ui.core.ListItem({
			    						key : comboDimension.members[uniqueMembers[m]].key,
			    						text : comboDimension.members[uniqueMembers[m]].text,
			    						additionalText : comboDimension.members[uniqueMembers[m]].key, 
			    					}));
								}
								// If prior key is bad, select first new entry.
								if(!validKey) {
									allCombos[j].setSelectedKey(comboDimension.members[uniqueMembers[0]].key);
									key1[i] = uniqueMembers[0];	// Update key
								}else{
									
								}
							}
							
						}
					}
					that.createCartesianChart(key1,series,xAxis,oRoutine);
				};
			}(seriesDim,xAxis,uDimensions[i]));	// Closure
			// Whew.
			this._filterBar.addItem(cbo);
		}
		this._resetButton.setVisible(false);
		var newKey=rsl.tuples[0].slice(0); 
		newKey[seriesDim]=-1;
		newKey[xAxis]=-1;
		this.createCartesianChart(newKey,seriesDim,xAxis,oRoutine);
    };
    
    
	/*
	 * Init code.  You'd think it only fires once, but it fires when the component is created OR resized (sounds buggy to me, ahem...)
	 */
    this.init = function() {
		if(this._alive){
			// Don't recreate SAPUI5 components for 2nd init calls.  Setting a manual width/height causes init to fire again (why, SAP, huh??\)
			this._alive = true;
		}else{
			this.$().empty();
			this._highChartsWrapper = new my.Highcharts({name:"Highcharts Wrapper Extension Example"});		// My stab at a SAPUI5 extension -- Check out highchartsWrapper.js
			// Filter bar for excess dimensions
			this._filterBar = new  sap.ui.commons.Toolbar({
				width : "100%"
			});
			// Reset button to revert to initial excess dimension selection of tuples
			this._resetButton = new sap.ui.commons.Button({
		        text : "Reset",
		        tooltip : "Reset Selections",
		        press : function() {that.resetFilterPanel();}
			});
			this._filterBar.addRightItem(this._resetButton);
			this._borderLayout = new sap.ui.commons.layout.BorderLayout({
				width: "100%", 
				height: "100%",
				top : new sap.ui.commons.layout.BorderLayoutArea({
					size : "30px",
					content : [this._filterBar]	
				}),
				center : new sap.ui.commons.layout.BorderLayoutArea({
					content : [this._highChartsWrapper]
				})
			});
		}
		try{
			this.$().css("overflow-y", "auto");		// Technically, borderLayout should not overflow, but just in case...
			this._borderLayout.placeAt(this.$());	// Still waiting on a better way, SAP...  This works for now... 
			this._alive = true;
		}catch(e){
			alert(e);
		}
	};
	
	
	
});