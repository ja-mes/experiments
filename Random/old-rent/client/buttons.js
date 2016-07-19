'use strict';

Template.buttons.helpers({
    editing: function() {
        var data = Template.parentData(5) || Template.parentData(1);
        if(data) return data.editing;
    },

    cancelButton: function() {
        if(!this.cancelButton && this.atts) {
            return this.atts.cancelButton;
        }

        return this.cancelButton;
    },
});

Template.buttons.events({
    'click #buttonDelete': function(event) {
        event.preventDefault();

        var deleteMethod = this.deleteMethod || this.atts.deleteMethod;
        var doc = Template.parentData(6) || Template.parentData(3);

        Meteor.call(deleteMethod, doc, function(error) {
            if(error) return sAlert.error(error.reason);
            history.back();
        });
    },
    'click #buttonCancel': function(event) {
        event.preventDefault();
        history.back();
    },
});
