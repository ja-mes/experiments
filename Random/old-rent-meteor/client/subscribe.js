'use strict';

Meteor.subscribe('houses');
Meteor.subscribe('customers');
Meteor.subscribe('accounts');
Meteor.subscribe('vendors');
Meteor.subscribe('banks', function() {
    var bank = db.banks.findOne({ name: 'Checking' });
    if(bank) Session.set('selected_bank', bank._id);
});
Meteor.subscribe('memtxn');
