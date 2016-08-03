'use strict';

Meteor.methods({
    customer(doc, id) {
        check(doc, {
            firstName: String,
            lastName: String,
            phone: String,
            rentDay: Number,
            houseId: String,
            rent: Number,
            deposit: Match.Optional(Number),
            currentHouse: Match.Optional(String),
        });
        check(id, Match.Optional(String));

        if(!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        let house = db.houses.findOne({user: Meteor.userId(), _id: doc.houseId}, {fields: {address: 1, customerId: 1}});

        _.extend(doc, {
            balance: 0,
            active: true,
            address: house.address,
            fullName: `${doc.firstName} ${doc.lastName}`,
            user: Meteor.userId(),
        });


        if(id) {
            if(doc.currentHouse !== doc.houseId) {
                db.houses.update(doc.currentHouse, {
                    $set: {
                        isRented: false,
                        customerId: '',
                    }
                });

                db.houses.update(doc.houseId, {
                    $set: {
                        isRented: true,
                        customerId: id,
                    }
                });
            }
            db.customers.update({ user: Meteor.userId(), _id: id }, {
                $set: doc,
            });
        }
        else {
            id = db.customers.insert(doc);

            db.houses.update(house._id, {
                $set: {
                    isRented: true,
                    customerId: id,
                },
            });
        }


        if(doc.deposit > 0) {
            // create invoice for deposit here
        }
    },
});
