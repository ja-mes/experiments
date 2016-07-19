'use strict';

app.calculateCustomerBalance = function(customerId) {
	var total = 0;

	var transactions = db.transactions.find(
		{ customer: customerId, user: Meteor.userId() },
		{ fields: { amount: 1, type: 1 } }
	).fetch();

	for(var i = 0; i < transactions.length; i++) {
		var transaction = transactions[i];
		if(transaction.type === 'Invoice') {
			total += transaction.amount;
		}
		else if(transaction.type === 'Payment') {
			total += -transaction.amount;
		}
	}

	return total;
};

app.calculateBankBalance = function(bankAccount) {
    var transactions = db.transactions.find({
        bankAccount: bankAccount,
		user: Meteor.userId(),
    }).fetch(),
        total = 0;

    transactions.forEach(function(transaction) {
        if(transaction.type === 'Deposit') {
            total += transaction.amount;
        }
        else if(transaction.type === 'Check') {
            total -= transaction.amount;
        }
    });

    return total;
};
