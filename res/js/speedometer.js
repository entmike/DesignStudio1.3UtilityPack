sap.designstudio.sdk.Component.subclass("com.sample.utilities.Speedometer", function() {

	var that = this;
	var haveNumbers = false;
	var showValue = false;
	var numOfBigTicks = 4;
	var numOfSmallTicks = 3;
	var indicator = 1.0;
	var needleColor = "#D80000";
	var startValue = 0;
	var endValue = 100;
	var title = "Insert Title Here";
	var showedValue = "No Value";
	var gradientColor = true;
	var firstColor = "#FA1E1E"
	var secondColor = "#FCFA4E";
	var thirdColor = "#2BFC23";
	var startSecondColor = 20;
	var startThirdColor = 80;
	
	this.fCanvas = null;
	this.sCanvas = null;
	this.pTitle = null;
	
	//FUNCTION CALLED IN ITIALIZE
	this.init = function() {
		this.fCanvas = document.createElement("canvas");
		this.sCanvas = document.createElement("canvas");
		this.pTitle = document.createElement("p");
		this.pTitle.style.position = 'absolute';
		this.pTitle.style.top = '-50px';
		this.pTitle.style.width = '100%';
		this.pTitle.style.left = '0px';
		this.pTitle.style.textAlign = 'center';
		this.fCanvas.style.position = 'absolute';
		this.fCanvas.style.left = '0px';
		this.fCanvas.style.top = '0px';
		this.sCanvas.style.position = 'absolute';
		this.sCanvas.style.left = '0px';
		this.sCanvas.style.top = '0px';
		this.$().append($(this.pTitle));
		this.$().append($(this.fCanvas));
		this.$().append($(this.sCanvas));
	};

	//FUNCTION CALLED AFTER RENDERING
	this.afterUpdate = function() {
		speedoMeter();
	};


	//GETTERS AND SETTERS FOR VARIABLES
	this.haveNumbers = function(value) {
		if (value == undefined) {
			return haveNumbers;
		} else {
			haveNumbers = value;
			return this;
		}
	};	

	this.numOfSmallTicks = function(value) {
		if (value == undefined) {
			return numOfSmallTicks;
		} else {
			numOfSmallTicks = value;
			return this;
		}
	};	

	this.numOfBigTicks = function(value) {
		if (value == undefined) {
			return numOfBigTicks;
		} else {
			numOfBigTicks = value;
			return this;
		}
	};	

	this.indicator = function(value) {
		if (value == undefined) {
			return indicator;
		} else {
			indicator = value;
			return this;
		}
	};
	
	this.needleColor = function(value) {
		if (value == undefined) {
			return needleColor;
		} else {
			needleColor = value;
			return this;
		}
	};

	this.title = function(value) {
		if (value == undefined) {
			return title;
		} else {
			title = value;
			return this;
		}
	};

	this.showValue = function(value) {
		if (value == undefined) {
			return showValue;
		} else {
			showValue = value;
			return this;
		}
	};	
	
	this.startValue = function(value) {
		if (value == undefined) {
			return startValue;
		} else {
			startValue = value;
			return this;
		}
	};	
	
	this.endValue = function(value) {
		if (value == undefined) {
			return endValue;
		} else {
			endValue = value;
			return this;
		}
	};	
	
	this.showedValue = function(value) {
		if (value == undefined) {
			return showedValue;
		} else {
			showedValue = value;
			return this;
		}
	};

	this.gradientColor = function(value) {
		if (value == undefined) {
			return gradientColor;
		} else {
			gradientColor = value;
			return this;
		}
	};

	this.firstColor = function(value) {
		if (value == undefined) {
			return firstColor;
		} else {
			firstColor = value;
			return this;
		}
	};	

	this.secondColor = function(value) {
		if (value == undefined) {
			return secondColor;
		} else {
			secondColor = value;
			return this;
		}
	};	

	this.thirdColor = function(value) {
		if (value == undefined) {
			return thirdColor;
		} else {
			thirdColor = value;
			return this;
		}
	};	

	this.startSecondColor = function(value) {
		if (value == undefined) {
			return startSecondColor;
		} else {
			startSecondColor = value;
			return this;
		}
	};	

	this.startThirdColor = function(value) {
		if (value == undefined) {
			return startThirdColor;
		} else {
			startThirdColor = value;
			return this;
		}
	};		
	


	
	//MAIN FUNCTION OF THE COMPONENT
	function speedoMeter(){
		
		//INITIALIZE VARIABLES
		var DEG2RAD = Math.PI / 180;
		var UNIT = 100;
		
		var width = that.$().width();
		var height = that.$().height();
		
		that.fCanvas.width=width;
		that.fCanvas.height=height;
		
		that.sCanvas.width=width;
		that.sCanvas.height=height;
		
		var scale = Math.min(width,height) / (2*UNIT);
		
		that.pTitle.style.fontSize=15*scale+"px";
		that.pTitle.innerHTML = ""+title;
		
		var bodyWidth = 3.5  * scale;
		
		var halfWidth = UNIT * scale;

		
		//DIMENSIONI TICKS
		var hourTickStart = 75  * scale;
		var hourTickEnd = 85  * scale;
		var hourTickWidth = 3  * scale;
		
		var minuteTickStart = 81  * scale;
		var minuteTickEnd = 85  * scale;
		var minuteTickWidth = 3  * scale;

		var secondHandEnd = 90  * scale;
		var secondHandWidth = 3  * scale;
		var bossRadius = 8.0  * scale;

		var shadowOffsetX = 2  * scale;
		var shadowOffsetY = 2  * scale;
		var shadowOffsetBlur = 5 * scale;
		var shadowColor = "rgba(0, 0, 0, 0.4)";
		

		//INDICATOR TAIL LENGTH
		var indtail = 25 * scale;
		//TICK2TICK ANGLE
		var t2trad = (240/(numOfBigTicks-1));
		//END DIMENSIONI TICKS	
		
		//INITIALIZE CANVAS DIMENSIONSa
	
		
		var ctx = that.fCanvas.getContext("2d");
		ctx.clearRect(0, 0,  2 * halfWidth, 2 * halfWidth);

		//Raggio e centro del cerchio da disegnare. Variabile in base alla grandezza del canvas.
		var centerX = that.fCanvas.width / 2;
		var centerY = that.fCanvas.height / 2;
		var radius = halfWidth-bodyWidth/2;
		
		
		//START DESIGNING DASH
		ctx.beginPath();
		//TRACCIO CERCHIO
		ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, true);
		//SCELGO IL COLORE DI RIEMPIMENTO
		ctx.fillStyle = 'white';
		//RIEMPIO
		ctx.fill();
		//SCELGO LARGHEZZA BORDO
		ctx.lineWidth = bodyWidth;

		//GRADIENTE PER IL BORDO
		var grd=ctx.createLinearGradient(25,25,width,height);
		grd.addColorStop(0,"white");
		grd.addColorStop(1,"grey");


		//COLORE BORDO
		ctx.strokeStyle = grd;

		//DIESGNO FINITO
		ctx.stroke();

		//START DISEGNO
		ctx.beginPath();
		//TRACCIO CERCHIO
		ctx.arc(centerX, centerY, (radius-bodyWidth), 0, 2 * Math.PI, true);
		//SCELGO IL COLORE DI RIEMPIMENTO
		ctx.fillStyle = "#EDEDED";
		//RIEMPIO
		ctx.fill();
		//SCELGO LARGHEZZA BORDO
		ctx.lineWidth = bodyWidth;

		//GRADIENTE PER IL BORDO
		var grd=ctx.createLinearGradient(25,25,width,height);
		grd.addColorStop(0,"grey");
		grd.addColorStop(1,"white");
	

		//COLORE BORDO
		ctx.strokeStyle = grd;
	
		//DIESGNO FINITO
		ctx.stroke();

		//END DISEGNO BODY CLOCK

		//START DISEGNO COLORI
if(!gradientColor){
	ctx.beginPath();
	//RUOTO 30� A SINISTRA
	//TRACCIO CERCHIO
	ctx.arc(centerX, centerY, (radius-bodyWidth*2), 150*DEG2RAD, (150 + startSecondColor*240/100)*DEG2RAD, false);

	//SCELGO LARGHEZZA BORDO
	ctx.lineWidth = bodyWidth;

	ctx.lineCap = "square";
	
	//COLORE BORDO
	ctx.strokeStyle = firstColor;
	
	//DIESGNO FINITO
	ctx.stroke();
	
	ctx.beginPath();
	//RUOTO 30� A SINISTRA
	//TRACCIO CERCHIO
	ctx.arc(centerX, centerY, (radius-bodyWidth*2), (150 + startSecondColor*240/100)*DEG2RAD, (150 + startThirdColor*240/100)*DEG2RAD, false);

	//SCELGO LARGHEZZA BORDO
	ctx.lineWidth = bodyWidth;

	ctx.lineCap = "square";
	
	//COLORE BORDO
	ctx.strokeStyle = secondColor;
	
	//DIESGNO FINITO
	ctx.stroke();
	
	ctx.beginPath();
	//RUOTO 30� A SINISTRA
	//TRACCIO CERCHIO
	ctx.arc(centerX, centerY, (radius-bodyWidth*2), (150 + startThirdColor*240/100)*DEG2RAD, 390*DEG2RAD, false);

	//SCELGO LARGHEZZA BORDO
	ctx.lineWidth = bodyWidth;

	ctx.lineCap = "square";
	
	//COLORE BORDO
	ctx.strokeStyle = thirdColor;
	
	//DIESGNO FINITO
	ctx.stroke();
	
}else{
	ctx.beginPath();

	//RUOTO 30� A SINISTRA
	//TRACCIO CERCHIO
	//alert(centerX);
	sx = centerX+Math.cos(210*DEG2RAD)*(radius-bodyWidth*2);
	sy = centerY+Math.sin(210*DEG2RAD)*(radius-bodyWidth*2);
	dx = centerX+Math.cos(-30*DEG2RAD)*(radius-bodyWidth*2);
	dy = centerY+Math.sin(-30*DEG2RAD)*(radius-bodyWidth*2);
	ctx.arc(centerX, centerY, (radius-bodyWidth*2), 30*DEG2RAD, 150*DEG2RAD, true);
	
	//alert(sx+" "+sy);
	//SCELGO LARGHEZZA BORDO
	ctx.lineWidth = bodyWidth;

	ctx.lineCap = "round";


	//GRADIENTE PER IL BORDO
	var grd=ctx.createLinearGradient(sx,sy,dx,dy);
	grd.addColorStop(0,firstColor);
	grd.addColorStop((startSecondColor/100),secondColor);
	grd.addColorStop((startThirdColor/100),secondColor);
	grd.addColorStop(1,thirdColor);


	//COLORE BORDO
	ctx.strokeStyle = grd;

	//DIESGNO FINITO
	ctx.stroke();

	//END DISEGNO COLORI
}
		
		
		
		/**
		//START DISEGNO COLORI
		ctx.beginPath();

		//RUOTO 30� A SINISTRA
		//TRACCIO CERCHIO
		ctx.arc(centerX, centerY, (radius-bodyWidth*2), 30*DEG2RAD, 150*DEG2RAD, true);

		//SCELGO LARGHEZZA BORDO
		ctx.lineWidth = bodyWidth;

		ctx.lineCap = "round";


		//GRADIENTE PER IL BORDO
		var grd=ctx.createLinearGradient(0,centerY,centerX,centerY);
		grd.addColorStop(0,"red");
		grd.addColorStop(0.5,"yellow");
		grd.addColorStop(1,"green");


		//COLORE BORDO
		ctx.strokeStyle = grd;

		//DIESGNO FINITO
		ctx.stroke();

		//END DISEGNO COLORI
**/


		//WRITE VALUE IF true
		if(showValue){
			ctx.font = 13*scale+'pt Georgia';
			ctx.textAlign = 'center';
			ctx.fillStyle = 'black';
			ctx.fillText(showedValue, centerX,centerY+50*scale);
		}

		//START TICKS

		// draw big ticks		
		ctx.translate(centerX, centerY);
		ctx.strokeStyle="black";
		ctx.lineCap = "round";
		ctx.lineWidth = hourTickWidth;
		ctx.save();

		ctx.rotate((150-t2trad)*DEG2RAD);
		
		
		var numInterval = (endValue-startValue)/(numOfBigTicks-1);
		
		
		for(var i = 0; i < numOfBigTicks; i++) {
			ctx.rotate(t2trad * DEG2RAD);
			ctx.beginPath();
			ctx.moveTo(hourTickStart, 0);
			ctx.lineTo(hourTickEnd, 0);
			ctx.stroke();
			if(haveNumbers){
				var ndist = hourTickEnd-(20*scale);
				ctx.translate(ndist,0);
				ctx.rotate((210-(t2trad*i))*DEG2RAD);
				ctx.font=12*scale+"px Georgia";
				ctx.textAlign='start';
				ctx.fillStyle="black";
				if((Math.round(startValue+(i*numInterval)))>=100&&(i>(numOfBigTicks/2))){
					ctx.fillText(Math.round(startValue+(i*numInterval)),(-15*scale),(5*scale));			
				}else if(i<(numOfBigTicks*2/3)){
					ctx.fillText(Math.round(startValue+(i*numInterval)),(-5*scale),(5*scale));	
				}else{
					ctx.fillText(Math.round(startValue+(i*numInterval)),(-10*scale),(5*scale));
				}
				ctx.rotate(-(210-(t2trad*i))*DEG2RAD);
				ctx.translate(-ndist,0);
			}
		}
		ctx.restore();
		//end big ticks

		// draw minute ticks		
		ctx.save();
		ctx.lineWidth =  minuteTickWidth;
		ctx.rotate(150*DEG2RAD);
		for (i = 0; i < numOfBigTicks-1; i++) {
			for(k=0; k<numOfSmallTicks; k++){
				ctx.rotate(t2trad / (numOfSmallTicks+1) * DEG2RAD);
				ctx.beginPath();
				ctx.moveTo(minuteTickStart, 0);
				ctx.lineTo(minuteTickEnd, 0);
				ctx.stroke();

			}
			ctx.rotate(t2trad / (numOfSmallTicks+1) * DEG2RAD);
		}
		ctx.restore();

		//END TICK DESIGN
		
	
		// ANIMAZIONE E DISEGNO LANCETTA
		var myVar = setInterval(function(){drawIndicator()}, 1);



		function myStopFunction() {
			clearInterval(myVar);
		}
		
		var currentIndicator = 0.5;

		var ctx = that.sCanvas.getContext("2d");
		ctx.translate(centerX, centerY);

		ctx.rotate(150*DEG2RAD);
		function drawIndicator() {
			// Clear the canvas
			ctx.translate(-centerX,-centerY);
			ctx.clearRect(0,0, width, height);
			ctx.translate(centerX,centerY);
			ctx.save();
			ctx.shadowOffsetX = shadowOffsetX;
			ctx.shadowOffsetY = shadowOffsetY;
			ctx.shadowBlur = shadowOffsetBlur;
			ctx.shadowColor = shadowColor;
		
			ctx.rotate(0.5  * DEG2RAD);
			ctx.strokeStyle = needleColor;
			ctx.lineWidth = secondHandWidth;
			ctx.beginPath();
			ctx.moveTo(secondHandEnd-5*scale, 0);
			ctx.lineTo(-indtail,5*scale);
			ctx.lineTo(-indtail,-5*scale);
			ctx.fillStyle = needleColor;
			ctx.fill();
		
			// draw boss	
			ctx.save();
			ctx.fillStyle = "grey";
			ctx.beginPath();
			ctx.globalAlpha=0.2;
			ctx.arc(0, 0, bossRadius*1.5, 0, 360 * DEG2RAD);
			ctx.fill();
			ctx.restore();
		
	
			ctx.save();
			var grd=ctx.createLinearGradient(-10,-10,10,10);
			grd.addColorStop(0,"white");
			grd.addColorStop(1,"grey");
			ctx.fillStyle = grd;
			ctx.beginPath();
			ctx.arc(0, 0, bossRadius, 0, 360 * DEG2RAD);
			ctx.fill();
			ctx.restore();
		

			if(currentIndicator>=(indicator*240/100)){
				myStopFunction();
			}
			currentIndicator+=0.5;

		}
	}

});
