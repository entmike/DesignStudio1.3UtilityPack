jQuery.sap.require("sap.m.Button");
sap.m.Button.extend("com.sample.utilities.PopOverButton", {
	_buttonType : "",
	_title : "",
	_popover : null,
	_placement : "Auto",
	_showHeader : true,
	_popoverWidth : "auto",
	_popoverHeight : "auto",
	_selectedItem : "",
	_items : [],
	renderer : {},
	metadata : {				// Not to be confused with the Data Source metadata property
		properties : {
			title : "string",			// Title
			buttonType : "string",		// 'type' in sap.m, but DS messes with it
			placement : "string",		// Popover placement
			showHeader: "boolean",		// Show Popover Title
			popoverWidth : "string",	// Popover Width
			popoverHeight : "string",	// Popover Height
			items : "string",			// Popover List
			selectedItem : "string"		// Selected Popover Item
		}
	},
	setSelectedItem : function(s){
		this._selectedItem = s;
	},
	getSelectedItem : function(){
		return this._selectedItem;
	},
	setItems : function(s){
		this._items = s.split("\n");
	},
	getItems : function(){
		return this._items.join("\n");
	},
	setPopoverWidth : function(s){
		this._popoverWidth = s; 
	},
	getPopoverWidth : function(){
		return this._popoverWidth;
	},
	setPopoverHeight : function(s){
		this._popoverHeight = s; 
	},
	getPopoverHeight : function(){
		return this._popoverHeight;
	},
	setShowHeader : function(b){
		this._showHeader = b;
	},
	getShowHeader : function(){
		return this._showHeader;
	},
	setTitle : function(s){
		this._title = s;
	},
	getTitle : function(){
		return this._title;
	},
	setPlacement : function(s){
		this._placement = s;
	},
	getPlacement : function(){
		return this._placement;
	},
	setButtonType : function(s) {
		this._buttonType = s;
		this.setType(this._buttonType);
	},
	getButtonType : function(){
		return this._buttonType;
	},
	initDesignStudio : function() {
		// Called by sap.designstudio.sdkui5.Handler  (sdkui5_handler.js)
	},
	listSelect : function(title,oControlEvent){
		if(this._popover){
			this._popover.close();
			//this._popover.destroy();
		}
		this._selectedItem = title;
		this.fireDesignStudioPropertiesChanged(["selectedItem"]);
		this.fireDesignStudioEvent("onPopoverSelect");
	},
	dsClick : function(oControlEvent){
		if(this._popover) this._popover.destroy();
		this._popover = new sap.m.Popover({
			title : this._title,
			showHeader : this._showHeader,
			placement : this._placement,
			contentWidth : this._popoverWidth,
			contentHeight : this._popoverHeight
		});
		var list = new sap.m.List({
			
		});
		list.attachSelectionChange(this.listSelect,this);
		for(var i=0;i<this._items.length;i++){
			var item = this._items[i];
			var title = item;
			var icon = "";
			var opts = item.split("|");
			if(opts.length>1){
				icon = opts[0];
				title = opts.slice(1).join("");
			}
			var listItem = new sap.m.StandardListItem({
			    title : title,
			    type : sap.m.ListType.Active,
			    icon : icon
			});
			listItem.attachBrowserEvent("click",function(t){return function(oControlEvent){this.listSelect(t,oControlEvent);};}(title),this);
			list.addItem(listItem);
		};
		this._popover.addContent(list);
		this._popover.openBy(this);
	},
	init : function(){
		sap.m.Button.prototype.init.apply(this,arguments);
		this.attachBrowserEvent("click",this.dsClick,this);
	}
});