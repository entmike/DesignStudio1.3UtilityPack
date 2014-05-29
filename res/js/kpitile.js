sap.designstudio.sdk.Component.subclass("com.sample.utilities.KpiTile", function() {

	var that = this;

	var meta_data = null;	
	
	// Layout.
	this.paddingDiv = null;
	this.headerDiv = null;
	this.titleDiv = null;
	this.valueVDiv = null;
	this.valueDiv = null;
	this.footerVDiv = null;
	this.footerDiv = null;
	
	// Properties.
	this._headerText = "Header"; 
	this._headerVisible = true;
	this._titleText = "Title";
	this._valuePrefixText = "";
	this._valuePrefixPosition = "subscript";
	this._valueText = "Value";
	this._valueSuffixText = " M$";
	this._valueSuffixPosition = "subscript";
	this._valueHAlign = "left";
	this._valueDecimalPlaces = "0";	
	this._data = null;
	this._dummyData = null;
	this._footerText = "Footer";
	this._footerHAlign = "left";
	
	// Property changes.
	this._headerChanged = true;
	this._titleChanged = true;
	this._valueChanged = true;
	this._footerChanged = true;

	this.init = function() {
		this.$().addClass("kpiTile");
		this._headerChanged = true;
		this._titleChanged = true;
		this._valueChanged = true;
		this._footerChanged = true;
		
		// Click handler.
		this.$().click(function() {
			that.fireEvent("onclick");
		});

		// Padding div.
		this.paddingDiv = document.createElement("DIV");
		$(this.paddingDiv).css( {
			padding:"10px"
		});
		$(this.paddingDiv).appendTo(this.$());
		
		// Header div.
		this.headerDiv = document.createElement("DIV");
		$(this.headerDiv).css( {
			paddingBottom: "4px"
		});
		$(this.headerDiv).appendTo(this.paddingDiv);

		// Title div.
		this.titleDiv = document.createElement("DIV");
		$(this.titleDiv).css( {
			paddingBottom:"5px"
		});
		$(this.titleDiv).appendTo(this.paddingDiv);
		
		// Value div (allows value to be vertically centered).
		this.valueVDiv = document.createElement("DIV");
		$(this.valueVDiv).css( {
			display:"table",
			position:"absolute",
			bottom:"10px"
		}).height(90);
		$(this.valueVDiv).appendTo(this.paddingDiv);
		
		// Vertically centered value div.
		this.valueDiv = document.createElement("DIV");
		$(this.valueDiv).css( {
			display:"table-cell",
			verticalAlign:"middle"
		});
		$(this.valueDiv).appendTo(this.valueVDiv);

		// Footer div (bottom aligned).
		this.footerVDiv = document.createElement("DIV");
		$(this.footerVDiv).css( {
			display:"table",
			position:"absolute",
			bottom:"10px"
		}).height(90);
		$(this.footerVDiv).appendTo(this.paddingDiv);

		// Bottom-aligned footer.
		this.footerDiv = document.createElement("DIV");
		$(this.footerDiv).css( {
			display:"table-cell",
			verticalAlign:"bottom"
		});
		$(this.footerDiv).appendTo(this.footerVDiv);
		
		// Layout.
		this.$().css( {
			lineHeight: "normal" // Fix for SAPUI5 lineheight=0.
		});
	};
	
	this.metadata = function(value) {
		if (value === undefined) {
			return meta_data;
		} else {
			meta_data = value;
			return this;
		}
	};

	this.headerText = function(value) {
		if (value === undefined) {
			return this._headerText;
		}
		else {
			this._headerText = value;
			this._headerChanged = true;
			return this;
		}
	};

	this.headerVisible = function(value) {
		if (value === undefined) {
			return this._headerVisible;
		}
		else {
			this._headerVisible = value;
			this._headerChanged = true;
			return this;
		}
	};

	this.headerCssClass = function(value) {
		if (value === undefined) {
			return this._headerCssClass;
		}
		else {
			this._headerCssClass = value;
			this._headerChanged = true;
			return this;
		}
	};
	
	this.titleText = function(value) {
		if (value === undefined) {
			return this._titleText;
		}
		else {
			this._titleText = value;
			this._titleChanged = true;
			return this;
		}
	};

	this.titleCssClass = function(value) {
		if (value === undefined) {
			return this._titleCssClass;
		}
		else {
			this._titleCssClass = value;
			this._titleChanged = true;
			return this;
		}
	};
	
	this.valuePrefixText = function(value) {
		if (value === undefined) {
			return this._valuePrefixText;
		}
		else {
			this._valuePrefixText = value;
			this._valueChanged = true;
			return this;
		}
	};

	this.valuePrefixPosition = function(value) {
		if (value === undefined) {
			return this._valuePrefixPosition;
		}
		else {
			this._valuePrefixPosition = value;
			this._valueChanged = true;
			return this;
		}
	};

	this.valuePrefixCssClass = function(value) {
		if (value === undefined) {
			return this._valuePrefixCssClass;
		}
		else {
			this._valuePrefixCssClass = value;
			this._valueChanged = true;
			return this;
		}
	};
	
	this.valueText = function(value) {
		if (value === undefined) {
			return this._valueText;
		}
		else {
			this._valueText = value;
			this._valueChanged = true;
			return this;
		}
	};

	this.valueCssClass = function(value) {
		if (value === undefined) {
			return this._valueCssClass;
		}
		else {
			this._valueCssClass = value;
			this._valueChanged = true;
			return this;
		}
	};	
	
	this.valueSuffixText = function(value) {
		if (value === undefined) {
			return this._valueSuffixText;
		}
		else {
			this._valueSuffixText = value;
			this._valueChanged = true;
			return this;
		}
	};

	this.valueSuffixPosition = function(value) {
		if (value === undefined) {
			return this._valueSuffixPosition;
		}
		else {
			this._valueSuffixPosition = value;
			this._valueChanged = true;
			return this;
		}
	};

	this.valueSuffixCssClass = function(value) {
		if (value === undefined) {
			return this._valueSuffixCssClass;
		}
		else {
			this._valueSuffixCssClass = value;
			this._valueChanged = true;
			return this;
		}
	};
	
	this.valueHAlign = function(value) {
		if (value === undefined) {
			return this._valueHAlign;
		}
		else {
			this._valueHAlign = value;
			this._valueChanged = true;
			return this;
		}
	};
	
	this.valueDecimalPlaces = function(value) {
		if (value === undefined) {
			return this._valueDecimalPlaces;
		}
		else {
			this._valueDecimalPlaces = value;
			this._valueChanged = true;
			return this;
		}
	};

	this.footerText = function(value) {
		if (value === undefined) {
			return this._footerText;
		}
		else {
			this._footerText = value;
			this._footerChanged = true;
			return this;
		}
	};

	this.footerCssClass = function(value) {
		if (value === undefined) {
			return this._footerCssClass;
		}
		else {
			this._footerCssClass = value;
			this._footerChanged = true;
			return this;
		}
	};	

	this.footerHAlign = function(value) {
		if (value === undefined) {
			return this._footerHAlign;
		}
		else {
			this._footerHAlign = value;
			this._footerChanged = true;
			return this;
		}
	};	
	this.dummyData = function(value){
		if (value === undefined) {
			return this._dummyData;
		}
		else {
			this._dummyData = value;
			this._valueChanged = true;
			return this;
		}
	};
	this.data = function(value) {
		if (value === undefined) {
			return this._data;
		}
		else {
			this._data = value;
			this._valueChanged = true;
			return this;
		}
	};	
	
	this.afterUpdate = function() {
		if (this._headerChanged) {
			this._headerChanged = false;
			this.updateHeaderText();
		}

		if (this._titleChanged) {
			this._titleChanged = false;
			this.updateTitleText();
		}

		if (this._valueChanged) {
			this._valueChanged = false;
			this.updateValueText();
		}

		if (this._footerChanged) {
			this._footerChanged = false;
			this.updateFooterText();
		}

		this.scaleValueText();
	};

	this.scaleValueText = function() {
		var theDiv = this.valueDiv;
		var scalingFactor = 1;
		var compPadding = parseInt($(this.paddingDiv).css("padding-left")) + parseInt($(this.paddingDiv).css("padding-right"));
		if (isNaN(compPadding) || compPadding < 0)  compPadding = 0;
		var compWidth = $(this.paddingDiv).width() - compPadding - 5;
		var valueDivWidth = $(theDiv).width();
		if (valueDivWidth >= compWidth) {
			scalingFactor = compWidth / valueDivWidth;
		}

		if (scalingFactor < 1) {
			$(this.valueVDiv).find("span").each(function() {
				var text = $(this).css("font-size");
				var originalFontSize = parseInt(text);
				var newFontSize = originalFontSize * scalingFactor;
				$(this).css(
						{
							"font-size" : newFontSize + "px", 
							"line-height" : newFontSize/1.2 + "px"
						} );
			} );
		}
	};

	this.updateHeaderText = function() {
		if (this.headerDiv) {
			if (this._headerVisible) {
				// Show the header.
				$(this.headerDiv).show();

				// Remove all classes.
				$(this.headerDiv).removeClass();

				if (this._headerCssClass && this._headerCssClass !== "") {
					// Using a class so remove font size and color styles.
					$(this.headerDiv).css("font-size", "").css("color", "").addClass(this._headerCssClass);
				}
				else {
					// No class so manually set the font size and color.
					$(this.headerDiv).css(
						{
							fontSize:"14px",
							color:"rgb(151,151,151)"
						});
				}

				var htmlText = this._headerText;
				if (!htmlText || htmlText === "") {
					$(this.headerDiv).html("&nbsp;");
				}
				else {
					var safeText = this.escapeHtml(htmlText);
					$(this.headerDiv).html(safeText);
				}
			}
			else {
				// Hide the header.
				$(this.headerDiv).hide().text("");
			}
		}
	};
	
	this.updateTitleText = function() {
		if (this.titleDiv) {
			// Remove all classes.
			$(this.titleDiv).removeClass();

			if (this._titleCssClass && this._titleCssClass !== "") {
				// Using a class so remove font size and color styles.
				$(this.titleDiv).css("font-size", "").css("color", "").addClass(this._titleCssClass);
			}
			else {
				// No class so manually set the font size and color.
				$(this.titleDiv).css(
					{
						fontSize:"20px",
						color:"rgb(68,68,68)"
					});
			}

			var safeText = this.escapeHtml(this._titleText);
			$(this.titleDiv).html(safeText);
		}
	};
	
	this.updateValueText = function() {
		if (this.valueDiv) {
			// CLear the text.
			$(this.valueDiv).html("");

			// Value prefix (can be superscript, subscript or normal).
			var prefixDiv = document.createElement("SPAN");
			$(prefixDiv).appendTo(this.valueDiv);
			if (this._valuePrefixText && this._valuePrefixText !== "") {
				var prefixPos = ("" + this._valuePrefixPosition).toUpperCase();
				var prefixTextDiv = prefixDiv;
				var prefixCss = {};
				if (prefixPos === "SUPERSCRIPT") {
					prefixTextDiv = document.createElement("SUP");
					$(prefixTextDiv).appendTo(prefixDiv);
					prefixCss = { fontSize: "20px" };
				}
				else if (prefixPos === "SUBSCRIPT") {
					prefixCss = { fontSize: "18px" };
				}

				// Prefix.
				$(prefixTextDiv).html(this.escapeHtml(this._valuePrefixText));

				// Prefix CSS.
				if (this._valuePrefixCssClass && this._valuePrefixCssClass !== "") {
					$(prefixTextDiv).addClass(this._valuePrefixCssClass);
				}
				else {
					$(prefixTextDiv).css(prefixCss);
				}
			}
			
			// Value.
			var valueTextDiv = document.createElement("SPAN");
			$(valueTextDiv).appendTo(this.valueDiv);
			if (this._valueText && this._valueText !== "") {
				var val = this._valueText;
				if (this._data && this._data.data.length > 0) {
					val = this._data.data[0];
					val = this.formatNumber(val);
				}else{
					if(this._dummyData != null){
						val = this._dummyData;
					}
				}
				$(valueTextDiv).html(this.escapeHtml(val));
			}

			// Value suffix (can be superscript, subscript or normal).
			var suffixDiv = document.createElement("SPAN");
			$(suffixDiv).appendTo(this.valueDiv);
			if (this._valueSuffixText && this._valueSuffixText !== "") {
				var suffixPos = ("" + this._valueSuffixPosition).toUpperCase();
				var suffixTextDiv = suffixDiv;
				var suffixCss = {};
				if (suffixPos === "SUPERSCRIPT") {
					suffixTextDiv = document.createElement("SUP");
					$(suffixTextDiv).appendTo(suffixDiv);
					suffixCss = { fontSize: "20px" };
				}
				else if (suffixPos === "SUBSCRIPT") {
					suffixCss = { fontSize: "18px" };
				}

				// Suffix.
				$(suffixTextDiv).html(this.escapeHtml(this._valueSuffixText));

				// Suffix CSS.
				if (this._valueSuffixCssClass && this._valueSuffixCssClass !== "") {
					$(suffixTextDiv).addClass(this._valueSuffixCssClass);
				}
				else {
					$(suffixTextDiv).css(suffixCss);
				}
			}

			// Left or right align the value.
			if (this._valueHAlign === "right") {
				$(this.valueVDiv).css("right", "10px");
			}
			else {
				$(this.valueVDiv).css("right", "");
			}
			
			// Add the value classes (or remove them).
			$(this.valueDiv).removeClass();
			if (this._valueCssClass && this._valueCssClass !== "") {
				// Using a class so remove font size, weight and color styles.
				$(this.valueDiv).css("font-size", "").css("font-weight", "").css("color", "").addClass(this._valueCssClass);
			}
			else {
				// No class so manually set the font size and color.
				$(this.valueDiv).css(
						{
							fontSize:"46px",
							fontWeight:"bold",
							color:"rgb(95,118,138)"
						});
			}
		}
	};
	
	this.updateFooterText = function() {
		if (this.footerDiv) {
			// Remove all classes.
			$(this.footerDiv).removeClass();

			if (this._footerCssClass && this._footerCssClass !== "") {
				// Using a class so remove font size and color styles.
				$(this.footerDiv).css("font-size", "").css("color", "").addClass(this._footerCssClass);
			}
			else {
				// No class so manually set the font size and color.
				$(this.footerDiv).css(
					{
						fontSize:"14px",
						color:"rgb(151,151,151)"
					});
			}

			// Left or right align the footer.
			if (this._footerHAlign === "right") {
				$(this.footerVDiv).css("right", "10px");
			}
			else {
				$(this.footerVDiv).css("right", "");
			}

			var safeText = this.escapeHtml(this._footerText);
			$(this.footerDiv).html(safeText);
		}
	};

	var entityMap = {
			"&": "&amp;",
			"<": "&lt;",
			">": "&gt;",
			'"': '&quot;',
			"'": '&#39;',
			"/": '&#x2F;'
	};
	
	this.escapeHtml = function(string) {
		return String(string).replace(/[&<>"'\/]/g, function (c) {
			return entityMap[c];
		});
	};	
	
	this.formatNumber = function(value) {
		sap.common.globalization.NumericFormatManager.setPVL(meta_data.locale);
		var strFormat = "#,##0";
		if (this._valueDecimalPlaces > 0) {
			strFormat += ".";
			for (var i = 0; i < this._valueDecimalPlaces; i++) {
				strFormat += "0";
			}
		}
		return sap.common.globalization.NumericFormatManager.format(value, strFormat);
	};
});