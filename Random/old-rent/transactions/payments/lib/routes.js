'use strict';

Router.route('payment', {
    name: 'payment',

    data: function() {
        return db.customers.findOne(this.params.customer);
    }
});

Router.route('payment/:_id', {
    name: 'editPayment',

    waitOn: function() {
        return Meteor.subscribe('transaction', this.params._id);
    },

    data: function() {
        return db.transactions.findOne(this.params._id);
    },
});
