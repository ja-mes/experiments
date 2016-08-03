'use strict';

Meteor.methods({
    updateDeposit: function(id, bankAccount, oldBankAccount, amount, checkedTransactions, notCheckedTransactions, diff, date) {
        check(id, String);
        check(bankAccount, String);
        check(oldBankAccount, String);
        check(amount, Number);
        check(checkedTransactions, Array);
        check(notCheckedTransactions, Array);
        check(diff, Number);
        check(date, String);

        if(!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        // set all transactions that were uncheck as undeposited
        notCheckedTransactions.forEach(function(transaction) {
            db.transactions.update(transaction, {
                $set: { deposited: false }
            });
        });


        // update transaction
        db.transactions.update({ _id: id, user: Meteor.userId() }, {
            $set: {
                bankAccount: bankAccount,
                amount: amount,
                transactions: checkedTransactions,
                diff: diff,
                date: date,
            }
        });


        // create update or remove deposit diff
        db.charges.remove({ transaction: id, user: Meteor.userId() });
        if(diff > 0) {
            db.charges.insert({
                user: Meteor.userId(),
                type: 'Deposit',
                memo: 'Deposit correction',
                account: db.accounts.findOne({ name: 'Deposit Discrepancies', user: Meteor.userId() }, { fields: { _id: 1 } })._id,
                amount: diff,
                transaction: id,
                date: date,
            });
        }


        // update bank account balance
        if(Meteor.isServer) {
            db.banks.update(bankAccount, {
                $set: { balance: app.calculateBankBalance(bankAccount), }
            });
        }

        // if the user selected a different bank account, we must also update the old bank account
        if(bankAccount !== oldBankAccount && Meteor.isServer) {
            db.banks.update(oldBankAccount, {
                $set: { balance: app.calculateBankBalance(oldBankAccount), }
            });
        }
    }
});
