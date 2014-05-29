sap.designstudio.sdk.Component.subclass("com.sample.utilities.SlideShow", function() {
	// If we need to track the first init call
	this._alive = false;
	// Property setter/getter functions	
    this.autoProperties = {
		slideClicked : {
			value : -1
		},
    	slideDuration : {
    		value : 500,
    		redraw : true
    	},
    	autoPlay : {
    		value : true,
    		redraw : true
    	},
    	autoPlayInterval : {
    		value : 5000,
    		redraw : true
    	},
    	arrowLeftCSS : {
    		value : "",
    		redraw :true
    	},
    	arrowRightCSS : {
    		value : "",
    		redraw :true
    	},
    	captionCSS : {
    		value : "",
    		redraw :true
    	},
    	bulletCSS : {
    		value : "",
    		redraw :true
    	},
    	navigatorCSS : {
    		value : "",
    		redraw :true
    	}
    };
	/*
	 * Create the aforementioned getter/setter and attach to 'this'.
	 */
	for(var property in this.autoProperties){
		this[property] = function(property){
			return function(value){
				if(value===undefined){
					return this.autoProperties[property].value;
				}else{
					this.autoProperties[property].value = value;
					this.autoProperties[property].changed = true;
					return this;
				}
			};
		}(property);
	}
	// Complex Arrays next
	this.autoProperties.src = {
		value : new Array(100),
		redraw : true
	};
	this.autoProperties.caption = {
		value : new Array(100),
		redraw : true
	};
	// Create array setter/getters:
    for(var i=0;i<this.autoProperties.src.value.length;i++){
    	this["src"+i] = function(i){
    		return function(s){
    			if(s===undefined){
					return this.autoProperties.src.value[i];
				}else{
					this.autoProperties.src.value[i] = s;
					this.autoProperties.src.changed = true;
					return this;
				}
    		};
    	}(i);
    	this["caption"+i] = function(i){
    		return function(s){
    			if(s===undefined){
					return this.autoProperties.caption.value[i];
				}else{
					this.autoProperties.caption.value[i] = s;
					this.autoProperties.caption.changed = true;
					return this;
				}
    		};
    	}(i);
    }
    // After Property Update
    this.afterUpdate = function(){
    	var redraw = false;
    	for(var property in this.autoProperties){
    		if(this.autoProperties[property].changed && this.autoProperties[property].redraw) redraw = true;
    	}
    	// Determine if a redraw is needed
    	if(redraw) this.redraw();
    	// Reset change flags
    	for(var property in this.autoProperties){
    		this.autoProperties[property].changed = false;
    	}
    };
    
    // Redraw HTML
    this.redraw = function(){
    	var that = this;
    	this.$().empty();
    	var w = this.$()[0].style.width;
		var h = this.$()[0].style.height;
		var slideCount = 0;
		for(var i=0;i<this.autoProperties.src.value.length;i++){
			if(this.autoProperties.src.value[i] && this.autoProperties.src.value[i]!="") slideCount++;
		}
		// JSSOR only supports width in px, it freaks on %s - Give a nice message if someone tries to use margins
		if(w.indexOf("%") > -1 || h.indexOf("%") > -1){
			this.$().html("Please specify a specific width and height.  Auto width and auto height are not supported.");
			return;
		}
		// Don't do anything if there aren't any slides
		if(slideCount==0){
			this.$().html("You need at least one image.");
			return;
		}
		// JSSOR code for slideshow.  You could further parameterize Design Studio properties here, if needed.
		this._SlideshowTransitions = [
   		   {	//Fade in Right
   		 		$Duration: 1200,
   		 		$During: { $Left: [0.3, 0.7] },
   		 		$FlyDirection: 2,
   		 		$Easing: { $Left: $JssorEasing$.$EaseInCubic, $Opacity: $JssorEasing$.$EaseLinear },
   		 		$ScaleHorizontal: 0.3,
   		 		$Opacity: 2
   		   },{	//Fade out Left
   		 		$Duration: 1200,
   		 		$SlideOut: true,
   		 		$FlyDirection: 1,
   		 		$Easing: { $Left: $JssorEasing$.$EaseInCubic, $Opacity: $JssorEasing$.$EaseLinear },
   		 		$ScaleHorizontal: 0.3,
   		 		$Opacity: 2
   		   }
   		];
   		this.options = {
   				$AutoPlay: this.autoPlay(),                                    //[Optional] Whether to auto play, to enable slideshow, this option must be set to true, default value is false
   				$AutoPlaySteps: 1,                                  //[Optional] Steps to go for each navigation request (this options applys only when slideshow disabled), the default value is 1
   				$AutoPlayInterval: this.autoPlayInterval(),                    //[Optional] Interval (in milliseconds) to go for next slide since the previous stopped if the slider is auto playing, default value is 3000
   				$PauseOnHover: 1,                               	//[Optional] Whether to pause when mouse over if a slider is auto playing, 0 no pause, 1 pause for desktop, 2 pause for touch device, 3 pause for desktop and touch device, default value is 1
   				$ArrowKeyNavigation: false,   			            //[Optional] Allows keyboard (arrow key) navigation or not, default value is false
   				$SlideDuration: this.slideDuration(),                                //[Optional] Specifies default duration (swipe) for slide in milliseconds, default value is 500
   				$MinDragOffsetToSlide: 20,                          //[Optional] Minimum drag offset to trigger slide , default value is 20
   				//$SlideWidth: parseInt(this.$().width(),10),                                 //[Optional] Width of every slide in pixels, default value is width of 'slides' container
   				//$SlideHeight: parseFloat(this.$().width(),10),                               //[Optional] Height of every slide in pixels, default value is height of 'slides' container
   				$SlideSpacing: 0, 					                //[Optional] Space between each slide in pixels, default value is 0
   				$DisplayPieces: 1,                                  //[Optional] Number of pieces to display (the slideshow would be disabled if the value is set to greater than 1), the default value is 1
   				$ParkingPosition: 0,                                //[Optional] The offset position to park slide (this options applys only when slideshow disabled), default value is 0.
   				$UISearchMode: 1,                                   //[Optional] The way (0 parallel, 1 recursive, default value is 1) to search UI components (slides container, loading screen, navigator container, arrow navigator container, thumbnail navigator container etc).
   				$PlayOrientation: 1,                                //[Optional] Orientation to play slide (for auto play, navigation), 1 horizontal, 2 vertical, default value is 1
   				$DragOrientation: 1,                                //[Optional] Orientation to drag slide, 0 no drag, 1 horizontal, 2 vertical, 3 either, default value is 1 (Note that the $DragOrientation should be the same as $PlayOrientation when $DisplayPieces is greater than 1, or parking position is not 0)
   				$SlideshowOptions: {                                //[Optional] Options to specify and enable slideshow or not
   					$Class: $JssorSlideshowRunner$,                 //[Required] Class to create instance of slideshow
   					$Transitions: this._SlideshowTransitions,            //[Required] An array of slideshow transitions to play slideshow
   					$TransitionsOrder: 1,                           //[Optional] The way to choose transition to play slide, 1 Sequence, 0 Random
   					$ShowLink: true                                    //[Optional] Whether to bring slide link on top of the slider when slideshow is running, default value is false
   				},
   				$BulletNavigatorOptions: {                                //[Optional] Options to specify and enable navigator or not
   					$Class: $JssorBulletNavigator$,                       //[Required] Class to create navigator instance
   					$ChanceToShow: 2,                               //[Required] 0 Never, 1 Mouse Over, 2 Always
   					$Lanes: 1,                                      //[Optional] Specify lanes to arrange items, default value is 1
   					$SpacingX: 10,                                   //[Optional] Horizontal space between each item in pixel, default value is 0
   					$SpacingY: 10                                    //[Optional] Vertical space between each item in pixel, default value is 0
   				},
   				$ArrowNavigatorOptions: {
   					$Class: $JssorArrowNavigator$,              	//[Required] Class to create arrow navigator instance
   					$ChanceToShow: 2                                //[Required] 0 Never, 1 Mouse Over, 2 Always
   				},
   				$ThumbnailNavigatorOptions: {
   					$Class: $JssorThumbnailNavigator$,              //[Required] Class to create thumbnail navigator instance
   					$ChanceToShow: 2,                               //[Required] 0 Never, 1 Mouse Over, 2 Always
   					$ActionMode: 1,                                 //[Optional] 0 None, 1 act by click, 2 act by mouse hover, 3 both, default value is 1
   					$DisableDrag: true                              //[Optional] Disable drag or not, default value is false
   				}
   		 	};

   		// Render HTML string for jQuery
   		var html = ""+
		"<div id='" + this.$().attr("id")+"_shim' style='width: "+this.$().width()+"px; height: "+this.$().height()+"px;'>"+
			// Loading Screen
			"<div data-u='loading' style='position: absolute; top: 0px; left: 0px;'>"+
            	"<div style='filter: alpha(opacity=70); opacity:0.7; position: absolute; display: block;background-color: #000; top: 0px; left: 0px;width: 100%;height:100%;'>"+
            	"</div>"+
            	"<div style='position: absolute; display: block; background: url(data:image/gif;base64,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) no-repeat center center;top: 0px; left: 0px;width: 100%;height:100%;'>"+
            	"</div>"+
            "</div>" +
            // Slides Container
            "<div id='" + this.$().attr("id")+"_slides' data-u='slides' style='cursor: move; position: absolute; left: 0px; top: 0px; width: "+this.$().width()+"px; height: "+this.$().height()+"px;overflow: hidden;'>";
			for(var i=0;i<this.autoProperties.src.value.length;i++){
				// Render a slide - We will use image for this simple component
				if(this["src"+i]() && this["src"+i]() != ""){
					html+="<div>" +
                	"<img data-u='image' src='" + this["src"+i]() + "' />";
                	// If there's a caption put a footer div in.
					if(this["caption"+i]() && this["caption"+i]() != ""){
						html+="<div style='"+ this.captionCSS() + "'>"+this["caption"+i]()+"</div>";
					}
                	html+="</div>";
				}
				// End of Slide
			}		
        	html+=""+
            "</div>"+
            // Bullet navigator container
	        "<div data-u='navigator' class='jssorb21' style='" + this.navigatorCSS() + "'>"+
	            // Bullet navigator item prototype
	            "<div data-u='prototype' style='"+this.bulletCSS()+"'></div>"+

	        "</div>";
        	html+="<span data-u='arrowleft' class='jssora05l' style='" + this.arrowLeftCSS() + "'></span>"+
        		"<span data-u='arrowright' class='jssora05r' style='" + this.arrowRightCSS() + "'></span>"+        
        	"</div>";
		this.$().html(html);

		// HTML in place, let's put an event listener for onclick.
		try{
			var slideshow = new $JssorSlider$(this.$().attr("id")+"_shim", this.options);
			slideshow.$On($JssorSlider$.$EVT_CLICK,function(slideIndex,ev){
				that.slideClicked(slideIndex);
				that.firePropertiesChanged(["slideClicked"]);
				that.fireEvent("onclick");
				return false;
			});
		}
		catch(e){
			// This actually happens before a width and height are set from SDK handler, but another init call
			// happens right away, so whatever.
			this.$().html("Error initializing component: " + e);
		}
    };
    
	this.init = function() {
		// Draw!
		this.redraw();	
		this._alive = true;
	};
});