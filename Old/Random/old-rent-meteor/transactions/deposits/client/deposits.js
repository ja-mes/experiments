'use strict';

var transactions = [];

Session.set('deposit-total', 0);
Session.set('deposit-diff', '');

function reset() {
    $('.checked').each(function() {
        if(this.checked) {
            this.click();
        }
    });

    Session.set('deposit-total', 0);
    Session.set('deposit-diff', '');
    $('#checkAll')[0].checked = false;
    $('#diff').val('');
}

Template.depositsForm.onRendered(function() {
    var trnsSub, depositSub;
    if(Router.current().params._id) {
        depositSub = this.subscribe('transaction',  Router.current().params._id);

        trnsSub = this.subscribe('transactions', {
            type: 'Payment',
            deposited: true,
        });
    }
    else {
        trnsSub = this.subscribe('transactions', {
            type: 'Payment',
            deposited: false,
        });
    }

    $('.pickdate').datepicker({
        orientation: 'top auto'
    });

    var self = this;
    self.autorun(function() {
        if(self.data && self.data.editing && depositSub.ready() && trnsSub.ready()) {
            Tracker.afterFlush(function() {
                $('#checkAll')[0].checked = true;
                $('.checked').each(function() {
                    this.checked = true;
                });
            });
        }
    });
});

Template.depositsForm.helpers({
    transaction: function() {
        var data = Template.parentData(1);
        var payments;

        if(this.editing) {
            payments = [];

            if(data) {
                data.transactions.forEach(function(transaction) {
                    payments.push(db.transactions.findOne(transaction));
                });
            }
        }
        else {
            payments = db.transactions.find().fetch();
        }

        for(var i = 0; i < payments.length; i++) {
            if(payments[i]) transactions.push(payments[i]._id);
        }

        return payments;
    },

    customer: function() {
        var customer = db.customers.findOne(this.customer, { fields: { firstName: 1, lastName: 1 } });
        if(customer) {
            return customer.firstName + ' ' + customer.lastName;
        }
    },

    total: function() {
        return Session.get('deposit-total').toFixed(2);
    },

    bankAccount: function() {
        return db.banks.find();
    },

    selectedBank: function() {
        if(this._id === Session.get('selected_bank')) {
            return 'selected';
        }
    },

    date: function() {
        var data = Template.parentData(1);

        if(data) return data.date;
        return app.getDate();
    },

    diff: function() {
        if(this.editing) return Session.get('deposit-diff');
    }
});

Template.depositsForm.events({
    'click .goToPayment': function() {
        Router.go('editPayment', { _id: this._id });
    },

    'click .checked': function(event) {
        var checked = event.target.checked,
            amount = this.amount;

        if(checked) {
            Session.set('deposit-total', Session.get('deposit-total') + amount);

            $('.checked').each(function() {
                if(this.checked) {
                    $('#checkAll')[0].checked = true;
                }
                else {
                    $('#checkAll')[0].checked = false;
                    return false;
                }
            });
        }
        else {
            Session.set('deposit-total', Session.get('deposit-total') - amount);
            $('#checkAll')[0].checked = false;
        }
    },

    'click #checkAll': function(event) {
        Session.set('deposit-total', +Session.get('deposit-diff'));

        if (event.target.checked) {
            $('.checked').each(function() {
                this.checked = true;
            });

            $('.amount').each(function(i, e) {
                var amount = $(this).text(),
                    number = +amount.replace(/[^0-9\.]+/g,"");

                Session.set('deposit-total', Session.get('deposit-total') + number);
            });
        }
        else {
            $('.checked').each(function() {
                this.checked = false;
            });
        }
    },

    'keyup #diff': function(event) {
        var amount = +event.target.value;

        if(amount !== amount) {
            Session.set('deposit-total', Session.get('deposit-total') - Session.get('deposit-diff'));
            Session.set('deposit-diff', '');

            $(event.target).parent().addClass('has-error');
        }
        else {
            $(event.target).parent().removeClass('has-error');
            Session.set('deposit-total', Session.get('deposit-total') - Session.get('deposit-diff'));
            Session.set('deposit-total', Session.get('deposit-total') + amount);
            Session.set('deposit-diff', amount);
        }
    },

    'click #save': function(event) {
        var data = Template.parentData(1);
        var checkedTransactions, diff, bankAccount;
        var date = $('#date').val();

        if(this.editing) {
            var amount = Session.get('deposit-total');
            var notCheckedTransactions = [];
            var id = data._id;
            bankAccount = $('#bankAccount').val();
            var oldBankAccount = Template.parentData(1).bankAccount;
            diff = Session.get('deposit-diff');
            checkedTransactions = [];

            $('.checked').each(function(i, checkbox) {
                if(checkbox.checked) {
                    checkedTransactions.push(transactions[i]);
                }
                else {
                    notCheckedTransactions.push(transactions[i]);
                }
            });

            $('#checkAll')[0].checked = true;

            $('.checked').each(function() {
                this.checked = true;
            });

            Meteor.call('updateDeposit', id, bankAccount, oldBankAccount, amount, checkedTransactions, notCheckedTransactions, diff, date, function(error, result) {
                if(error) throw error.reason;
                history.back();
            });
        }
        else {
            checkedTransactions = [];
            var depositTotal = Session.get('deposit-total');
            diff = +$('#diff').val();
            bankAccount = $('#bankAccount').val();

            $('.checked').each(function(i, checkbox) {
                if(checkbox.checked) {
                    checkedTransactions.push(transactions[i]);
                }
            });

            Meteor.call('createDeposit', bankAccount, depositTotal, checkedTransactions, diff, date, function(error, result) {
                if(error) {
                    return console.warn(error.reason);
                }

                history.back();
            });
        }
    },

    'click #delete': function(event) {
        Meteor.call('deleteTransaction', Template.parentData(1), function(error, result) {
            if(error) throw error.reason;
            history.back();
        });
    },

    'click #cancel': function(event) {
        event.preventDefault();
        reset();
        history.back();
    },

    'change #bankAccount': function(event) {
        Session.set('selected_bank', event.target.value);
    }
});
