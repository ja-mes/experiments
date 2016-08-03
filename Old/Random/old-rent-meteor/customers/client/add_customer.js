'use strict';

Session.set('add-customers-deposit', 0);
Session.set('add-customers-rent', 0);

AutoForm.hooks({
    addCustomers: {
        onSuccess: function() {
            Session.set('add-customers-deposit', 0);
            Session.set('add-customers-rent', 0);
        }
    }
});

Template.addCustomers.helpers({
    housesAvailable: function() {
        return db.houses.find({ isRented: false }, { fields: { _id: 1 } }).fetch().length > 0;
    },

    deposit: function() {
        return +Session.get('add-customers-deposit');
    },

    rent: function() {
        return +Session.get('add-customers-rent');
    },
});

Template.addCustomers.events({
    'change select[name="house"]': function(event) {
        var house = db.houses.findOne({ address: event.target.value }, { fields: { deposit: 1, rent: 1 } });
        if (house) {
            Session.set('add-customers-deposit', house.deposit);
            Session.set('add-customers-rent', house.rent);
        }
        else {
            Session.set('add-customers-deposit', '');
            Session.set('add-customers-rent', '');
        }
    },
});
