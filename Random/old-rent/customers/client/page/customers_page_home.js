'use strict';

Template.customersPageHome.onRendered(function() {
    $('.input-daterange').datepicker({
        orientation: 'top auto',
    });
});

Template.customersPageHome.onCreated(function() {
    app.setupDateRange();

    var self = this;
    self.autorun(function() {
        self.subscribe('customerDateRange', Session.get('daterange.from'), Session.get('daterange.to'), Router.current().params._id);
    });
});

Template.customersPageHome.helpers({
    transaction: function () {
        return db.transactions.find({}, { sort: { date: -1 } });
    },

    amount: function() {
        if(this.amount !== undefined) {
            return this.amount.toFixed(2);
        }
    },
});

Template.customersPageHome.events({
    'click tbody td': function () {
        if(this.type === 'Payment') {
            Router.go('editPayment', { _id: this._id });
        }
        else if(this.type === 'Invoice') {
            Router.go('editInvoice', { _id: this._id });
        }
    }
});
