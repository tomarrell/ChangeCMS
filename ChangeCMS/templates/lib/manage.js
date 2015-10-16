//					 //
//  User management  //
//					 //

// Code to run on client. These trigger actions on the server.
if (Meteor.isClient) {

	// Template.dashboard.rendered = function(){
	// 	console.log($("head"));
	// };

	Template.login.events({
		// Upon login form submit
		"submit .change-loginForm": function(event) {
			// Prevent default submission actions
			event.preventDefault();
			// Get Username and password from form
			var username = event.target.username.value;
			var password = event.target.password.value;
			// Send login request, if err send it to console
			Meteor.loginWithPassword(username, password, function(error) {
				if (err) {console.log(error);}
			});
		},
	});

	Template.dashboard.events({
		// 
		"click .change-logout": function() {
			Meteor.logout(function(err) {
			});
		},
		"click .change-navIcon": function(event) {
			var icon = $(".change-popout");
			if (icon.hasClass("change-out")) {
				icon.removeClass("change-out");
			} else {
				icon.addClass("change-out");
			}
		},
		"click .change-tab1": function() {
			
		}
	});

	Template.dashboard.rendered = function() {
		$("body").css({"overflow-x": "hidden"});
	}

}

// Code to run on server. These are functions which will be called from the client as to not expose secure information.
if (Meteor.isServer) {

	Accounts.config({
		forbidClientAccountCreation: false
	});

}