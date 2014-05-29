sap.designstudio.sdk.Component.subclass("com.sample.utilities.CVOMTest", function() {
	this._src = new Array(100);
	this._caption = new Array(100);
    this._afterInit = null;
    this._alive = false;
       
	// property setter/getter functions	
    this.autoProperties = {
    	delay : {
    		value : 5000
    	},
    	transition : {
    		value : "Fade"
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
	this.autoProperties.src = {value : new Array(100)};
	this.autoProperties.caption = {value : new Array(100)};
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
	  
    this.afterUpdate = function(){
    	this.redraw();
    };
    
    this.redraw = function(){
    	this.$().empty();
    	var w = this.$()[0].style.width;
		var h = this.$()[0].style.height;
		var slideCount = 0;
		for(var i=0;i<this.autoProperties.src.value.length;i++){
			if(this.autoProperties.src.value && this.autoProperties.src.value!="") slideCount++;
		}
		if(w.indexOf("%") > -1 || h.indexOf("%") > -1){
			this.$().html("Please specify a specific width and height.  Auto width and auto height are not supported.");
			return;
		}
		if(slideCount==0){
			this.$().html("You need at least one slide.");
			return;
		}
		this._SlideshowTransitions = [
   		   {	//Fade in Right
   		 		$Duration: 1200, $During: { $Left: [0.3, 0.7] }, $FlyDirection: 2, $Easing: { $Left: $JssorEasing$.$EaseInCubic, $Opacity: $JssorEasing$.$EaseLinear }, $ScaleHorizontal: 0.3, $Opacity: 2
   		   },{	//Fade out Left
   		 		$Duration: 1200, $SlideOut: true, $FlyDirection: 1, $Easing: { $Left: $JssorEasing$.$EaseInCubic, $Opacity: $JssorEasing$.$EaseLinear }, $ScaleHorizontal: 0.3, $Opacity: 2
   		   }
   		];
   		this.options = {
   				$AutoPlay: true,                                    //[Optional] Whether to auto play, to enable slideshow, this option must be set to true, default value is false
   				$AutoPlaySteps: 1,                                  //[Optional] Steps to go for each navigation request (this options applys only when slideshow disabled), the default value is 1
   				$AutoPlayInterval: 4000,                            //[Optional] Interval (in milliseconds) to go for next slide since the previous stopped if the slider is auto playing, default value is 3000
   				$PauseOnHover: 1,                               //[Optional] Whether to pause when mouse over if a slider is auto playing, 0 no pause, 1 pause for desktop, 2 pause for touch device, 3 pause for desktop and touch device, default value is 1
   				$ArrowKeyNavigation: true,   			            //[Optional] Allows keyboard (arrow key) navigation or not, default value is false
   				$SlideDuration: 500,                                //[Optional] Specifies default duration (swipe) for slide in milliseconds, default value is 500
   				$MinDragOffsetToSlide: 20,                          //[Optional] Minimum drag offset to trigger slide , default value is 20
   				//$SlideWidth: parseInt(this.$().width(),10),                                 //[Optional] Width of every slide in pixels, default value is width of 'slides' container
   				//$SlideHeight: parseFloat(this.$().width(),10),                                //[Optional] Height of every slide in pixels, default value is height of 'slides' container
   				$SlideSpacing: 0, 					                //[Optional] Space between each slide in pixels, default value is 0
   				$DisplayPieces: 1,                                  //[Optional] Number of pieces to display (the slideshow would be disabled if the value is set to greater than 1), the default value is 1
   				$ParkingPosition: 0,                                //[Optional] The offset position to park slide (this options applys only when slideshow disabled), default value is 0.
   				$UISearchMode: 1,                                   //[Optional] The way (0 parellel, 1 recursive, default value is 1) to search UI components (slides container, loading screen, navigator container, arrow navigator container, thumbnail navigator container etc).
   				$PlayOrientation: 1,                                //[Optional] Orientation to play slide (for auto play, navigation), 1 horizental, 2 vertical, default value is 1
   				$DragOrientation: 3,                                //[Optional] Orientation to drag slide, 0 no drag, 1 horizental, 2 vertical, 3 either, default value is 1 (Note that the $DragOrientation should be the same as $PlayOrientation when $DisplayPieces is greater than 1, or parking position is not 0)
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
   					$ActionMode: 0,                                 //[Optional] 0 None, 1 act by click, 2 act by mouse hover, 3 both, default value is 1
   					$DisableDrag: true                              //[Optional] Disable drag or not, default value is false
   				}
   		 	};
    	var html = ""+
		"<div id='" + this.$().attr("id")+"_shim' style='width: "+this.$().width()+"px; height: "+this.$().height()+"px;'>"+
			// Loading Screen
			"<div u='loading' style='position: absolute; top: 0px; left: 0px;'>"+
            	"<div style='filter: alpha(opacity=70); opacity:0.7; position: absolute; display: block;background-color: #000; top: 0px; left: 0px;width: 100%;height:100%;'>"+
            	"</div>"+
            	"<div style='position: absolute; display: block; background: url(res/js/jssor/img/loading.gif) no-repeat center center;top: 0px; left: 0px;width: 100%;height:100%;'>"+
            	"</div>"+
            "</div>" +
            // Slides Container
            //"<div u='slides' style='cursor: move; position: absolute; left: 0px; top: 0px; width: 600px; height: 300px;overflow: hidden;'>" +
            "<div id='" + this.$().attr("id")+"_slides' u='slides' style='cursor: move; position: absolute; left: 0px; top: 0px; width: "+this.$().width()+"px; height: "+this.$().height()+"px;overflow: hidden;'>";
			for(var i=0;i<this.autoProperties.src.value.length;i++){
				if(this["src"+i]() && this["src"+i]() != ""){
					html+="<div>" +
                	"<img u='image' src='" + this["src"+i]() + "' />" +
                	"<div u='thumb'>";
					if(this["caption"+i]() && this["caption"+i]() != ""){
						html+=this["caption"+i]();
					}else{
						html+="Slide " + i;
					}
					html+="</div>"+
                	"</div>";
				}
			}		
        	html+=""+
            "</div>"+
             // Thumbnail Navigator
             "<div id='" + this.$().attr("id")+"_navigator' u='thumbnavigator' class='sliderb-T' style='position: absolute; bottom: 0px; left: 0px; height:45px; width:"+this.$().width()+"px;'>"+
             	"<div style='filter: alpha(opacity=40); opacity:0.4; position: absolute; display: block;background-color: #000000; top: 0px; left: 0px; width: 100%; height: 100%;'>"+
             	"</div>"+
             	// Thumbnail Item Skin Begin
             	"<div u='slides'>"+
             		//"<div u='prototype' style='POSITION: absolute; WIDTH: 600px; HEIGHT: 45px; TOP: 0; LEFT: 0;'>"+
             		"<div id='" + this.$().attr("id")+"_thumbnails' u='prototype' style='POSITION: absolute; WIDTH: "+this.$().width()+"px; HEIGHT: 45px; TOP: 0; LEFT: 0;'>"+
             			"<thumbnailtemplate style='font-family: verdana; font-weight: normal; POSITION: absolute; WIDTH: 100%; HEIGHT: 100%; TOP: 0; LEFT: 0; color:#fff; line-height: 45px; font-size:20px; padding-left:10px;'></thumbnailtemplate>"+
             		"</div>"+
             	"</div>"+
             	// Thumbnail Item Skin End 
            "</div>"+
            // Bullet navigator container
	        "<div u='navigator' class='jssorb01' style='position: absolute; bottom: 16px; right: 10px;'>"+
	            // Bullet navigator item prototype
	            "<div u='prototype' style='POSITION: absolute; WIDTH: 12px; HEIGHT: 12px;'></div>"+
	        "</div>"+
            // Arrow Left
	        "<span u='arrowleft' class='jssora05l' style='width: 40px; height: 40px; top: 123px; left: 8px;'></span>"+
	        // Arrow Right
	        "<span u='arrowright' class='jssora05r' style='width: 40px; height: 40px; top: 123px; right: 8px'></span>"+
	    "</div>";
		this.$().html(html);
		try{var slideshow = new $JssorSlider$(this.$().attr("id")+"_shim", this.options);}
		catch(e){
			alert(e);
		}
    };
    
	this.init = function() {
		
		
		//alert(w+h);
		
		this.redraw();		
		
		var that = this;
		this._alive = true;
	};
});