'use strict';

Meteor.methods({
	check: function(doc, id) {
		var theDoc = doc.$set || doc;
		var oldBank;

		if(!Meteor.userId()) {
			throw new Meteor.Error('not-authorized');
		}

		check(doc, Object);
		check(theDoc, app.checkSchema);
		check(id, Match.Optional(String));

		var amount = 0;
		theDoc.charges.forEach(function(expense) {
			amount += expense.amount;
		});

		_.extend(doc.$set || theDoc, { amount: amount, type: 'Check', user: Meteor.userId() });

		if(id) {
			oldBank = db.transactions.findOne(id).bankAccount;
			db.transactions.update(id, doc);
			db.transactions.remove({ transactoin: id, user: Meteor.userId() });
			theDoc = doc.$set;
		}
		else {
	        id = db.transactions.insert(doc);
		}


		theDoc.charges.forEach(function (charge) {
			_.extend(charge, { type: 'Check', transaction: id, user: Meteor.userId(), date: theDoc.date });
			db.charges.insert(charge);
		});


		if(oldBank && oldBank !== theDoc.bankAccount) {
			if(Meteor.isServer) {
				db.banks.update(oldBank, {
					$set: { balance: app.calculateBankBalance(oldBank) },
				});
			}
		}

		if(Meteor.isServer) {
			db.banks.update(theDoc.bankAccount, {
				$set: { balance: app.calculateBankBalance(theDoc.bankAccount) }
			});
		}


		// set the suggested check number to this check number + 1
		Meteor.users.update({ _id: Meteor.userId() }, { $set: { 'profile.nextCheckNum': theDoc.num + 1 } });
	}
});
