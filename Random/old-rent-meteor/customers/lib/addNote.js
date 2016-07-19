'use strict';

Meteor.methods({
    customerNote: function(doc, id) {
        check(doc, { customer: Match.Optional(String), date: String, note: String, id: Match.Optional(String) });

        if(!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        if(id) {
            db.customers.update({ 'notes.id': id, user: Meteor.userId() }, {
                $set: {
                    'notes.$.date': doc.date,
                    'notes.$.note': doc.note,
                }
            });
        }
        else {
            _.extend(doc, { id: Random.id() });
            db.customers.update({ _id: doc.customer, user: Meteor.userId() }, {
                $push: { notes: doc },
            });
        }
    },
});
