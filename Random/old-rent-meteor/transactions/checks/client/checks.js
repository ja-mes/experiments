'use strict';

AutoForm.hooks({
    createCheck: {
        onSubmit: function(insertDoc, updateDoc, currentDoc) {
            this.event.preventDefault();
            var data = Template.parentData(1);

            if(data && data.editing) {
                Meteor.call('check', updateDoc, currentDoc._id);
            }
            else {
                Meteor.call('check', insertDoc);
            }

            this.done();
        },
    },
});

function calculateBalance() {
    var amount = 0;

    Session.set('expenses-total', 0);

    $('.amount').each(function() {
        amount += +this.value;
    });

    if(amount !== amount) {
        Session.set('expenses-total', 0);
    }
    else {
        Session.set('expenses-total', amount);
    }
}

Template.checksForm.rendered = function() {
    $('.pickdate').datepicker();
};

Template.checksForm.helpers({
    num: function() {
        return Session.get('check-num');
    },

    doc: function() {
        if(this.editing || this.recurr) {
            return Template.parentData(1);
        }
        else {
            return null;
        }
    },

    expensesTotal: function() {
        var total = parseFloat(Session.get('expenses-total'));

        if(total !== undefined) {
            return total.toFixed(2);
        }
    },

    selectedBank: function() {
        return Session.get('selected_bank');
    },
});

Template.checksForm.events({
    'change input[name="num"]': function(event) {
        Session.set('check-num', event.target.value);
    },

    'change .amount, click .autoform-remove-item, click .autoform-add-item': function() {
        setTimeout(function() {
            calculateBalance();
        }, 0);
    },

    'change select[name="bankAccount"]': function(event) {
        Session.set('selected_bank', event.target.value);
    },
});
