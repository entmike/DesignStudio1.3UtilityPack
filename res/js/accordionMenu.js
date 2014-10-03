sap.ui.commons.Accordion.extend("com.sample.utilities.AccordionMenu", {
	_itemConfig : [],
	renderer : {},
	metadata : {				// Not to be confused with the Data Source metadata property
		properties : {
			itemConfig : "string",						// JSON section/items config from Design Studio
			expandedSection : "string",					// Expanded Section by Title
			selectedItem : "string",					// Item Name by Title
			fullyQualifiedSelectedItem : "string"		// Section Name-Item Name
		}
	},
	redraw : function(){
		var that = this;
		this.destroySections();
		var sectionID = -1;
		for(var i=0;i<this._itemConfig.length;i++){
			var sec = this._itemConfig[i];
			var collapsed = true;
			if(this._expandedSection == sec.title) {
				sectionID = i;
				collapsed = false;
			}
			var section = new sap.ui.commons.AccordionSection(this.getId()+"-section" + i,{
				title : sec.title || "Section " + (i+1),
				tooltip : sec.tooltip || "",
				collapsed : collapsed
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
						that._selectedItem = item.getText();
						that.fireDesignStudioPropertiesChanged(["selectedItem"]);
						that.fireDesignStudioEvent("onitemselect");
					}
				});
				section.addContent(listbox);
				var selectedIndex = -1;
				for(var j=0;j<sec.items.length;j++){
					var item = sec.items[j];
					listbox.addItem(new sap.ui.core.Item({
						key : (sec.title || "Section " + (i+1)) + "-" + item,
						text : item
					}));
					if(item==this._selectedItem && !collapsed) selectedIndex = j;
				}
				if(!collapsed) listbox.setSelectedIndex(selectedIndex);
			}
			this.addSection(section);
		}
		if(sectionID!=-1) this.setOpenedSectionsId(this.getId() + "-section" + sectionID);
	},
	setItemConfig : function(s){
		var o = [];
		if(s && s!="") o = jQuery.parseJSON(s);
		this._itemConfig = o;
		this.redraw();
		return this;
	},
	getItemConfig : function(){
		return JSON.stringify(this._itemConfig);
	},
	setSelectedItem : function(s){
		this._selectedItem = s;
		this.redraw();
	},
	getSelectedItem : function(){
		return this._selectedItem;
	},
	setExpandedSection : function(s){
		this._expandedSection = s;
		this.redraw();
	},
	getExpandedSection : function(){
		return this._expandedSection;
	},
	/*
	setOpenedSectionsId : function(s){
		//Disable
		sap.ui.commons.Accordion.prototype.setOpenedSectionsId.apply(this,arguments);
		//alert(s);
	},
	*/
	initDesignStudio : function() {
		// Called by sap.designstudio.sdkui5.Handler  (sdkui5_handler.js)
	},
	clickHandler : function(){
		// this.fireDesignStudioEvent("onclick");
	},
	sectionOpenHandler : function(oControlEvent){
		var sid = oControlEvent.getParameter("openSectionId");
		this._expandedSection = "";
		var sections = this.getSections();
		for(var i=0;i<sections.length;i++){
			if(sections[i].getId()==sid) {
				this._expandedSection = sections[i].getTitle();
			}
		}
		this.fireDesignStudioPropertiesChanged(["expandedSection"]);
		this.fireDesignStudioEvent("onsectionchange");
	},
	init : function(){
		sap.ui.commons.Accordion.prototype.init.apply(this,arguments);
		this.attachSectionOpen(this.sectionOpenHandler, this);
		this.addStyleClass("utilPackAccordionMenu");
	}
});