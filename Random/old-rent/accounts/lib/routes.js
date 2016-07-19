'use strict';

Router.route('accounts', {
	name: 'accountsHome',
});

Router.route('accounts/add', {
	name: 'accountsAdd',
});

Router.route('accounts/:_id', {
	name: 'accountsPageHome',

	data: function() {
		return db.accounts.findOne(this.params._id);
	}
});
