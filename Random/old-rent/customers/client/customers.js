'use strict';

Session.set('customer-search-term', '');
Session.set('customer.home.display', true);

Template.customersHome.rendered = function() {
	var select = $('#display')[0];
	var display = Session.get('customer.home.display');

	if(display === 'all') {
		select.value = 'All';
	}
	else if(display === true) {
		select.value = 'Active';
	}
	else if(display === false) {
		select.value = 'Inactive';
	}
};

Template.customersHome.helpers({
	customer: function () {
		var val = Session.get('customer-search-term');
		var search;

		var regex = { $regex: val, $options: 'i' };
		var fields = [
			{ lastName: regex },
			{ firstName: regex },
			{ house: regex }
		];

		if(Session.get('customer.home.display') === 'all') {
			search = {
				$or: fields
			};
		}
		else {
			search =  {
				$or: fields,
				active: Session.get('customer.home.display'),
			};
		}

		return db.customers.find(search);
	},

	value: function () {
		return Session.get('customer-search-term');
	},

	highlight: function () {
		if (this.balance > 0) {
			return 'danger';
		}
	},

    balance: function() {
        if(this.balance !== undefined) {
            return this.balance.toFixed(2);
        }
    },
});

Template.customersHome.events({
	'keyup #search': function (event) {
		Session.set('customer-search-term', event.target.value);
	},

	'click tbody tr': function () {
		Router.go('customersPageHome', { _id: this._id });
	},

	'change #display': function(event) {
		var value = event.target.value;

		if(value === 'Active') {
			Session.set('customer.home.display', true);
		}
		else if(value === 'Inactive') {
			Session.set('customer.home.display', false);
		}
		else if(value === 'All') {
			Session.set('customer.home.display', 'all');
		}
	},
});
