'use strict';

Meteor.methods({
    updateMemTxn: function(id, schedule, name) {
        check(id, String);
        check(schedule, String);
        check(name, String);

        if(!Meteor.userId()) {
        	throw new Meteor.Error('not-authorized');
        }

        db.recurr.update(id, { $set: {
                schedule: schedule,
                name: name,
            }
        });
    },
});
