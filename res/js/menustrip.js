sap.designstudio.sdk.Component.subclass("com.sample.utilities.MenuStrip", function() {
	// Property setter/getter functions	
    this.autoProperties = {
    	titles : {value : ""},
		spriteIDs : {value : ""},
		visibilities : {value : "" },
		fixedWidth : {value : -1 },
    	spriteSheet : {value : "" },
    	spriteSheetPerRow : { value : 0 },
    	verticalAlign : { value : "top" },
    	textAlign : { value : "center" },
    	labelOrientation : { value : "vertical" },
    	labelPlacement : {value : "After" },
    	iconWidth : { value : -1 },
    	iconHeight : { value : -1 },
    	labelClicked : { value : "" },
    	buttonClass : { redraw : true }
    };
    /*
	 * Create the aforementioned getter/setter and attach to 'this'.
	 */
	for(var property in this.autoProperties){
		this[property] = function(property){
			return function(value){
				if(value===undefined){
					return this.autoProperties[property].value;
				}else{
					this.autoProperties[property].value = value;
					this.autoProperties[property].changed = true;
					return this;
				}
			};
		}(property);
	}	
	
	this.init = function() { 
    	this.$().addClass("superList");
    	this.redraw();
    };
    
    this.afterUpdate = function() { 
    	var redraw = false;
    	for(var property in this.autoProperties){
    		if(this.autoProperties[property].changed && this.autoProperties[property].redraw) redraw = true;
    	}
    	// Determine if a redraw is needed
    	this.redraw();
    	// Reset change flags
    	for(var property in this.autoProperties){
    		this.autoProperties[property].changed = false;
    	}
    };
    
    this.redraw = function(){
    	var that = this;
    	this.$().empty();
    	var list = $("<ul/>");
    	var t = [];
    	var ids = [];
    	var vis = [];
    	if(this.titles()) t = this.titles().split(",");
    	if(this.spriteIDs()) ids = this.spriteIDs().split(",");
    	if(this.visibilities()) vis = this.visibilities().split(",");
    	while(ids.length<t.length) ids.push(undefined);
    	while(vis.length<t.length) vis.push(undefined);
    	for(var i=0;i<t.length;i++){
    		var newItem = $("<li/>").css({
    			textAlign : this.textAlign(),
    			verticalAlign : this.verticalAlign()
    		});
    		newItem.click(function(text){
				return function(){
					$(this).addClass("selected");
					that.labelClicked(text);
					that.firePropertiesChanged(["labelClicked"]);
					that.fireEvent("onclick");
				};
			}(t[i]));
    		
    		if(this.buttonClass()) newItem.addClass(this.buttonClass());
    		if(this.labelClicked()==t[i]){
    			newItem.addClass("selected");
    		}
    		if(this.fixedWidth() != -1){
    			newItem.css({
        			width : this.fixedWidth()
        		});
    		}
    		if(this.spriteSheet() != ""){
    			var icon = $("<DIV/>")
    			.addClass("icon")
    			.css({
    				background : "url('" + this.spriteSheet() + "')",
    				display : "inline-block",
    				verticalAlign : this.verticalAlign()
    			});
    			if(this.iconWidth()){
    				var col;
    				var spriteIndex = i;
    				if(ids[i]) spriteIndex = ids[i];
    				var rowOffset = 0;
    				var rowHeight = this.iconHeight() || 0;
    				if(this.spriteSheetPerRow() && this.spriteSheetPerRow() != 0){
    					if(spriteIndex >= this.spriteSheetPerRow()){
    						col = spriteIndex % this.spriteSheetPerRow();
    						//alert(col);
    						rowOffset = Math.floor(spriteIndex / this.spriteSheetPerRow());
    					}else{
    						col = spriteIndex;
    					}
    				}
    				icon.css({
    					backgroundPositionX : -1 * (parseInt(this.iconWidth()) * col) + "px",
    					width : parseInt(this.iconWidth())
    				});
    				if(rowOffset){
    					icon.css({
    						backgroundPositionY : -1 * (rowOffset * this.iconHeight())
        				});
    				}
    			}
    			if(this.iconHeight()){
    				icon.css({
    					height : parseInt(this.iconHeight())
    				});
    			}
    		}
    		var buttonLabel = $("<SPAN>" + t[i] + "</SPAN>")
    			.addClass("label")
    			.css({
    				verticalAlign : this.verticalAlign()
    			});
    		
			
        			
    		switch(this.labelPlacement()){
    			case "After" :{
    				newItem.append(icon);
    				if(this.labelOrientation()=="vertical") newItem.append("<br/>");
    				newItem.append(buttonLabel);
    				break;
    			}
    			case "Before" :{
    				newItem.append(buttonLabel);
    				if(this.labelOrientation()=="vertical") newItem.append("<br/>");
    				newItem.append(icon);
    				break;
    			}
    		}   		
    		if(vis[i]!="H") list.append(newItem);
    	}
    	this.$().append(list);
    };
    
});