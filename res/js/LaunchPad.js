jQuery.sap.require("sap.m.TileContainer");
sap.m.TileContainer.extend("com.sample.utilities.LaunchPad", {
	_tileConfig : [],
	_selectedTile : "",
	renderer : {},
	metadata : {				// Not to be confused with the Data Source metadata property
		properties : {
			tileConfig : "string",		// Tiles
			selectedTile : "string"		// Selected Tile
		}
	},
	setSelectedTile : function(s){
		this._selectedTile = s;
	},
	getSelectedTile : function(){
		return this._selectedTile;
	},
	setTileConfig : function(s){
		this._tileConfig = [];
		if(s && s!="") this._tileConfig = jQuery.parseJSON(s);
		this.drawTiles();
	},
	getTileConfig : function(){
		return JSON.stringify(this._tileConfig);
	},
	initDesignStudio : function() {
		// Called by sap.designstudio.sdkui5.Handler  (sdkui5_handler.js)
	},
	tileSelect : function(title,oControlEvent){
		this._selectedTile = title;
		this.fireDesignStudioPropertiesChanged(["selectedTile"]);
		this.fireDesignStudioEvent("onTileSelect");
	},
	init : function(){
		sap.m.TileContainer.prototype.init.apply(this,arguments);
		this.drawTiles();
	},
	drawTiles : function(){
		this.destroyTiles();
		for(var i=0;i<this._tileConfig.length;i++){
			var tileConf = this._tileConfig[i];
			var tile = new sap.m.StandardTile({
				title : tileConf.title,
				info : tileConf.info,
				icon : tileConf.icon,
				number : tileConf.number,
				numberUnit : tileConf.numberUnit,
				infoState : tileConf.valueState	|| "None"
			});
			if(tileConf.styleClass) tile.addStyleClass(tileConf.styleClass);
			tile.attachBrowserEvent("click", function(t){return function(oControlEvent){this.tileSelect(t,oControlEvent);};}(tileConf.title),this);
			this.addTile(tile);
		}
	}
});