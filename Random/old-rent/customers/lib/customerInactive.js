'use strict';

Meteor.methods({
    customerInactive: function(customer) {
       check(customer, Object);

       if(!Meteor.userId()) {
           throw new Meteor.Error('not-authorized');
       }

       db.customers.update(customer._id, {
           $set: { active: false },
       });

       var house = db.houses.findOne({ address: customer.house, user: Meteor.userId() })._id;
       db.houses.update(house, {
           $set: { isRented: false },
       });

       if(Meteor.isServer) {
           SyncedCron.remove('Charge rent to ' + customer._id);
       }
    }
});
