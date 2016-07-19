'use strict';

Template.accountsPageHome.onRendered(function() {
    $('.input-daterange').datepicker({
        orientation: 'top auto',
    });
});

Template.accountsPageHome.onCreated(function() {
	app.setupDateRange();

    this.autorun(() => {
        this.subscribe('accountsDateRange', Session.get('daterange.from'), Session.get('daterange.to'), Router.current().params._id);
    });
});

Template.accountsPageHome.helpers({
	transactions () {
		return db.charges.find();
    },
});

Template.accountsPageHome.events({
	'click tbody tr': function() {
		Router.go('edit' + this.type, { _id: this.transaction });
	},
});
