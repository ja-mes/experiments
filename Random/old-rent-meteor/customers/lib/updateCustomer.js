'use strict';

Meteor.methods({
    updateCustomer: function(customerId, firstName, lastName, phone, house) {
        check(customerId, String);
        check(firstName, String);
        check(lastName, String);
        check(phone, String);
        check(house, Object);

        if(!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        var customer = db.customers.findOne(customerId);

        if(house.address !== customer.house) {
            db.houses.update({ address: customer.house },  {
                $set: { isRented: false },
            });

            db.houses.update(house._id, {
                $set: { isRented: true },
            });
        }

        db.customers.update(customerId, {
            $set: {
                house: house.address,
                firstName: firstName,
                lastName: lastName,
                phone: phone,
            }
        });
    },
});
