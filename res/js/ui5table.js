/**
 * Experimental, based of code from David Stocker.  Currently has a bug for when more than one dimension is in rows
 */
sap.ui.table.Table.extend("com.sample.utilities.UI5Table", {
	renderer : {},
	metadata : {				// Not to be confused with the Data Source metadata property
		properties : {
			onclick : "string",	// While 'onclick' is technically a DS Event, it does pass some information, so let's take it.
			metadata : {},
			resultset : {}
		}
	},
	_rs : null,
	setResultset : function(o){
		this._rs = o;
		var flat = reformatIntoSimpleTuples(o,"text");
		//	alert(JSON.stringify(flat));
		this.destroyColumns();
		// Column creation
		for (var i = 0; i < flat.headerTuple.length; i++) {
			var colID = "{RESULT/COL" + i.toString() + "}";
			var oControl = new sap.ui.commons.TextView({text:colID}); // short binding notation
			this.addColumn(new sap.ui.table.Column({
				label: new sap.ui.commons.Label({
					text: flat.headerTuple[i]}),
					template: oControl
				})
			);
		}
		// Row Data
		var resultJSONList = [];
		for (var i = 0; i < flat.rowTuples.length; i++) {
			var resultObject = new Object();
			for (var j = 0; j < flat.rowTuples[i].length; j++) {
				var colKey = "COL" + j.toString();
				resultObject[colKey] = flat.rowTuples[i][j];
			}
			var resultObjectOuter = new Object();
			resultObjectOuter["RESULT"] = resultObject;
			resultJSONList.push(resultObjectOuter);
		}

		var allResultObject = new Object();
		allResultObject["RESULTS"] = resultJSONList;

		// create a JSONModel, fill in the data and bind the Table to this model
		var oModel = new sap.ui.model.json.JSONModel();
		oModel.setData(allResultObject);
		this.setModel(oModel);
		this.bindRows("/RESULTS");
	},
	getResultset : function(){
		return this._rs;
	},
	initDesignStudio : function() {
		// Called by sap.designstudio.sdkui5.Handler  (sdkui5_handler.js)
	},
	init : function() {
		sap.ui.table.Table.prototype.init.apply(this,arguments);
	},
	// Override onclick setter to then attach/detach Design Studio event raising.
	setOnclick : function(s){
		if(s && s != ""){		// If there's onclick BIAL, then add an event listener (and get a hand cursor).
			// this.attachPress(this.clickHandler);
		}else{					// If not, remove the event listener (which will get rid of the hand cursor, too)
			// this.detachPress(this.clickHandler);
		}
	},
	clickHandler : function(){
		this.fireDesignStudioEvent("onclick");
	}
});