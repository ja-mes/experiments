'use strict';

Meteor.methods({
    rent: function(doc) {
        check(doc, app.customersFormSchema);

        if(!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        _.extend(doc, { balance: 0, active: true, user: Meteor.userId(), notes: [] });
        var id = db.customers.insert(doc);

        db.houses.update(db.houses.findOne({ address: doc.house, user: Meteor.userId() })._id, {
            $set: { isRented: true }
        });

        var customer = db.customers.findOne(id);

        if(doc.deposit > 0) {
            var invoice = {
                customer: customer._id,
                date: app.getDate(),
                memo: 'Security Deposit',
                charges: [{
                    account: db.accounts.findOne({ name: 'Security Deposits'})._id,
                    amount: +doc.deposit,
                    memo: 'Security Deposit',
                    house: db.houses.findOne({ address: doc.house })._id,
                }],
            };

            Meteor.call('invoice', invoice, function(error, result) {
                if(error) throw error;
            });
        }
    },
});
