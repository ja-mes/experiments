'use strict';

Meteor.methods({
	housesUpdate(doc, house) {
        check(doc, {
            address: String,
            deposit: Number,
            rent: Number,
        });
		check(house, db.houses.simpleSchema());

		if(!Meteor.userId()) {
			throw new Meteor.Error('not-authorized');
		}

        db.houses.update({ _id: house._id, user: Meteor.userId() }, {
            $set: doc,
        });

		if(house.isRented) {
			db.customers.update({ _id: house.customerId, user: Meteor.userId() }, {
				$set: {
					address: doc.address,
				}
			});
		}
    },
});
