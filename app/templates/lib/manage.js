// Code to run on client. These trigger actions on the server.
if (Meteor.isClient) {

    ////////////////////
    // Global Helpers //
    ////////////////////

    function dataReady() {
        return Meteor.subscribe("data").ready();
    }

    // Add page to CMS directory
    Template.registerHelper("newPage", function(pageName) {
        // Creates new mongo collection for the page and adds the page to the global page document
        //Pages[pageName] = new Mongo.Collection(pageName);
    });

    /*
     *  Add/get information in page
     *  Parameters:
     *      pageName    : the predefined name of the current page
     *      contentType : the type of the content to be served; this defines the type of manipulation possible in the admin panel
     *      contentName : the name of the content to be served in that location on the page
     *
     */
    Template.registerHelper("superAdd", function(pageName, contentName, contentType, content) {

        if (dataReady()) {
            // console.log(Data.find().fetch());
            // var pageData
            // return Data.find().fetch()[0].items["title"];
            var pageDoc = Data.findOne({
                "name": pageName
            });

            if (pageDoc) {
                if (contentType && content) {
                    if (pageDoc.items[contentName]) {
                        Session.set(contentName, pageDoc.items[contentName][1])
                    } else {
                        var newContent = [contentType, content];
                        pageDoc.items[contentName] = newContent;
                        Data.update({
                            _id: pageDoc._id
                        }, pageDoc);
                        Session.set(contentName, content);
                    }
                } else {
                    Session.set(contentName, pageDoc.items[contentName][1]);
                }
            } else {
                var payload = {
                    "name": pageName,
                    "items": {}
                }
                console.log("Inserting to database")
                Data.insert(payload);
                Session.set(contentName, content);
            }
        }

        return Session.get(contentName);

    });

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
            if (dataReady()) {
                var pageList = [];
                var pageData = Data.find().fetch();
                for (var i = 0; i < pageData.length; i++) {
                    pageList.push(pageData[i].name);
                }
                return pageList;
            }
        },
        // Stores the session for the current page being edited
        currentEditPage: function() {
            return Session.get("currentEditPage");
        },
        // Returns all the changeable blocks in page
        contentBlocks: function() {
            if (dataReady()) {
                if (!Session.get("currentEditPage")) {
                    Session.setDefault("currentEditPage", "index");
                }
                var page = Session.get("currentEditPage");
                var sections = Data.findOne({
                    "name": page
                }).items;
                itemArray = $.map(sections, function(value, index) {
                    var payload = {}
                    payload["name"] = index;
                    payload["contentType"] = value[0];
                    payload["content"] = value[1];
                    return payload;
                });

                var returnArray = [];

                // Reverse list to show inputs same as page order
                while (itemArray.length) {
                    returnArray.push(itemArray.pop());
                }

                return returnArray;
            }
        },
        capitalizeFirstLetter: function(word) {
            return word.charAt(0).toUpperCase() + word.slice(1);
        },
        replaceSpaces: function(text) {
            return text.split(" ").join("-");
        },
        checkCharLength: function(text) {
            // console.log(text.length);
            if (text.length < 150) {
                return "change-input-half";
            }
        }
    });

    Template.index.helpers({

    });

    Template.pages.events({
        "change .change-pages-nav": function(event) {
            Session.set("currentEditPage", event.target.value);
        },
        "click .change-submitText": function(event) {
            var page = Session.get("currentEditPage");
            var textArea = $(".change-" + this.name.split(" ").join("-"))[0].value;
            console.log(event);
            Meteor.call("updateData", page, this.name, textArea);
            // Data.update({
            //     "name": page
            // }, {
            //     $set: {
            //         text: textArea
            //     }
            // });
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
