'use strict';

Meteor.methods({
	invoice: function (doc, id) {
		var theDoc = doc.$set || doc;

		check(doc, Object);
		check(theDoc, app.invoiceSchema);
		check(id, Match.Optional(String));

		if(!Meteor.userId()) {
			throw new Meteor.Error('not-authorized');
		}

		// calculate charges total
		var amount = 0;
		theDoc.charges.forEach(function(charge) {
			amount += charge.amount;
		});

		_.extend(doc.$set || theDoc, {
			type: 'Invoice', amount: amount,
			user: Meteor.userId(),
		 });

		// if the id paramter is passed we need to update invoice
		if(id) {
			db.transactions.update(id, doc);
			db.charges.remove({ transaction: id, user: Meteor.userId() });
			theDoc = doc.$set;
		}
		else {
			id = db.transactions.insert(theDoc);
		}

		// create charges
		theDoc.charges.forEach(function(charge) {
			_.extend(charge, {
				type: 'Invoice', transaction: id, date: theDoc.date,
				user: Meteor.userId(),
			});
			db.charges.insert(charge);
		});


		// update the customer balance
		if(Meteor.isServer) {
			db.customers.update(theDoc.customer, {
				$set: { balance: app.calculateCustomerBalance(theDoc.customer) },
			});
		}

		return id;
	},
});
