'use strict';

Meteor.methods({
    addBank: function(doc) {
        check(doc, app.schemas.addBankForm);

        if(!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        _.extend(doc, { balance: 0, user: Meteor.userId() });
        var id = db.banks.insert(doc);

        return id;
    }
});
