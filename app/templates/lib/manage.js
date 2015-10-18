Pages = new Mongo.Collection("pages");

// Code to run on server. These are functions which will be called from the client as to not expose secure information.
if (Meteor.isServer) {

	if ( !Pages.findOne({name:"pages"}) ) {
		Pages.insert({
			name : "pages",
			data : []
		});
	}

	Accounts.config({
		forbidClientAccountCreation: false
	});

}

// Code to run on client. These trigger actions on the server.
if (Meteor.isClient) {

	// Template.dashboard.rendered = function(){
	// 	console.log($("head"));
	// };

	// LOGIN HELPERS
	Template.login.helpers({

	});

	// LOGIN EVENTS
	Template.login.events({
		// Upon login form submit
		"submit .change-loginForm": function(event) {
			// Prevent default submission actions
			event.preventDefault();
			// Get Username and password from form
			var username = event.target.username.value;
			var password = event.target.password.value;
			// Send login request, if err send it to console
			Meteor.loginWithPassword(username, password, function(err) {
				if (err) {
					console.log(err);
					$(".change-loginMessage").toggle();
				}
			});
		},
	});

	// DASHBOARD HELPERS
	Template.dashboard.helpers({
		currentTab: function() {
			// console.log(Pages.findOne({ name : "activePages" }));
			return "pages";
		}
	});

	// DASHBOARD EVENTS
	Template.dashboard.events({
		// Logout of CMS
		"click .change-logout": function() {
			Meteor.logout(function(err) {
				console.log("There was an error logging out. Please contact your nearest developer.");
				console.log(err);
			});
		},
		// Open and close sidebar
		"click .change-navIcon": function(event) {
			var navButton = $(".change-popout");
			var tabContent = $(".change-tab-content");
			if (navButton.hasClass("change-out")) {
				navButton.removeClass("change-out");
				tabContent.removeClass("content-out");
			} else {
				navButton.addClass("change-out");
				tabContent.addClass("content-out");
			}
		}
	});

	// Helpers for dashboard tabs
	Template.pages.helpers({
		getPages: function() {
			var listOfPages = Pages.findOne({name:"pages"}).data;
			return ["index", "about"];
		}
	});

	Template.dashboard.rendered = function() {
		$("body").css({"overflow-x": "hidden"});
	}

}