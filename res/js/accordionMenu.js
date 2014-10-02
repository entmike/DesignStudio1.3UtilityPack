sap.ui.commons.Accordion.extend("com.sample.utilities.AccordionMenu", {
	_itemConfig : [],
	renderer : {},
	metadata : {				// Not to be confused with the Data Source metadata property
		properties : {
			itemConfig : "string"	// JSON section/items config from Design Studio 
		}
	},
	redraw : function(){
		var that = this;
		this.destroySections();
		for(var i=0;i<this._itemConfig.length;i++){
			var sec = this._itemConfig[i];
			var section = new sap.ui.commons.AccordionSection("section" + (i+1),{
				title : sec.title || "Section " + (i+1),
				tooltip : sec.tooltip || ""
			});
			if(sec.items){
				var listbox = new sap.ui.commons.ListBox({
					width : "100%",
					select : function(oControlEvent){
						var sections = that.getSections();
						for(var s=0;s<sections.length;s++){
							var sectionContent = sections[s].getContent();
							if(sectionContent.length>0){
								var lb = sectionContent[0];	// Listbox
								if(lb!=this) lb.setSelectedIndex(-1);
							}
						}
						var item = oControlEvent.getParameter("selectedItem");
						alert(item.getKey());
					}
				});
				section.addContent(listbox);
				for(var j=0;j<sec.items.length;j++){
					var item = sec.items[j];
					listbox.addItem(new sap.ui.core.Item({
						key : (sec.title || "Section " + (i+1)) + "-" + item,
						text : item
					}));
				}
			}
			this.addSection(section);
		}
	},
	setItemConfig : function(s){
		var o = [];
		if(s && s!="") o = jQuery.parseJSON(s);
		this._itemConfig = o;
		this.redraw();
	},
	getItemConfig : function(){
		return JSON.stringify(this._itemConfig);
	},
	setOpenedSectionsId : function(s){
		sap.ui.commons.Accordion.prototype.setOpenedSectionsId.apply(this,arguments);
		alert(s);
	},
	initDesignStudio : function() {
		// Called by sap.designstudio.sdkui5.Handler  (sdkui5_handler.js)
	},
	clickHandler : function(){
		// this.fireDesignStudioEvent("onclick");
	},
	init : function(){
		sap.ui.commons.Accordion.prototype.init.apply(this,arguments);
		this.addStyleClass("utilPackAccordionMenu");
		return;
		//Building Section 1
		var oSection1 = new sap.ui.commons.AccordionSection( "section1" );		
		oSection1.setTitle("Section 1");
		oSection1.setTooltip("Section 1");
		//oSection1.setMaxHeight("100px");
		for (var i=0 ; i < 5 ; i++){		  		  
			var oCheckBox1 = new sap.ui.commons.CheckBox( "CheckBox1"+i );
			oCheckBox1.setText("CheckBox1 "+i);
			oSection1.addContent( oCheckBox1);		  
			var oLabel1 = new sap.ui.commons.Label( "Label1"+i );
			oLabel1.setText("Label 1 "+i);			  		 
			oSection1.addContent( oLabel1);
		}						
		this.addSection( oSection1 );
					
		//Building Section 2
		var oSection2 = new sap.ui.commons.AccordionSection( "section2");
		oSection2.setTitle("Section 2");		
		for (var i=0 ; i < 5 ; i++){		  
			var oCheckBox2 = new sap.ui.commons.CheckBox( "CheckBox2"+i );
			oCheckBox2.setText("CheckBox2 "+i);
			oSection2.addContent( oCheckBox2);
		}		
		this.addSection( oSection2 );		
	}
});