'use strict';

Meteor.methods({
    addAccount: function (doc) {
        check(doc, app.schemas.addAccountForm);

        if(!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        _.extend(doc, { user: Meteor.userId() });
        db.accounts.insert(doc);
    }
});
