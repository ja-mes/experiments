'use strict';

Meteor.methods({
	addVendor: function(doc) {
		check(doc, app.schemas.vendorsAdd);

		_.extend(doc, { user: Meteor.userId() });
		db.vendors.insert(doc);
	}
});
