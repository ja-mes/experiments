'use strict';

Template.customersPageHeader.helpers({
    balance: function() {
        if(this.balance !== undefined) {
            return this.balance.toFixed(2);
        }
    },

    glyphicon: function() {
        if(this.balance > 0) {
            return 'glyphicon glyphicon-exclamation-sign';
        }
        else {
            return 'glyphicon glyphicon-ok';
        }
    },

    color: function() {
        if(this.balance > 0) {
            return 'red';
        }
        else {
            return 'green';
        }
    }
});

Template.customersPageHeader.events({
    'click .trns': function() {
        Session.set('customer.selected', this._id);
    },
});
