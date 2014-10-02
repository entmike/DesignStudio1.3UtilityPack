sap.designstudio.sdk.PropertyPage.subclass("com.sample.utilities.AccordionMenuPage",  function() {
	var that = this;
	this._itemConfig = [];
	
	this.componentSelected = function(){
		this.updateProps();
	};
	this.updateProps = function(){
		this._sectionList.destroyItems();
		
	};
	
	this.init = function(){
		// Init
		this._content = new sap.ui.commons.layout.VerticalLayout({
			width : "100%"
		});
		this.hLayout = new sap.ui.commons.layout.HorizontalLayout({
			
		});
		this._content.addContent(this.hLayout);
		this._sectionList = new sap.ui.commons.ListBox({
			
		});
		this._hLayout.addContent(this._sectionList);
		// that.firePropertiesChanged(["groupBy"]);
		this._content.placeAt($("#content"));
		
		this.updateProps();
	};
	this.itemConfig = function(s){
		if( value === undefined){
			return JSON.stringify(this._itemConfig);
		}else{
			var o = [];
			if(s && s!="") o = jQuery.parseJSON(s);
			this._itemConfig = o;
			this.updateProps();
			return this;
		}
	};	
});