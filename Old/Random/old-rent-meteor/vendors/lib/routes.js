'use strict';

Router.route('vendors', {
	name: 'vendorsHome',
	yieldTemplates: {
		'vendorsHeader': { to: 'header' },
	}
});

Router.route('vendors/add', {
	name: 'vendorsAdd',
	yieldTemplates: {
		'vendorsHeader': { to: 'header' },
	}
});

Router.route('vendors/:_id', {
	name: 'vendorsPageHome',
	yieldTemplates: {
		'vendorsPageHeader': { to: 'header' },
	},

	data: function() {
		return db.vendors.findOne(this.params._id);
	}
});
