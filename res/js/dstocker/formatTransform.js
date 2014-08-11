function reformatIntoSimpleTuples(zenResultSetJSON, displayType){
	/*	This function returns a JSON object with two properties:
	 * 
	 * 	headerTuple and rowTuples.
	 * 	
	 * 	displayType and displayRowHeaders are optional
	 * 	
	 * 	displayType should be "text" or "key" (note, anything other than "text" is treated as "key")
	 * 	
	 * 	headerTuple - compresses the (potentially) multi-leveled header into a single header line, 
	 * 	with the stacked text concatenated into each cell
	 * 
	 * 	rowTuples - contains each row with the following format:
	 * 	[row measure members1, rmm2, ..., rmmN, row dimension members1, rdm2, ..., rdmN, data1, data2, ..., dataN]
	 * 
	 */		
	
	displayType = typeof displayType !== 'undefined' ? displayType : 'text';

	var tuples = zenResultSetJSON.tuples;
	var lastTuple = tuples[tuples.length -1];
	var lenDataGridXAxis = lastTuple[1];
	var lenDataGridYAxis = lastTuple[2];
	
	//walk through the dimensons/measures.  collect the "column dimensions", measures and row dimensions.
	var colDimensions = [];
	var rowDimensions = [];
	var colMeasures = [];
	var rowMeasures = [];
	
	var longestDimSet = 0;  	//This is the number of data columns
	var numberOfDataTuples = 0;	//This is the number of tuples
	var headerData = zenResultSetJSON.dimensions;
	for (var i = 0; i < headerData.length; i++) {
		var members = [];
		var perDimMembers = [];
		if (typeof(headerData[i].containsMeasures) != "undefined"){
			//we have a measure
			for (var j = 0; j < headerData[i].members.length; j++) {
				if (displayType == 'text'){
					perDimMembers.push(headerData[i].members[j].text);
				} else{
					perDimMembers.push(headerData[i].members[j].key);
				}
			}

			if (headerData[i].axis == "COLUMNS"){
				colMeasures.push(perDimMembers);
				//keeping track of the longest set of dimensions
				if (perDimMembers.length > longestDimSet){
					longestDimSet = perDimMembers.length;
				}
			}else{
				rowMeasures.push(perDimMembers);
			}
		} else{
			// we have a dimension
			for (var j = 0; j < headerData[i].members.length; j++) {
				if (displayType == 'text'){
					perDimMembers.push(headerData[i].members[j].text);
				} else{
					perDimMembers.push(headerData[i].members[j].key);
				}
				//keeping track of the number of tuples
				if (headerData[i].members.length > numberOfDataTuples){
					numberOfDataTuples = headerData[i].members.length;
				}
			}
			
			if (headerData[i].axis == "COLUMNS"){
				colDimensions.push(perDimMembers);
				//keeping track of the longest set of dimensions
				if (perDimMembers.length > longestDimSet){
					longestDimSet = perDimMembers.length;
				}
			} else{
				rowDimensions.push(perDimMembers);
			}			
		}
	}
	
	//Build the table data tuples.
	//  A single tuple will contain all of the row labels and the 
	var nNthDataPoint = -1;
	var rowTuples = [];
	for (var i = 0; i < numberOfDataTuples; i++) {
		var rowTuple = [];

		//Add the leading row labels
		for (var j = 0; j < rowDimensions.length; j++) {
			if (typeof(rowDimensions[j][i]) != "undefined"){
				rowTuple.push(rowDimensions[j][i]);
			} else{
				rowTuple.push("");
			}
		}
		for (var j = 0; j < rowMeasures.length; j++) {
			if (typeof(rowMeasures[j][i]) != "undefined"){
				rowTuple.push(rowMeasures[j][i]);
			} else{
				rowTuple.push("");
			}
		}
		
		//Now add the actual row data to the tuple
		for (var j = 0; j < longestDimSet; j++){
			nNthDataPoint++;
			if (typeof(zenResultSetJSON.data[nNthDataPoint]) != "undefined"){
				rowTuple.push(zenResultSetJSON.data[nNthDataPoint]);
			}
			else{
				rowTuple.push("");
			}
		}
		
		rowTuples.push(rowTuple);
	}
	// The data tuples are now complete
	
	
	
	// Build the Table Headers
	
	var headerTuple = [];
	// The initial entries (directly above the row dim/measure members on the left side of the table) are blank
	if (typeof(rowTuples[0]) != "undefined"){
		if (rowTuples[0].length > longestDimSet){
			var headerBufferLength = rowTuples[0].length - longestDimSet;
			for (var i = 0; i < headerBufferLength; i++) {
				headerTuple.push("");
			}
		}
	}
	
	//"Normalize" the lengths of the column dim/measure members.
	for (var i = 0; i < colMeasures.length; i++) {
		var localLength = colMeasures[i].length;
		var spans = Math.floor(longestDimSet/localLength);
		if (spans > 1){
			for (var j = 1; j < spans; j++) {
				for (var k = 0; k < localLength; k++){
					if (typeof(colMeasures[i][k]) != "undefined"){
						colMeasures[i].push(colMeasures[i][k]);
					}
				}
			}
		}
	}
	
	for (var i = 0; i < colDimensions.length; i++) {
		var localLength = colDimensions[i].length;
		var spans = Math.floor(longestDimSet/localLength);
		if (spans > 1){
			for (var j = 1; j < spans; j++) {
				for (var k = 0; k < localLength; k++){
					if (typeof(colDimensions[i][k]) != "undefined"){
						colDimensions[i].push(colDimensions[i][k]);
					}
				}
			}
		}
	}
	
	//The lengths of the table headers whould now be normalized
	//compress all of the "stacked" header rows into a single row.
	for (var i = 0; i < longestDimSet; i++) {
		var currentHeader = "";
		for (var j = 0; j < colMeasures.length; j++) {
			if (typeof(colMeasures[j][i]) != "undefined"){
				if (currentHeader.length > 0){
					currentHeader = currentHeader + "";
				}
				currentHeader = currentHeader + colMeasures[j][i];
			} 
		}
		for (var j = 0; j < colDimensions.length; j++) {
			if (typeof(colDimensions[j][i]) != "undefined"){
				if (currentHeader.length > 0){
					currentHeader = currentHeader + "";
				}
				currentHeader = currentHeader + colDimensions[j][i];
			} 
		}
		headerTuple.push(currentHeader);
	}
	
	return {
		headerTuple : headerTuple,
		rowTuples : rowTuples
	};
}