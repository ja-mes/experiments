'use strict';

Meteor.methods({
    addHouse(doc) {
  		check(doc, Object);

  		if(!Meteor.userId()) {
  			throw new Meteor.Error('not-authorized');
  		}

  		_.extend(doc, { isRented: false, user: Meteor.userId() });
  		db.houses.insert(doc);
    }
});
