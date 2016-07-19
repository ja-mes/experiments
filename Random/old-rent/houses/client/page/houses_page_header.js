'use strict';

Template.housesPageHeader.events({
    'click #back': function() {
        Router.go('houses');
    }
});
