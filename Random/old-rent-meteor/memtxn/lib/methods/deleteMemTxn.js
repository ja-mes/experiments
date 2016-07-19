'use strict';

    Meteor.methods({
    deleteMemTxn: function(id) {
        check(id, String);

        if(!Meteor.userId()) {
        	throw new Meteor.Error('not-authorized');
        }

        db.recurr.remove({ _id: id, user: Meteor.userId() });

        if(Meteor.isServer) {
            SyncedCron.remove('MemTxn ' + id);
        }
    }
});
