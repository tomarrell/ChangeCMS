// User management

// Code to run on client. These trigger actions on the server.
if (Meteor.isClient) {
	Template.login.events({
		"submit .loginForm": function(event) {
			event.preventDefault();
			var username = event.target.username.value;
			var password = event.target.password.value;
			console.log(username)
			console.log(password)
			Meteor.loginWithPassword(username, password, function(error) {
				console.log(error);
			});
		}
	});
}

// Code to run on server. These are functions which will be called from the client as to not expose secure information.
if (Meteor.isServer) {

	Accounts.config({
		forbidClientAccountCreation: true
	});

}