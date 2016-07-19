'use strict';

Router.route('invoice', {
    name: 'invoice',

    action: function() {
        Session.set('customer.invoice.amount', 0);
        this.render();
    },

    waitOn: function() {
        return Meteor.subscribe('customers');
    },
});

Router.route('invoice/:_id', {
    name: 'editInvoice',

    waitOn: function() {
        return Meteor.subscribe('transaction', this.params._id);
    },

    data: function() {
        return db.transactions.findOne(this.params._id);
    },

    action: function() {
        if(this.data()) Session.set('customer.invoice.amount', this.data().amount);
        this.render();
    },
});

Router.route('customers/:_id/recurrInvoice/:trnsId', {
    name: 'editRecurrInvoice',
    template: 'recurrInvoice',

    waitOn: function() {
        return Meteor.subscribe('memtxn');
    },

    data: function() {
        return db.recurr.findOne(this.params.trnsId);
    },

    action: function() {
        if(this.data()) Session.set('customer.invoice.amount', this.data().amount);
        this.render();
    },
});
