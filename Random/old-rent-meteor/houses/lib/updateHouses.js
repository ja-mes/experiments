'use strict';

Meteor.methods({
	updateHouse: function (house, address, deposit, rent) {
		check(house, Object);
        check(address, String);
		check(deposit, Number);
		check(rent, Number);

		if(!Meteor.userId()) {
			throw new Meteor.Error('not-authorized');
		}

        if(house.isRented) {
            db.customers.update({ house: house.address, user: Meteor.userId() }, {
                $set: { house: address },
            });
        }

        db.houses.update({ _id: house._id, user: Meteor.userId() }, {
            $set: {
                address: address,
                deposit: deposit,
                rent: rent,
            }
        });

    },
});
