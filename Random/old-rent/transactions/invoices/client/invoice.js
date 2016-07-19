'use strict';

AutoForm.hooks({
    createInvoice: {
        after: {
            method: function(err) {
                if(err) throw err;
                Session.set('customer.invoice.amount', 0);
            }
        },
    }
});

function calculateBalance() {
    var amount = 0;

    $('.amount').each(function() {
        amount += +this.value;
    });

    Session.set('customer.invoice.amount', amount);
}

Template.invoiceForm.rendered = function() {
    $('.pickdate').datepicker();

    if(!Template.parentData(1)) {
        $('[name=customer')[0].value = Session.get('customer.selected');
    }
};

Template.invoiceForm.events({
    'change .amount, click .autoform-remove-item, click .autoform-add-item': function() {
        setTimeout(function() {
            calculateBalance();
        }, 0);
    },
});

Template.invoiceForm.helpers({
    doc: function() {
        if(this.editing || this.recurr) {
            return Template.parentData(1);
        }
        else {
            return null;
        }
    },

    type: function() {
        if(this.editing) {
            return 'method-update';
        }
        else {
            return 'method';
        }
    },

    total: function() {
        return Session.get('customer.invoice.amount').toFixed(2);
    },

    // date: function() {
    //     if(Template.parentData(2)) return Template.parentData(2).date.format();
    //     return app.getDate();
    // }
});
