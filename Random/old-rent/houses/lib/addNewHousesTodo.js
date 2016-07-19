'use strict';

Meteor.methods({
	addNewHouseTodo: function (house, val) {
	check(house, String);
		check(val, String);

		if(!Meteor.userId()) {
			throw new Meteor.Error('not-authorized');
		}

		db.houses.update(house, {
			$push: { todos: val }
		});
	},
});
