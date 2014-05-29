sap.designstudio.sdk.Component.subclass("com.sample.utilities.DoubleSidedTile", function() {
	this._metadata = null;
	this._dataResultSet = null;
	this._frontHTML = "front";
    this._backHTML = "back";
	this._terms = new Array(100);
    this._replacements = new Array(100);
    this._afterInit = null;
    this._alive = false;
    this._backContentClass = "frontContent";
    this._frontContentClass = "backContent";
    
    /**
     *     ResultCell		A single data value
     *     ResultCellList	A single row or column of data values
     *     ResultCellSet	A complex selection of data values from rows and columns (a Cartesian selection)
     *     ResultSet		All data values of the result set
    **/
    
	// property setter/getter functions	
    // dataResultCell
	// dataResultCellList
    // dataResultCellSet
	// dataResultSet
	this.metadata = function(value) {
		//alert(value);
		if (value === undefined) {
			return this._metadata;
		} else {
			this._metadata = value;
			return this;
		}
	};
	// Unusable until SAP implements 'selection' properly
	this.dataResultSet = function(value) {
		if (value === undefined) {
			return this._dataResultSet;
		} else {
			this._dataResultSet = value;
			return this;
		}
	};
	// Unusable until SAP implements 'selection' properly
	this.dataResultCellSet = function(value) {
		if (value === undefined) {
			return this._dataResultCellSet;
		} else {
			this._dataResultCellSet = value;
			return this;
		}
	};
	// Single Row/Col
	this.dataResultCellList = function(value) {
		if (value === undefined) {
			return this._dataResultCellList;
		} else {
			this._dataResultCellList = value;
			return this;
		}
	};
    
    this.parseTerm = function(t,i){
    	this._terms[i] = t;
    };
    this.parseReplacement = function(r,i){
    	this._replacements[i] = r;
    };    
	
    for(var i=1;i<=100;i++){
    	this["term"+i] = function(i){
    		return function(t){
    			this.parseTerm(t,i-1);
    			return this;
    		};
    	}(i);
    	this["replacement"+i] = function(i){
    		return function(t){
    			this.parseReplacement(t,i-1);
    			return this;
    		};
    	}(i);
    }
	this.frontContentClass = function(h){
    	this._frontContentClass = h;
    	return this;
    };
	this.backContentClass = function(h){
    	this._backContentClass = h;
    	return this;
    };

    this.frontHTML = function(h){
    	this._frontHTML = h;
    	return this;
    };
	this.backHTML = function(h){
    	this._backHTML = h;
    	return this;
    };    
    this.afterInit = function(s){
    	if(s!=undefined){
    		this._afterInit = s;
    	}
    	return this;
    };
    
    this.reparse = function(){
    	var rHTML = this._frontHTML;
    	var bHTML = this._backHTML;
    	var rJS = this._afterInit;
    	for(var i=0;i<this._terms.length;i++){
    		if(this._terms[i]){
    			rHTML = rHTML.replace(new RegExp(this._terms[i],'g'), this._replacements[i]);
    			bHTML = bHTML.replace(new RegExp(this._terms[i],'g'), this._replacements[i]);
    			rJS = rJS.replace(new RegExp(this._terms[i],'g'), this._replacements[i]);
    		}
    	};
    	return {
    		frontHTML : rHTML,
    		backHTML : bHTML,
    		js : rJS
    	};
    };
    
    this.drawHTML = function(){
    	if(this._alive == false) return;
    	var parsed = this.reparse();
    	this.$().find(".front > div").html(parsed.frontHTML).addClass(this._frontContentClass);
    	this.$().find(".back > div").html(parsed.backHTML).addClass(this._backContentClass);
    };
    
    this.reEval = function(){
    	if(this._alive == false) return;
    	var parsed = this.reparse();
    	try{
			eval(parsed.js);
		}catch(e){
			alert(e);
		}
    };
      
    this.afterUpdate = function(){
    	this.drawHTML();
    	this.reEval();
    };
    
	this.init = function() {
		this.$().html(
			'<div class="flip-container">'+
			'<div class="flipper">'+
			'<div class="front"><div></div></div>'+
			'<div class="back"><div></div></div>'+
			'</div>'+
			'</div>'
		);
		this._alive = true;
	};
});