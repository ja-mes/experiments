'use strict';

Meteor.methods({
    invoice(doc, id) {
        console.log(doc, id);
        check(doc, {
            customer: String,
            memo: String,
            date: String,
            num: Number,
            charges: [{
                account: String,
                amount: Number,
                memo: String,
                house: String,
            }],
        });
        check(id, Match.Optional(String));

        if(!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        let amount = 0;
        for(let i of doc.charges) {
            amount += i.amount;
        }

        _.extend(doc, {
            type: 'Invoice',
            amount: amount,
            user: Meteor.userId(),
        });


        if(id) {
            console.log(doc);
            db.transactions.update(id, {
                $set: doc,
            });
            console.log(db.transactions.findOne(id));
            db.charges.remove({ transaction: id, user: Meteor.userId() });
        }
        else {
            console.log(doc);
            id = db.transactions.insert(doc);
        }

        doc.charges.forEach(charge => {
            let theCharge = charge;
            _.extend(theCharge, {
                user: Meteor.userId(),
                type: 'Invoice',
                transaction: id,
                date: doc.date,
            });

            db.charges.insert(theCharge);
        });

        if(Meteor.isServer) {
            db.customers.update(doc.customer, {
                $set: {
                    balance: A.calculateCustomerBalance(doc.customer),
                },
            });
        }
    },
});
