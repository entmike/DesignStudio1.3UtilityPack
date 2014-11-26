/**
 * Crosstab to Multidimensional Conversion Datasource 
 */
sap.designstudio.sdk.DataBuffer.subclass("com.sample.utilities.DataTest",function(){
	_data = [];
	_mutators = [];
	_mutateString = "";
	_dataString = "";
	_kfIndex = 0;
	_swap = false;
	
	this.kfIndex = function(i){
		if(i===undefined){
			return _kfIndex;
		}else{
			_kfIndex = i;
			this.recalculate();
			return this;
		}
	};
	this.swap = function(b){
		if(b===undefined){
			return _swap;
		}else{
			_swap = b;
			this.recalculate();
			return this;
		}
	};
	this.mutators = function(s){
		if(s===undefined){
			var d = [];
			return JSON.stringify(_mutators);
		}else{
			if(s=="") s = "[]";
			_mutators = jQuery.parseJSON(s);
			this.recalculate();
			return this;
		}
	};
	this.data = function(s){
		if(s===undefined){
			var d = [];
			for(var i=0;i<_data.length;i++){
				var r = _data[i].join(",");
				d.push(r);
			}
			return d.join("\n");
		}else{
			_data = [];
			_dataString = s.replace(/\|/g,"\n");
			var sd = _dataString.split("\n");
			for(var i=0;i<sd.length;i++){
				_data.push(sd[i].split(","));
			}
			this.recalculate();
			return this;
		}
	};
	this.recalculate = function(){
		// Clear all data
		this.clear();
		// Sanity check
		if(!_data || _data.length==0) {
			this.firePropertiesChanged(["metadata"]);
			this.fireUpdate();
			return;
		}
		var headers = _data[0].slice();							// Shallow Copy 1st row to get labels
		var dataStart = 1;										// Account for header row
		var kfIndex = this.kfIndex();							// Measure Starting Column
		var kfLength = headers.length - kfIndex;				// Get number of Measures
		var dimNames = headers.slice(0,kfIndex);				// Get Dimensions Names
		var kfNames = headers.splice(kfIndex,headers.length-1);	// Get Measure Names
		var measureAxis = "COLUMNS";
		var dimensionAxis = "ROWS";
		if(this.swap()==true){
			measureAxis = "ROWS";
			dimensionAxis = "COLUMNS";
		}
		// Create initial Measure Dimension (aka Key Figure Selection Structure)
		
		var dims = [{
			key : "0MEASURES",
			text : "Measures",
			axis : measureAxis,
			containsMeasures : true
		}];
		// Define Dimensions
		for(var i=0;i<dimNames.length;i++){
			dims.push({
				key : dimNames[i],
				text : dimNames[i],
				axis : dimensionAxis
			})
		}
		this.defineDimensions(dims);
		// Set data
		for(var i=dataStart;i<_data.length;i++){
			for(var j=0;j<kfLength;j++){
				var coordinate = _data[i].slice(0,kfIndex);
				// Splice in measure member
				coordinate.splice(0,0,kfNames[j]);
				var d = _data[i][kfIndex+j];
				var mutate = 1;
				if(_mutators.length>=j) mutate = parseFloat(_mutators[j]);
				d = d * mutate;
				this.setDataCell(coordinate,d);
			}
		}
		this.firePropertiesChanged(["metadata"]);
		this.fireUpdate();
	};
	this.init = function(){	
		this.recalculate();
	};
});