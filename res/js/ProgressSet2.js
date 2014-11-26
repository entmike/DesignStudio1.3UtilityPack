sap.designstudio.sdk.Component.subclass("com.sample.utilities.ProgressSet", function() {
	this._barConfig = [];
	this._selectedBar = "";
	this._labelWidth = 150;
	
	this.labelWidth = function(i){
		if(i===undefined){
			return this._labelWidth;
		}else{
			this._labelWidth = i;
			return this;
		}
	};
	this.barConfig = function(s){
		if(s===undefined){
			return JSON.stringify(this._barConfig);
		}else{
			this._barConfig = [];
			if(s && s !="") this._barConfig = jQuery.parseJSON(s);
			return this;
		}
	};
	this.afterUpdate = function(){
		this.drawBars();
	}
	this.barSelect = function(title,oControlEvent){
		this._selectedTile = title;
		this.fireDesignStudioPropertiesChanged(["selectedTile"]);
		this.fireDesignStudioEvent("onTileSelect");
	};
	this.init = function(){
		this.$().addClass("utilPackProgressSet");
		this.drawBars();
	};
	this.drawBars = function(){
		// Generate Data
		var data = [];
		for(var i=0;i<this._barConfig.length;i++){
			var bar = this._barConfig[i];
			var newItem = {
				title : "Title " + i,
				value : 0
			};
			if(bar.title) newItem.title = bar.title;
			if(bar.number) newItem.value = parseFloat(bar.number);
			data.push(newItem);
		}
		alert(JSON.stringify(data));
		// Positioning and Sizing
		var margin = {
			top : 5,
			bottom : 5,
			left : 5,
			right : 5,
			innerBarPadding : .1,
			outerBarPadding : 1,
			labelWidth : this.labelWidth()
		};
		var height = this.$().height() - margin.top - margin.bottom;
		var width = this.$().width() - margin.left - margin.right;
		// Color Scale (optional)
		var colorScale = d3.scale.category20()
			.domain(data.map(function(d){return d.title}));
		// Y Scale
		var y = d3.scale.ordinal()
			.rangeRoundBands([0, height], margin.innerBarPadding, margin.outerBarPadding)
			.domain(data.map(function(d){return d.title}));

		// X Scale
		var x = d3.scale.linear()
	    	.range([0, width - margin.labelWidth])
	    	.domain([0, d3.max(data, function(d) { return d.value; })]);
		
		// SVG
		var vis = d3.select("#" + this.$().attr("id")+"_viz");
		if(vis.empty()) {
			vis = d3.select(this.$().get(0))
			.append("svg")
				.attr("id", this.$().attr("id")+"_viz")
				.attr("width", this.$().width())
				.attr("height", this.$().height());
		}else{
			//alert("vis exists");
		}
		
		// Bar Group
		var barGroup = vis.select("g");
		if(barGroup.empty()) barGroup = vis.append("g");
		barGroup.attr("transform","translate(" + margin.left + "," + margin.top + ")");
		// Bars
		var bars = barGroup.selectAll(".progressBar")
			//.data(data);	// Doesn't work as expected for me
			.data(data, function(d) { return d.title; });
		var barEnter = bars.enter()
			.append("g")
			.attr("class","progressBar")
			.attr("transform", function(d,i){
				//alert("Adding new entry " + d.title);
				return "translate(" + 0 + "," + y(d.title) + ")";
			});
		
		bars.exit()
			//.transition().duration(1500)
			//.style("fill-opacity", 1e-6)
			//.attr("y", 0)
			.remove();		
		// Append new text labels
		barEnter.append("text")
			.attr("text-anchor", "left")
			.attr("dominant-baseline","middle");
		// Append new bars
		barEnter.append("rect")
			.attr("class","utilPackProgressSetBar")
			.attr("y",0);
			//.transition().duration(800).delay(125)
			//.attr("x",margin.labelWidth)
			//.attr("height",function(d){return y.rangeBand();})
			//.attr("fill", function(d){return colorScale(d.title);})
			//.attr("width",function(d) { return x(d.value); })
			//.transition().duration(250).delay(125)			
			//.attr("width",function(d) { return x(d.value); });

		// Select all progress bar groups and update position.
		barGroup.selectAll(".progressBar").transition()
			.duration(400)
			.attr("transform", function(d,i){
				return "translate(" + 0 + "," + y(d.title) + ")";
			});

		// Cosmetic updates to rect and text
		barGroup.selectAll(".progressBar").selectAll("rect").transition()
			.duration(400)
			.attr("x",margin.labelWidth)
			.attr("height",function(d){ return y.rangeBand();})
			.attr("fill", function(d){ return colorScale(d.title);})
			.attr("width",function(d){ alert("my w:" + d.title); return x(d.value); });
		
		barGroup.selectAll(".progressBar").selectAll("text").transition()
			.duration(400)
			.text(function(d){return d.title})
			.attr("y",function(d){return y.rangeBand()/2;});
		/*
		
		textLabels.enter()
			.append("text")
			.text(function(d){return d.title})
			.attr("y",function(d){return y.rangeBand()/2;})
			.attr("text-anchor", "left")
			.attr("dominant-baseline","middle");
		
		// Update
		

		bars.exit().remove();
		textLabels.exit().remove();
		rects.exit().remove();
		*/			
	};
});