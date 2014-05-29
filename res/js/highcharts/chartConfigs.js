var hcWrapper = hcWrapper || {};
hcWrapper.chartConfigs = hcWrapper.chartConfigs || [
    {
    	method : "Line Chart",
    	renderMethod : "Cartesian",
    	config : {
    		chart : {
    			type : "line",
    			zoomType : "x"
    		},
    		title: {text : "Line Chart"}
    	}
	},{
    	method : "Spline Chart",
    	renderMethod : "Cartesian",
    	config : {
    		chart : {
    			type : "spline",
    			zoomType : "x"
    		},
    		title: {text : "Spline Chart"}
    	}
	},{
    	method : "Area Chart",
    	renderMethod : "Cartesian",
    	config : {
    		chart : {
    			type : "area",
    			zoomType : "x"
    		},
    		title: {text : "Area Chart"}
    	}
	},{
		method : "Stacked Area Chart",
		renderMethod : "Cartesian",
		config : {
			chart : {
				type : "area",
				zoomType : "x"
			},
			title: {text : "Stacked Area Chart"},
			plotOptions : {
				series : {
					stacking : "normal"
				}
			}
			
		}
	},{
		method : "Stacked Area Chart - 100%",
		renderMethod : "Cartesian",
		config : {
			chart : {
				type : "area",
				zoomType : "x"
			},
			title: {text : "Stacked Area Chart - 100%"},
			plotOptions : {
				series : {
					stacking : "percent"
				}
			}
			
		}
	},{
		method : "Bar Chart",
		renderMethod : "Cartesian",
		config : {
			chart : {
				type : "bar",
				zoomType : "y"
			},
			title: {text : "Bar Chart"}
		}
	},{
		method : "Stacked Bar Chart",
		renderMethod : "Cartesian",
		config : {
			chart : {
				type : "bar",
				zoomType : "y"
			},
			title: {text : "Stacked Bar Chart"},
			plotOptions : {
				series : {
					stacking : "normal"
				}
			}
			
		}
	},{
		method : "Stacked Bar Chart - 100%",
		renderMethod : "Cartesian",
		config : {
			chart : {
				type : "bar",
				zoomType : "y"
			},
			title: {text : "Stacked Bar Chart - 100%"},
			plotOptions : {
				series : {
					stacking : "percent"
				}
			}
			
		}
	},{
		method : "Column Chart",
		renderMethod : "Cartesian",
		config : {
			chart : {
				type : "column",
				zoomType : "x"
			},
			title: {text : "Column Chart"}
		}
	},{
		method : "Stacked Column Chart",
		renderMethod : "Cartesian",
		config : {
			chart : {
				type : "column",
				zoomType : "x"
			},
			title: {text : "Stacked Column Chart"},
			plotOptions : {
				series : {
					stacking : "normal"
				}
			}
			
		}
	},{
		method : "Stacked Column Chart - 100%",
		renderMethod : "Cartesian",
		config : {
			chart : {
				type : "column",
				zoomType : "x"
			},
			title: {text : "Stacked Column Chart - 100%"},
			plotOptions : {
				series : {
					stacking : "percent"
				}
			}
			
		}
	},{
		method : "Scatter Chart",
		renderMethod : "Cartesian",
		config : {
			chart : {
				type : "scatter",
				zoomType : "xy"
			},
			title: {text : "Scatter Chart"},
			plotOptions : {
				scatter : {
					marker : {
						radius : 5
					},
					tooltip: {
                        headerFormat: '<b>{series.name}</b><br>',
                        pointFormat: '{point.x}, {point.y}'
                    }
				}					
			},
			xAxis : {
				title : {
					text : "x"
				}
			},
			yAxis : {
				title : {
					text : "y"
				}
			}
		}
	},{
		method : "Bubble Chart",
		renderMethod : "Cartesian",
		config : {
			chart : {
				type : "bubble",
				zoomType : "xy"
			},
			title: {text : "Bubble Chart"},
			plotOptions : {
				bubble : {
					tooltip: {
                        headerFormat: '<b>{series.name}</b><br>',
                        pointFormat: '{point.x}, {point.y}'
                    }
				}					
			},
			xAxis : {
				title : {
					text : "x"
				}
			},
			yAxis : {
				title : {
					text : "y"
				}
			}
		}
	},{
		method : "JSON Dump",
		renderMethod : "JSON Dump",
		config : {}
	}
];