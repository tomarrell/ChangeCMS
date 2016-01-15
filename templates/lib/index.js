// Server Side
if (Meteor.isServer) {

	// var pages = Pages.findOne({ name : "pages" }).data;

	// console.log( activePages.indexOf("index") )

	// if (pages.indexOf(nameOfPage) == -1) {
	// 	Pages.update({name : "pages"}, { $push : { data : nameOfPage }});
	// }

}

// Client Side
if (Meteor.isClient) {

	// Meteor.subscribe("index");

	// Template.index.helpers({
	// 	content: function() {
	// 		return Index.find({})
	// 	},
	// 	check: function(section, toCheck) {
	// 		return section === toCheck;
	// 	},
	// 	returnText: function(nameOfSection) {
	// 		var content = Index.find({});
	// 		var text = "";
	// 		content.forEach(function(entry) {
	// 			if (entry.name == nameOfSection) {
	// 				text = entry.text
	// 			}
	// 		});
	// 		return text;
	// 	}
	// });

}