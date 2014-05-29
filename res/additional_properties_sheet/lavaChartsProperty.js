sap.designstudio.sdk.PropertyPage.subclass("com.sample.utilities.LavaChartsPropertyPage",  function() {
	var that = this;
	this.rendered = false;
	this._dataResultCellSet = {};
	this._metadata = {};
	this._groupBy = "";
	this._colsBy = "";
	this._iterateBy = "";
	this._comboGroupBy = null;
	this._comboColsBy = null;
	this._comboIterateBy = null;
	this._content = null;
	
	// 	this.callRuntimeHandler("sampleFunction", "arg1", "arg2");
	
	this.componentSelected = function(){
		this.updateProps();
	};
	this.updateProps = function(){
		this._comboGroupBy.removeAllItems();
		this._comboGroupBy.setSelectedKey(this._groupBy);
		this._comboColsBy.removeAllItems();
		this._comboColsBy.setSelectedKey(this._colsBy);
		this._comboIterateBy.removeAllItems();
		this._comboIterateBy.setSelectedKey(this._iterateBy);
		var strMetadata = that.callRuntimeHandler("getMetadataAsString");
		this._comboGroupBy.addItem(new sap.ui.core.ListItem({
			key : "NONE",
			text: "[Select a Grouping Dimension]",
			additionalText : "Required" 
		}));
		this._comboColsBy.addItem(new sap.ui.core.ListItem({
			key : "NONE",
			text: "[Select a Grouping Dimension]",
			additionalText : "Required" 
		}));
		this._comboIterateBy.addItem(new sap.ui.core.ListItem({
			key : "NONE",
			text: "[Select a Chart-By Dimension]",
			additionalText : "Required" 
		}));
		if (strMetadata) {
			this._metadata = jQuery.parseJSON(strMetadata);
			if (this._metadata) {
				for(var i=0;i<this._metadata.dimensions.length;i++){
					var dim = this._metadata.dimensions[i];
					this._comboGroupBy.addItem(new sap.ui.core.ListItem({
						key : dim.key,
						text: dim.text,
						additionalText : dim.key 
					}));
					this._comboColsBy.addItem(new sap.ui.core.ListItem({
						key : dim.key,
						text: dim.text,
						additionalText : dim.key 
					}));
					this._comboIterateBy.addItem(new sap.ui.core.ListItem({
						key : dim.key,
						text: dim.text,
						additionalText : dim.key 
					}));
				}
			}
		}
		
	};
	this.init = function() {
		// Init
		this._content = new sap.ui.commons.layout.VerticalLayout({
			width : "100%"
		});
		this._comboGroupBy = new sap.ui.commons.ComboBox("comboGroupBy");
		this._comboColsBy = new sap.ui.commons.ComboBox("comboColsBy");
		this._comboIterateBy = new sap.ui.commons.ComboBox("comboIterateBy");
		
		this._comboGroupBy.attachChange(function(){
			that._groupBy = that._comboGroupBy.getSelectedKey();
			that.firePropertiesChanged(["groupBy"]);
		});
		this._comboColsBy.attachChange(function(){
			that._colsBy = that._comboColsBy.getSelectedKey();
			that.firePropertiesChanged(["colsBy"]);
		});
		this._comboIterateBy.attachChange(function(){
			that._iterateBy = that._comboIterateBy.getSelectedKey();
			that.firePropertiesChanged(["iterateBy"]);
		});

		this._comboGroupBy.setTooltip("Group By");
		this._comboColsBy.setTooltip("Columns");
		this._comboIterateBy.setTooltip("Chart By");
		
		this._comboGroupBy.setDisplaySecondaryValues(true);
		this._comboColsBy.setDisplaySecondaryValues(true);
		this._comboIterateBy.setDisplaySecondaryValues(true);
		
		this._content.addContent(new sap.ui.commons.TextView({text : "Series/Columns Dimension (usually Key Figures)"}));
		this._content.addContent(this._comboGroupBy);
		this._content.addContent(new sap.ui.commons.TextView({text : "x-Axis Dimension"}));
		this._content.addContent(this._comboColsBy);
		this._content.addContent(new sap.ui.commons.TextView({text : "Chart-By Dimension"}));
		this._content.addContent(this._comboIterateBy);
				
		this._content.placeAt($("#content"));
		
		this.updateProps();
		this.rendered = true;
	};
	this.colsBy = function(value){
		if( value === undefined){
			return this._colsBy;
		}else{
			this._colsBy = value;
			if(that.rendered) that._comboColsBy.setSelectedKey(value);
			return this;
		}
	};
	this.groupBy = function(value){
		if( value === undefined){
			return this._groupBy;
		}else{
			this._groupBy = value;
			if(that.rendered) that._comboGroupBy.setSelectedKey(value);
			return this;
		}
	};
	this.iterateBy = function(value){
		if( value === undefined){
			return this._iterateBy;
		}else{
			this._iterateBy = value;
			if(that.rendered) that._comboIterateBy.setSelectedKey(value);
			return this;
		}
	};
	
});