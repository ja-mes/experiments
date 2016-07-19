'use strict';

Template.vendorsPageHome.onRendered(function() {
    $('.input-daterange').datepicker({
        orientation: 'top auto',
    });
});

Template.vendorsPageHome.onCreated(function() {
	app.setupDateRange();

	var self = this;
    self.autorun(function() {
        self.subscribe('vendorsDateRange', Session.get('daterange.from'), Session.get('daterange.to'), Router.current().params._id);
    });
});

Template.vendorsPageHome.helpers({
	transaction: function() {
		return db.transactions.find();
	}
});

Template.vendorsPageHome.events({
	'click tbody tr': function(event) {
		Router.go('editCheck', { _id: this._id });
	},
});
