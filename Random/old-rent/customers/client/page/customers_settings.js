'use strict';

Template.customersSettings.helpers({
    houseList: function() {
        return db.houses.find({ isRented: false });
    }
});

Template.customersSettings.events({
    'change #customerInfo': function(event) {
        event.preventDefault();
        var form = $('#customerInfo')[0];

        var firstName = form.firstName.value;
        var lastName = form.lastName.value;
        var phone = form.phone.value;
        var house = db.houses.findOne({ address: form.address.value });

        Meteor.call('updateCustomer', this._id, firstName, lastName, phone, house);
    },

    'click #cancel': function(event) {
        event.preventDefault();

        var form = $('#customerInfo')[0];

        form.firstName.value = this.firstName;
        form.lastName.value = this.lastName;
        form.phone.value = this.phone;
    },

    'click #inactive': function(event) {
        Meteor.call('customerInactive', this, function(err) {
            if(err) {
                return console.log(err.reason);
            }

            alert('Customer successfuly made inactive');
        });
    }
});
