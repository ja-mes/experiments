'use strict';

Template.register.onRendered(function() {
    $('.input-daterange').datepicker({
        orientation: 'top auto',
    });
});

Template.register.onCreated(function() {
	app.setupDateRange();

	var self = this;
    self.autorun(function() {
        self.subscribe('transactionsDateRange', Session.get('daterange.from'), Session.get('daterange.to'), Session.get('selected_bank'));
    });
});

Template.register.helpers({
    transaction: function() {
        var bank = Session.get('selected_bank');
        return db.transactions.find({ bankAccount: bank });
    },

    amount: function() {
        if(this.type === 'Check') {
            return this.amount;
        }
    },

    deposit: function() {
        if(this.type === 'Deposit') {
            return this.amount;
        }
    },

    account: function() {
        return db.banks.find();
    },

    selectedAccount: function() {
        if(this._id === Session.get('selected_bank')) {
            return 'selected';
        }
    },

    balance: function() {
        var account = db.banks.findOne(Session.get('selected_bank'));
        if (account) {
            var balance = account.balance.toFixed(2);
            if(balance < 0) {
                Session.set('balance_color', 'red');
            }
            else {
                Session.set('balance_color', 'black');
            }

            return balance;
        }
    },

    balanceColor: function() {
        return Session.get('balance_color');
    },

    vendor: function() {
        var vendor = db.vendors.findOne(this.vendor, { fields: { name: 1 } });
        if(vendor) return vendor.name;
    }
});

Template.register.events({
    'click tbody tr': function() {
        if(this.type === 'Check') {
            Router.go('editCheck', { _id: this._id });
        }
        else if(this.type === 'Deposit') {
            Router.go('editDeposit', { _id: this._id });
        }
    },

    'change #account': function(event) {
        Session.set('selected_bank', event.target.value);
    }
});
