'use strict';

Template.housesHome.onRendered(function() {
    $('.input-daterange').datepicker({
        orientation: 'top auto',
    });
});

Template.housesHome.onCreated(function() {
	app.setupDateRange();

	var self = this;
    self.autorun(function() {
        self.subscribe('accountsDateRange', Session.get('daterange.from'), Session.get('daterange.to'), Router.current().params._id);
    });
});

Template.housesHome.helpers({
	transactions: function() {
		return db.charges.find();
	},
});

Template.housesHome.events({
	'click tbody tr': function () {
		Router.go('edit' + this.type, { _id: this.transaction });
	},
});
