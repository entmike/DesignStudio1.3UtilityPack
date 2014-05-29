sap.designstudio.sdk.PropertyPage.subclass("com.sample.utilities.HighChartsPropertyPage",  function() {
	var that = this;
	this.rendered = false;
	this._dataResultCellSet = {};
	this._metadata = {};
	this._groupBy = "";
	this._colsBy = "";
	this._comboGroupBy = null;
	this._comboColsBy = null;
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
		// var strChartConfig = that.callRuntimeHandler("getChartConfigAsString");		// debug
		var strMetadata = that.callRuntimeHandler("getMetadataAsString");
		this._comboGroupBy.addItem(new sap.ui.core.ListItem({
			key : "NONE",
			text: "[Select a Grouping Dimension]",
			additionalText : "Optional" 
		}));
		this._comboColsBy.addItem(new sap.ui.core.ListItem({
			key : "NONE",
			text: "[Select a Grouping Dimension]",
			additionalText : "Optional" 
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
		
		this._comboGroupBy.attachChange(function(){
			that._groupBy = that._comboGroupBy.getSelectedKey();
			that.firePropertiesChanged(["groupBy"]);
		});
		this._comboColsBy.attachChange(function(){
			that._colsBy = that._comboColsBy.getSelectedKey();
			that.firePropertiesChanged(["colsBy"]);
		});

		this._comboGroupBy.setTooltip("Group By");
		this._comboColsBy.setTooltip("Columns");
		
		this._comboGroupBy.setDisplaySecondaryValues(true);
		this._comboColsBy.setDisplaySecondaryValues(true);
		
		this._content.addContent(new sap.ui.commons.TextView({text : "Series/Columns Dimension (usually Key Figures)"}));
		this._content.addContent(this._comboGroupBy);
		this._content.addContent(new sap.ui.commons.TextView({text : "x-Axis Dimension"}));
		this._content.addContent(this._comboColsBy);
				
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
	
});