'use strict';

Accounts.onLogin(function(user) {
    var id = user.user._id;

    if(id) {
        if (db.accounts.find({ user: id }, { fields: { _id : 1 } }).count() === 0) {
            var accounts = [
                'Rental Income',
                'Undeposited Funds',
                'Deposit Discrepancies',
                'Security Deposits',
            ].forEach(function(account) {
                db.accounts.insert({
                    name: account,
                    user: id,
                });
            });
        }

        if(db.banks.find({ user: id }, { fields: { _id: 1 } }).count() === 0) {
            db.banks.insert({
                name: 'Checking',
                balance: 0,
                user: id,
            });
        }
    }
});
