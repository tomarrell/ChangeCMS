Index = new Mongo.Collection("index");

// Server Side
if (Meteor.isServer) {

	// Meteor.publish("index", function() {
	// 	return Index.find({});
	// });

}

// Client Side
if (Meteor.isClient) {

	// Meteor.subscribe("index");

	Template.home.helpers({
		content: function() {
			return Index.find({})
		},
		check: function(section, toCheck) {
			return section === toCheck;
		},
		returnText: function(nameOfSection) {
			var content = Index.find({});
			var text = "";
			content.forEach(function(entry) {
				if (entry.name == nameOfSection) {
					text = entry.text
				}
			});
			return text;
		}
	});

}