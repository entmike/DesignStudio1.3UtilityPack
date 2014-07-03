sap.designstudio.sdk.Component
		.subclass(
				"com.sample.utilities.Notify",
				function() {

					var _url = null;
					var _layout = null;
					var _modal = null;
					var _show = "N";
					var _msgText = "";
					var _delay = null;
					var _msgtype = null;

					this.init = function() {
						// this.$().addClass(STYLE_DIV);
					};

					this.afterUpdate = function() {
						if( _show == "Y"){
							this.genarate();
							this.shownote("N");
							this.msgtext("");
							this.firePropertiesChanged( [ "msgtext","shownote"]);
						}
					};

					this.genarate = function() {
				        var n = noty({
				            text        : _msgText,
				            type        : _msgtype,
				            dismissQueue: true,
				            modal		: _modal,
				            layout      : _layout,
				            theme       : 'defaultTheme'
				        });

				        setTimeout(function () {
				            $.noty.close(n.options.id);
				        }, _delay*1000);

				    };

				    this.msgtype = function(value){
				    	if (value === undefined) {
							return _msgtype;
						} else {
							_msgtype = value;
							return this;
						}
				    }; 
				    this.shownote = function(value){
				    	if (value === undefined) {
							return _show;
						} else {
							_show = value;
							return this;
						}
				    };

				    this.delay = function(value){
				    	if (value === undefined) {
							return _delay;
						} else {
							_delay = value;
							return this;
						}
				    };

				    this.msgtext = function(value){
				    	if (value === undefined) {
							return _msgText;
						} else {
							_msgText = value;
							return this;
						}
				    };



				    this.layout = function(value) {
						if (value === undefined) {
							return _layout;
						} else {
							_layout = value;
							return this;
						}
					};
					 this.modal = function(value) {
							if (value === undefined) {
								return _modal?"true":"false";
							} else {
								_modal = value == "true" ?true:false;
								return this;
							}
						};
					this.url = function(value) {
						if (value === undefined) {
							return _url;
						} else {
							_url = value;
							return this;
						}
					};					

				});