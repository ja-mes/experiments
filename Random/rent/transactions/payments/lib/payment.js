'use strict';

Meteor.methods({
    payment(doc, id) {
        check(doc, {
            customer: String,
            method: String,
            date: String,
            memo: String,
            amount: Number,
        });
        check(id, Match.Optional(String));

        if(!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        _.extend(doc, {
            user: Meteor.userId(),
            type: 'Payment',
            deposited: false,
            account: 'FIXME',
        });

        if(id) {
            db.transactions.update(id, {
                $set: doc,
            });
        }
        else {
            id = db.transactions.insert(doc);
        }

        if(Meteor.isServer) {
            db.customers.update(doc.customer, {
                $set: {
                    balance: A.calculateCustomerBalance(doc.customer),
                },
            });
        }
    },
});
