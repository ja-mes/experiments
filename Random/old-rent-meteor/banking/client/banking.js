'use strict';

Template.banking.helpers({
    account: function() {
        return db.banks.find({}, { fields: { name: 1, balance: 1 } });
    },
});

Template.banking.events({
    'click tbody tr': function() {
        Session.set('selected_bank', this._id);
        Router.go('register');
    }
});
