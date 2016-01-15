Data = new Mongo.Collection("data");

// Code to run on server. These are functions which will be called from the client as to not expose secure information.

if (Meteor.isServer) {

	Meteor.publish("data", function() {
		handle = Data.find();
		return handle;
	});

	// if ( !Pages.findOne({name:"pages"}) ) {
	// 	Pages.insert({
	// 		name : "pages",
	// 		data : []
	// 	});
	// }

	Accounts.config({
		forbidClientAccountCreation: false
	});

	Meteor.methods({
		"pull": function() {
			return Data.find().fetch();
		},
		"insert": function(data) {
			Data.insert(data);
			return data;
		}
	});

}