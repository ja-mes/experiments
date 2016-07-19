'use strict';

Meteor.methods({
    deleteTransaction(doc) {
        check(doc, Object);

        if(!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        if(doc.charges) {
            db.charges.remove({
                transaction: doc._id,
                user: Meteor.userId(),
            });
        }

        db.transactions.remove({
            _id: doc._id,
            user: Meteor.userId(),
        });

        if(doc.type === 'Invoice' || doc.type === 'Payment') {
            if(Meteor.isServer) {
                db.customers.update(doc.customer, {
                    $set: {balance: A.calculateCustomerBalance(doc.customer)},
                });
            }
        }
    },
});
