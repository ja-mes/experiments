'use strict';

Template.housesDetails.events({
    'submit #propertyInfo': function(event) {
        event.preventDefault();

        var house = this;

        var address = event.target.address.value;
        var rent = +event.target.rent.value;
        var deposit = +event.target.deposit.value;

        Meteor.call('updateHouse', house, address, deposit, rent);
    },
});
