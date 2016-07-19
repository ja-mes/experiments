'use strict';

Session.setDefault('houses-search-term', '');

Template.houses.helpers({
	house: function () {
		var val = Session.get('houses-search-term');
		return db.houses.find({
			address: { $regex: val, $options: 'i' }
		});
	},

	value: function () {
		return Session.get('houses-search-term');
	},

	isRented: function () {
		if (this.isRented) {
			return 'Rented';
		}
		return 'Vacant';
	},

	labelColor: function () {
		if (this.isRented) {
			return 'primary';
		}
		return 'success';
	}
});

Template.houses.events({
	'keyup #search': function () {
		Session.set('houses-search-term', event.target.value);
	},

	'click tbody tr': function () {
		Router.go('housesHome', { _id: this._id });
	},
});
