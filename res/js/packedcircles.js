sap.designstudio.sdk.Component.subclass("com.sample.utilities.PackedCircles", function() {
	this.svg = null;
	this._metadata = null;
	this._sizes = null;
	this._flatten = false;
	this._hideLabels = false;
	this.metadata = function(o){
		if(o===undefined){
			return this._metadata;
		}else{
			this._metadata = o;
			return this;
		}		
	};
	this.sizes = function(o){
		if(o===undefined){
			return this._sizes;
		}else{
			this._sizes = o;
			return this;
		}		
	};
	
	this.flatten = function(b){
		if(b===undefined){
			return this._flatten;
		}else{
			this._flatten = b;
			return this;
		}
	};
	this.hideLabels = function(b){
		if(b===undefined){
			return this._hideLabels;
		}else{
			this._hideLabels = b;
			return this;
		}
	};
	
    this.init = function() {
         var w = this.$().width();
         var h = this.$().height();
         this.$().css("overflow","hidden");
         this.margin = 20;
         this.diameter = w;
         if(h<w) this.diameter = h;
         
         this.format = d3.format(",d"),
         
         // Flattened Colors
         this.color = d3.scale.category20c();
         // Hierarchical Zoom Colors
         this.zoomColor = d3.scale.linear()
         	.domain([-1, 5])
         	.range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
         	.interpolate(d3.interpolateHcl);
         
         this.svg = d3.select(this.$()[0]).append("svg")
         	.attr("width", this.diameter)
         	.attr("height", this.diameter);
         	//.attr("class", "bubble");
         
         this.bubble = d3.layout.pack()
         	.sort(d3.descending)
         	.size([w, h])
         	.padding(1.5);
         
         this.hierPack = d3.layout.pack()
         	.padding(2)
         	.sort(d3.descending)
         	.size([this.diameter - this.margin, this.diameter - this.margin])
         	.value(function(d) { return d.value; });
         
         this.pack();
    };  

    this.afterUpdate = function() {
    	this.pack();
    };
    this.getHier = function() {
    	// Convert from BICS SDK structure to JSON parent-child structure
    	var m = this._metadata;
    	var sizeData = this._sizes;
    	if(!m) return {
    		name : "No Data",
    		levelName : "No Data",
    		value : 100
    	};
    	if(m.dimensions.length!=2){
    		return {
    			name : "Too Many Dimensions",
    			levelName : "No Data",
    			value : 100
    		};
    	}
    	var hierDim = m.dimensions[1];
    	var currentDepth = 0;
    	var masterNode = {};
    	var nodeRefs = [masterNode];
    	var hierMembers = hierDim.members;
    	for(var i=0;i<hierMembers.length;i++){
    		var member = hierMembers[i];
    		// Pre-req check
    		if(member.type!="HIERARCHY_NODE") {
    			//alert("Dimension is not a hierarchy.  Bye.");
    		}
    		var currentLevel = 0;
    		var currentNode;
   		
    		// See if we are at root or a new node.
    		if(member.level) {
    			currentLevel = member.level;
    			currentNode = {};										// New Node
    			nodeRefs[member.level] = currentNode;					// Current Node Path reference (for determining parents)
    			nodeRefs[member.level-1].children.push(currentNode);	// Parent-Child link made.
    			currentNode.levelName = nodeRefs[member.level-1].name;
    		}else{	// Root Node
    			currentNode = masterNode;
    			currentNode.levelName = member.text;
    		}
    		// Give node a name.
    		currentNode.name = member.text;

    		// See if node has children.
    		if(member.nodeState=="COLLAPSED"){
				currentNode.value = sizeData.data[i];
			}else{
				currentNode.children = [];
			}
    	}
    	return masterNode;
    };
    
    this.pack = function(){
    	if(!this.svg) return;
    	var that = this;
    	var hier = this.getHier();   	
    	this.root = this.classes(hier);   	
    	this.svg.selectAll("g").remove();
    	if(this.flatten()){	// Flattened
    		var node = this.svg.selectAll(".zoomNode")
    		.data(this.bubble.nodes(this.root)	// Flattened Hierarchy Wrapper
    		.filter(function(d) { return !d.children; }))
    	.enter().append("g")
    		.attr("class", "zoomNode")
    		.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

    	node.append("title")
        	.text(function(d) { return d.name + ": " + that.format(d.value); });

    	node.append("circle")
        	.attr("r", function(d) { return d.r; })
        	.style("fill", function(d) { return that.color(d.levelName); });
    	
    	if(!this.hideLabels()){
    		node.append("text")
        	.attr("dy", ".3em")
        	.style("text-anchor", "middle")
        	.text(function(d) { return d.name.substring(0, d.r / 3); });
    	}
    	
    	}else{	// Hierarchical
    		var g = this.svg.append("g").attr("transform","translate(" + this.diameter/2 + "," + this.diameter/2 + ")");
    		
    		var focus = this.root;
    	    var nodes = this.hierPack.nodes(this.root);

    	  this.circle = g.selectAll("circle")
    	      .data(nodes)
    	    .enter().append("circle")
    	      .attr("class", function(d) { return d.parent ? d.children ? "zoomNode" : "zoomNode zoomNode--leaf" : "zoomNode zoomNode--root"; })
    	      .style("fill", function(d) { return d.children ? that.zoomColor(d.depth) : null; })
    	      .on("click", function(d) { if (that.focus !== d) that.zoom(d), d3.event.stopPropagation(); });

	      	if(!this.hideLabels()){
				  var text = g.selectAll("text")
				  .data(nodes)
				.enter().append("text")
				  .attr("class", "zoomLabel")
				  .style("fill-opacity", function(d) { return d.parent === that.root ? 1 : 0; })
				  .style("display", function(d) { return d.parent === that.root ? null : "none"; })
				      .text(function(d) { return d.name; });
	      	}
			  this.node = g.selectAll("circle,text");
    	  
    	  // D3's example is probably not a good idea - Attaching zoom out to the DIV wrapper.    	  
    	  // d3.select("body").on("click", function() { that.zoom(that.root); });
    	  this.$().click(function() { that.zoom(that.root); });
    	  
    	  this.zoomTo([this.root.x, this.root.y, this.root.r * 2 + this.margin]);
    	}
    };
    this.zoom = function(d) {
    	var that = this;
        var focus0 = this.focus;
        this.focus = d;

        var transition = d3.transition()
            .duration(750)
            .tween("zoom", function(d) {
              var i = d3.interpolateZoom(that.view, [that.focus.x, that.focus.y, that.focus.r * 2 + that.margin]);
              return function(t) { that.zoomTo(i(t)); };
            });

        transition.selectAll("text")
          .filter(function(d) { return d.parent === that.focus || this.style.display === "inline"; })
            .style("fill-opacity", function(d) { return d.parent === that.focus ? 1 : 0; })
            .each("start", function(d) { if (d.parent === that.focus) this.style.display = "inline"; })
            .each("end", function(d) { if (d.parent !== that.focus) this.style.display = "none"; });
      };

      this.zoomTo = function(v) {
    	var k = this.diameter / v[2]; 
        this.view = v;
        this.node.attr("transform", function(d) { return "translate(" + (d.x - v[0]) * k + "," + (d.y - v[1]) * k + ")"; });
        this.circle.attr("r", function(d) { return d.r * k; });
      };
    // Returns a flattened hierarchy containing all leaf nodes under the root.
    this.classes = function(root) {
      if(!this.flatten()) {
    	  root.levelName = "Root";
    	  root.name = "Root";
    	  return root;		// Return to sender as real hierarchy
      }
      var classes = [];

      function recurse(name, node) {
        if (node.children) node.children.forEach(function(child) { recurse(node.name, child); });
        else classes.push({levelName: name, name: node.name, value: node.value});
      }

      recurse(null, root);
      return {children: classes};		// Flattened hierarchy
    };
});