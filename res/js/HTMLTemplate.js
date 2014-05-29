sap.designstudio.sdk.Component.subclass("com.sample.utilities.HTMLTemplate", function() {
    
	this._HTML = "Hi";
    this._terms = new Array(100);
    this._replacements = new Array(100);
    this._afterInit = null;
    this._alive = false;
    this._HTMLchanged = false;
    this._JSchanged = false;
    
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
	this.HTML = function(h){
    	this._HTML = h;
		this._HTMLchanged = true;
    	return this;
    };
    
    this.afterInit = function(s){
    	if(s!=undefined){
    		this._afterInit = s;
    	}
    	this._JSChanged = true;
    	return this;
    };
    
    this.reparse = function(){
    	var rHTML = this._HTML;
    	var rJS = this._afterInit;
    	for(var i=0;i<this._terms.length;i++){
    		if(this._terms[i]){
    			rHTML = rHTML.replace(new RegExp(this._terms[i],'g'), this._replacements[i]);
    			rJS = rJS.replace(new RegExp(this._terms[i],'g'), this._replacements[i]);
    		}
    	};
    	return {
    		html : rHTML,
    		js : rJS
    	};
    };
    
    this.drawHTML = function(){
    	if(this._alive == false) return;
    	//alert("h");
    	var parsed = this.reparse();
    	this.$().html(parsed.html);
    };
    
    this.reEval = function(){
    	if(this._alive == false) return;
    	//alert("j");
    	var parsed = this.reparse();
    	try{
			eval(parsed.js);
		}catch(e){
			alert(e);
		}
    };
      
    this.afterUpdate = function(){
    	//alert("au");
    	this.drawHTML();
    	this.reEval();
    };
    
	this.init = function() {
		//alert("i");
		this._alive = true;
	};
});