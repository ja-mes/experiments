'use strict';

Meteor.methods({
    createDeposit: function(bankAccount, amount, transactions, diff, date) {
        check(bankAccount, String);
        check(amount, Number);
        check(transactions, Array);
        check(diff, Number);
        check(date, String);

        if(!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        var id = db.transactions.insert({
            user: Meteor.userId(),
            type: 'Deposit',
            bankAccount: bankAccount,
            amount: amount,
            transactions: transactions,
            diff: diff,
            date: date,
        });

        if(Meteor.isServer) {
            db.banks.update(bankAccount, {
                $set: { balance: app.calculateBankBalance(bankAccount), }
            });
        }

        if (diff > 0) {
            db.charges.insert({
                user: Meteor.userId(),
                date: date,
                type: 'Deposit',
                memo: 'Deposit correction',
                account: db.accounts.findOne({ name: 'Deposit Discrepancies', user: Meteor.userId() }, { fields: { _id: 1 } })._id,
                amount: diff,
                transaction: id,
            });
        }

        transactions.forEach(function(transaction) {
            db.transactions.update(transaction, {
                $set: { deposited: true },
            });
        });
    },
});
