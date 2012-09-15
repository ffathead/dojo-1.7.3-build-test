require({cache:{
'url:app/common/widgets/UserManagementWidget/templates/_userManagementWidgetTemplate.html':"<div \tclass=\"${baseClass}\"\r\n\t\tid=\"_userManagementDropdown\">\r\n\r\n\t<div>\r\n  \t<a \tid=\"_userManagementDropdownLink\"\r\n  \t\tclass=\"${baseClass}LinkText\"\r\n  \t\tdata-dojo-attach-event=\"onclick: _onLinkClick\"\r\n  \t\thref=\"/login.html\">INJECT_USER</a><span id=\"_userManagementDropdownArrow\" class=\"${baseClass}DropdownArrow\">&#9660;</span>\r\n\t</div>\r\n\t<div id=\"_userManagementDropdownSection\" class=\"${baseClass}DropdownSection\">\r\n\t  <ul>\r\n\t    <li id=\"_userManagementProfileSection\" class=\"${baseClass}ManagementSection\">\r\n\t        <a href=\"profile.html\" id=\"_userManagementProfile\" data-dojo-attach-event=\"onclick:_onOptionClick\">PROFILE</a>\r\n\t    </li>\r\n\t    <li class=\"${baseClass}Divider\"></li>\r\n\t    <li id=\"userManagementSiteManagementSection\" class=\"${baseClass}ManagementSection\">\r\n\t      <a href=\"messages.html\" id=\"_userManagementSiteManagement\" data-dojo-attach-event=\"onclick:_onOptionClick\">Messages</a>\r\n      </li>\r\n      <li id=\"userManagementSiteManagementSection\" class=\"${baseClass}ManagementSection\">\r\n        <a href=\"sitemanagement.html\" id=\"_userManagementSiteManagement\" data-dojo-attach-event=\"onclick:_onOptionClick\">Site Management</a>\r\n\t    </li>\r\n\t    <li class=\"${baseClass}Divider\"></li>\r\n\t    <li id=\"userManagementLogoutSection\" class=\"${baseClass}ManagementSection\">\r\n\t        <a href=\"logout.html\" id=\"_userManagementLogout\" data-dojo-attach-event=\"onclick:_onOptionClick\">${resource.logout}</a>\r\n\t    </li>\r\n\t  </ul>\r\n\t</div>\r\n</div>"}});
define("app/common/widgets/UserManagementWidget/UserManagementWidget", [
	"dojo/_base/declare", 
	"dojo/parser", 
	"dojo/dom", 
	"dojo/dom-construct", 
	"dojo/dom-class", 
	"dojo/dom-style", 
	"dojo/dom-geometry", 
	"dojo/on",
	"dojo/fx", 
	"dojo/fx/easing",
	"dijit/_WidgetBase",
	"dijit/_TemplatedMixin",
	"dijit/_WidgetsInTemplateMixin",
	"dijit/_OnDijitClickMixin",	
	"dojo/text!./templates/_userManagementWidgetTemplate.html",
	"dojo/i18n!./nls/resources"], 
	function(	declare, 
				parser, 
				dom, 
				domConstruct, 
				domClass, 
				domStyle, 
				domGeom, 
				on, 
				dojofx, 
				easing, 
				_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, _OnDijitClickMixin, template, validate, i18n) {
	
	return declare("widgets.UserManagementWidget",[_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
		
		baseClass: "userManagementWidget",
		
		templateString: template,
		
		resource: i18n,
		
		username: null,
		
		open: true,

		_setOpenAttr: function(open){
			this._set("open", open);
		},

		buildRendering: function(){
			this.inherited(arguments);
            // create the DOM for this widget
      console.log("UserManagementWidget buildRendering");
		},

		postMixInProperties: function() {
			console.log("UserManagementWidget: postMixInProperties");
			this.inherited(arguments);
		},
		startup: function() {
			this.inherited(arguments);
			console.log("UserManagementWidget: startup");
		},
		postCreate: function(){
			this.inherited(arguments);
			console.log("UserManagementWidget: postCreate");
			
			// Get a DOM node reference for the root of our widget
			var domNode = this.domNode;

      var link = dom.byId("_userManagementDropdownLink");
      link.innerText = this.username;
      
			domStyle.set(dom.byId("_userManagementDropdownSection"), "display", this.open ? "block" : "none");
		 
			// Set up our mouseenter/leave events - using dijit/_WidgetBase's connect
			// means that our callback will execute with `this` set to our widget
			this.connect(domNode, "onmouseenter", function(e) {
				console.log("UserManagementWidget: onMouseEnter");
			});
			this.connect(domNode, "onmouseleave", function(e) {
				console.log("UserManagementWidget: onMouseLeave");
			});
		},
		
		_onLinkClick: function( /*Event*/ e) {
			this.inherited(arguments);
			console.log("UserManagementWidget _onLinkClick");
			dojo.stopEvent(e);
			// event handler code here
			return this.onLinkClick(e);
		},
		onLinkClick: function( e ){
			// onClick event extension point!
			// toggles the arrow
			this.toggleDropdown();
		},
		
		toggleDropdown: function() {
			var dropdownArrow = dojo.byId("_userManagementDropdownArrow");
			if (dropdownArrow.innerHTML == String.fromCharCode(9660)) {
				dropdownArrow.innerHTML = "&#9650;";
				this.open = true;

				domStyle.set("_userManagementDropdownSection", {
					"display" : 'none'
				});

				dojofx.wipeIn({
					node : "_userManagementDropdownSection",
					duration : 500,
					easing : easing.quadIn,
					onEnd : function() {
					}
				}).play();
			} else {
				dropdownArrow.innerHTML = "&#9660;";
				this.open = false;
				dojofx.wipeOut({
					node : "_userManagementDropdownSection",
					duration : 500,
					easing : easing.quadIn,
					onEnd : function() {
					}
				}).play();
			}
			domClass.toggle("_userManagementDropdownLink", "_userManagementDropdownLinkMenuOpen");
		},
		_onOptionClick: function( /*Event*/ e) {
			this.inherited(arguments);
			console.log("UserManagementWidget _onOptionClick");

      return this._onClick(e);
		},
		_onClick: function( /*Event*/ e) {
			this.inherited(arguments);
			console.log("LoginWidget _onClick");
			// event handler code here

			return this.onClick(e);
		},
		onClick: function( e ){
			// onClick event extension point!
		}
	});
}); 