'use strict';

Meteor.methods({
	payment: function (doc, id) {
		check(doc.$set || doc, app.paymentSchema);
		check(id, Match.Optional(String));

		if(!Meteor.userId()) {
			throw new Meteor.Error('not-authorized');
		}

		_.extend(doc.$set || doc, { user: Meteor.userId() });

		if(id) {
			db.transactions.update(id, doc);
			doc = doc.$set;
		}
		else {
			_.extend(doc, {
				type: 'Payment',
				deposited: false,
				account: db.accounts.findOne({ name: 'Undeposited Funds' }, { fields: { _id: 1 } })._id,
			});
			db.transactions.insert(doc);
		}

		if(Meteor.isServer) {
			db.customers.update(doc.customer, {
				$set: { balance: app.calculateCustomerBalance(doc.customer) },
			});
		}
	},
});
