'use strict';

Meteor.methods({
    addMemInvoice: function(doc) {
        check(doc, Object);

        if(!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        var amount = 0;
        doc.charges.forEach(function(charge) {
            amount += +charge.amount;
        });

        _.extend(doc, { type: 'Invoice', amount: amount, user: Meteor.userId() });
        var id = db.recurr.insert(doc);
    }
});
