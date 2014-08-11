A javascript library function for use in SAP Design Studio plugin components, transforming the single JSON result set into a list of tuples.  If you are working on an SAP Design Studio SDK plugin and pulling data into your component, you might notice that the result set JSON is very complex.  tuplesformatTransform.js contains the reformatIntoSimpleTuples() function.  reformatIntoSimpleTuples() transforms the single JSON result set into a list of tuples for easier consumption in some cases.  

reformatIntoSimpleTuples() takes two parameters:
zenResultSetJSON = the result set that you wish to transform.  It must be of the single JSON result set type as described in the Design Studio developers’ Guide.  
displayType = the display type (‘key’ or ‘text’) that you wish to use.  You fill your result set tuple list with either key or text values.  

reformatIntoSimpleTuples() holds most of its variables in the local scope.  It creates two in the global scope for use in other places:  
headerTuple compresses the (potentially) multi-leveled header into a single header line, with the stacked text concatenated into each cell.
rowTuples contains each row with the following format: 
[row measure members1, 
row measure members2, 
..., 
row measure membersN, 
row dimension members1, 
row dimension members2, 
..., 
row dimension membersN, 
data1, 
data2, 
..., 
dataN]

Also included are two sample files to demonstrate the function in action.
entureResultset.js contains an example result set; what resultset being fed to a Design Studio SDK component might look like.

Html5.html is an example html file, with an SAP UI5 table.  The html file’s script calls reformatIntoSimpleTuples(), using the sample data from entureResultset.js and puts that data into the UI5 table.
