'use strict';

Meteor.methods({
	insertHouse: function(doc) {
		check(doc, db.houses.simpleSchema());

		if(!Meteor.userId()) {
			throw new Meteor.Error('not-authorized');
		}

		_.extend(doc, { isRented: false, user: Meteor.userId() });
		db.houses.insert(doc);
	},
});
