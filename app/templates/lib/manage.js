// Code to run on client. These trigger actions on the server.
if (Meteor.isClient) {

    ////////////////////
    // Global Helpers //
    ////////////////////

    // Add page to CMS directory
    Template.registerHelper("newPage", function(pageName) {
        // Creates new mongo collection for the page and adds the page to the global page document
        //Pages[pageName] = new Mongo.Collection(pageName);
    });

    /*
     *	Add/get information in page
     *	Parameters:
     *		pageName	: the predefined name of the current page
     *		contentType	: the type of the content to be served; this defines the type of manipulation possible in the admin panel
     * 		contentName : the name of the content to be served in that location on the page
     *
     */
    Template.registerHelper("superAdd", function(pageName, contentName, contentType, content) {

        Meteor.subscribe("data", )

    });

    // Template.registerHelper("superAdd", function(pageName, contentName, contentType, content) {

    //     console.log("executing function");
    //     Meteor.call("pull", function(err, result) {
    //         console.log(result);

    //         if (!result.length > 0) {

    //             var data = {
    //                 "name": pageName,
    //                 "items": {}
    //             }

    //             data.items[contentName] = [contentType, content];

    //             Meteor.call("insert", data, function(err, result) {
    //                 console.log("done");
    //                 Session.set("data", result.items[contentName][1]);
    //             });

    //         } else {
    //         	result.forEach(function(el) {
    //         		if (el.name == pageName) {
    //         			console.log(el)
    //         			Session.set("data", el.items[contentName][1])
    //         			return;
    //         		}
    //         	});
    //         }

    //     });

    //     return Session.get("data");

    // });

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
                if (err) {
                    console.log("There was an error logging out. Please contact your nearest developer.");
                    console.log(err);
                }
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

    //
    // Helpers and events for dashboard tabs
    //
    Template.pages.helpers({
        getPages: function() {
            var pageList = [];
            for (var key in Pages) {
                key.capitalizeFirstLetter;
                pageList.push(key);
            }
            return pageList;
        },
        // Stores the session for the current page being edited
        currentEditPage: function() {
            return Session.get("currentEditPage");
        },
        // Returns all the changeable blocks in page
        contentBlocks: function() {
            if (!Session.get("currentEditPage")) {
                Session.setDefault("currentEditPage", "index");
            }
            var page = Session.get("currentEditPage");
            var sections = Pages[page].find();
            return sections;
        },
        capitalizeFirstLetter: function(word) {
            return word.charAt(0).toUpperCase() + word.slice(1);
        },
        checkCharLength: function(text) {
            // console.log(text.length);
            if (text.length < 150) {
                return "change-input-half";
            }
        }
    });

    Template.pages.events({
        "change .change-pages-nav": function(event) {
            Session.set("currentEditPage", event.target.value);
        },
        "click .change-submitText": function(event) {
            var page = Session.get("currentEditPage");
            console.log(event.target)
            var textArea = $(".change-" + this.name)[0].value;
            console.log(textArea);
            Pages[page].update({
                _id: this._id
            }, {
                $set: {
                    text: textArea
                }
            });
        }
    });

    Template.dashboard.rendered = function() {
        $("body").css({
            "overflow-x": "hidden"
        });
    }

}

// Helper functions and extra implementation
String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}
