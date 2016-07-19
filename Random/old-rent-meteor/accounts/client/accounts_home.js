'use strict';

Session.setDefault('accounts-search-term', '');

Template.accountsHome.helpers({
	account: function () {
		var val = Session.get('accounts-search-term');

		return db.accounts.find({
			name: { $regex: val, $options: 'i' },
		});
	},

	value: function () {
		return Session.get('accounts-search-term');
	}
});


Template.accountsHome.events({
	'keyup form': function () {
		Session.set('accounts-search-term', event.target.value);
	},

	'click tbody tr': function () {
		Router.go('accountsPageHome', { _id: this._id });
	}
});
