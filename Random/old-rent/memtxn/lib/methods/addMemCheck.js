'use strict';

Meteor.methods({
    addMemCheck: function(doc) {
        check(doc, {
            vendor: String,
            memo: String,
            num: Number,
            bankAccount: String,
            schedule: String,
            name: String,
            date: String,
            charges: [{
                account: String,
                amount: Number,
                memo: String,
                house: String,
            }],
        });

        if(!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        var amount = 0;
        doc.charges.forEach(function(expense) {
            amount += expense.amount;
        });

        _.extend(doc, { type: 'Check', amount: amount, user: Meteor.userId() });
        db.recurr.insert(doc);
    }
});
