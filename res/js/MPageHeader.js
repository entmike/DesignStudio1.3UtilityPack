jQuery.sap.require("sap.m.Page");
sap.m.Page.extend("com.sample.utilities.MPageHeader", {
	_itemConfig : [],
	_selectedItem : "",
	_selectedHeader : "",
	renderer : {},
	metadata : {				// Not to be confused with the Data Source metadata property
		properties : {
			itemConfig : "string",	// JSON section/items config from Design Studio
			selectedItem : "string",
			selectedHeader : "string"
		}
	},
	initDesignStudio : function() {
		// Called by sap.designstudio.sdkui5.Handler  (sdkui5_handler.js)
	},
	dsClick : function(oControlEvent){
		this.fireDesignStudioEvent("onnav");
	},
	setShowNavButton : function(b){
		sap.m.Page.prototype.setShowNavButton.apply(this,arguments);
		if(this._navBtn) this._navBtn.attachBrowserEvent("click",this.dsClick,this);
	},
	setSelectedItem : function(s){
		this._selectedItem = s;
	},
	getSelectedItem : function(){
		return this._selectedItem;
	},
	setSelectedHeader : function(s){
		this._selectedHeader = s;
	},
	getSelectedHeader : function(){
		return this._selectedHeader;
	},
	setItemConfig : function(s){
		var o = [];
		if(s && s!="") o = jQuery.parseJSON(s);
		this._itemConfig = o;
		this.redraw();
		return this;
	},
	getItemConfig : function(){
		return JSON.stringify(this._itemConfig);
	},
	redraw : function(){
		this.destroyHeaderContent();
		for(var i=0;i<this._itemConfig.length;i++){
			var title = "";
			var actualTitle = this._itemConfig[i].title;
			if(this._itemConfig[i].showTitle) title = actualTitle;
			var b = new sap.m.Button({
				text : title,
				icon : this._itemConfig[i].icon
			});
			this.addHeaderContent(b);
			var items = this._itemConfig[i].items || [];
			if(items.length<=0){	// Single button
				b.attachBrowserEvent("click",function(title){
					return function(oControlEvent){
						this._selectedItem = title;
						this._selectedHeader = title;
						this.fireDesignStudioPropertiesChanged(["selectedHeader","selectedItem"]);
						this.fireDesignStudioEvent("onitemselect");
					};
				}(actualTitle),this);
			}else{	// Action Sheet
				b.attachBrowserEvent("click",function(index){
					return function(oControlEvent){
						var items = this._itemConfig[index].items;
						var actionSheet = new sap.m.ActionSheet({
							title :  this._itemConfig[index].title,
							placement : "Vertical",
						});
						for(var j=0;j<items.length;j++){
							var item = items[j];
							var title = item;
							var icon = "";
							var opts = item.split("|");
							if(opts.length>1){
								icon = opts[0];
								title = opts.slice(1).join("");
							}
							var actionButton = new sap.m.Button({
								text : title,
							    icon : icon
							});
							actionButton.attachBrowserEvent("click",function(title,header){
								return function(oControlEvent){
									this._selectedItem = title;
									this._selectedHeader = header;
									this.fireDesignStudioPropertiesChanged(["selectedHeader","selectedItem"]);
									this.fireDesignStudioEvent("onitemselect");
								};
							}(title,this._itemConfig[index].title),this);
							actionSheet.addButton(actionButton);
						}
						actionSheet.openBy(this.getHeaderContent()[index]);
					};
				}(i),this);
			}
		}
	},
	init : function(){
		sap.m.Page.prototype.init.apply(this,arguments);
		this.addStyleClass("utilPackPageHeader");
		if(this._navBtn) this._navBtn.attachBrowserEvent("click",this.dsClick,this);
	}
});