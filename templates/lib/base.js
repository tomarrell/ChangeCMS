if (Meteor.isClient) {

	Template.body.rendered = function() {
		AniJS.run();
	}

}