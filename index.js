Index = new Mongo.Collection("index");

// Server Side
if (Meteor.isServer) {

	Meteor.publish("index", function() {
		return Index.find({});
	});

}

// Client Side
if (Meteor.isClient) {

	Meteor.subscribe("index");

	Template.home.helpers({
		content: [
			{name: "first", text: "first piece of text"},
			{name: "second", text: "second piece of text"},
			{name: "third", text: "third piece of text"}
		],
		check: function(section, toCheck) {
			return section === toCheck;
		}
	});

}