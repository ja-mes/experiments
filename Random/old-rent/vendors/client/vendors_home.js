'use strict';

Template.vendorsHome.helpers({
	vendor: function() {
		return db.vendors.find().fetch();
	}
});


Template.vendorsHome.events({
	'click tbody tr': function() {
		Router.go('vendorsPageHome', { _id: this._id });
	}
});
