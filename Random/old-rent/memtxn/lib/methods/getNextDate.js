'use strict';

Meteor.methods({
    getNextDate: function(id) {
        check(id, String);

        if(!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        var recurrId = db.recurr.findOne({ _id: id, user: Meteor.userId() }, { fields: { _id: 1 } })._id;

        if(recurrId === id && Meteor.isServer) {
            return SyncedCron.nextScheduledAtDate('MemTxn ' + id);
        }
    }
});
