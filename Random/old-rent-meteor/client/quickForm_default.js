'use strict';

AutoForm.setDefaultTemplateForType('quickForm', 'default');

Template.quickForm_default.helpers({
    quickFieldsAtts: function () {
        // These are the quickForm attributes that we want to forward to
        // the afQuickFields component.
        return _.pick(this.atts, 'id-prefix');
    },
    submitButtonAtts: function plQuickFormSubmitButtonAtts() {
        var qfAtts = this.atts;
        var atts = {};
        if (typeof qfAtts.buttonClasses === "string") {
            atts['class'] = qfAtts.buttonClasses;
        }
        return atts;
    },
    cancelButton: function() {
        return this.atts.cancelButton;
    },
});

Template.quickForm_default.events({
    'click #cancel': function(event) {
        event.preventDefault();
        history.back();
    }
});
