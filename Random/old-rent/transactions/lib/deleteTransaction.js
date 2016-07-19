'use strict';

Meteor.methods({
	deleteTransaction: function(doc) {
		check(doc, db.transactions.simpleSchema());

		if(doc.charges || doc.diff) {
			db.charges.remove({ transaction: doc._id, user: Meteor.userId() });
		}

        db.transactions.remove({ _id: doc._id, user: Meteor.userId() });


		if(doc.type === 'Payment' || doc.type === 'Invoice') {
			if(Meteor.isServer) {
				db.customers.update(doc.customer, {
					$set: { balance: app.calculateCustomerBalance(doc.customer) },
				});
			}
		}
		else if(doc.type === 'Check' || doc.type === 'Deposit') {
			if(Meteor.isServer) {
				db.banks.update(doc.bankAccount, {
					$set: { balance: app.calculateBankBalance(doc.bankAccount), }
				});
			}
		}

		if(doc.type === 'Deposit') {
			doc.transactions.forEach(function(doc) {
				db.transactions.update(doc, {
					$set: { deposited: false },
				});
			});
		}
    }
});
