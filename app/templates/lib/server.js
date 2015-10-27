// Code to run on server. These are functions which will be called from the client as to not expose secure information.
if (Meteor.isServer) {

	// if ( !Pages.findOne({name:"pages"}) ) {
	// 	Pages.insert({
	// 		name : "pages",
	// 		data : []
	// 	});
	// }

	Accounts.config({
		forbidClientAccountCreation: false
	});

}