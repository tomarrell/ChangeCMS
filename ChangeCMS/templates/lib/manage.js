//					 //
//  User management  //
//					 //

// Code to run on client. These trigger actions on the server.
if (Meteor.isClient) {

	// Template.ChangeHead.rendered = function(){
	// 	$("head").append("<link rel='stylesheet' type='text/css' href='/stylesheets/manage.css'></link>")
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
		}
	});

}

// Code to run on server. These are functions which will be called from the client as to not expose secure information.
if (Meteor.isServer) {

	Accounts.config({
		forbidClientAccountCreation: false
	});

}