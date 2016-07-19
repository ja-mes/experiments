'use strict';

Template.paymentForm.rendered = function() {
    $('.pickdate').datepicker();
    
    if(!Template.parentData(1)) {
        $('[name=customer')[0].value = Session.get('customer.selected');
    }
};

Template.paymentForm.helpers({
    doc: function() {
        if(this.editing || this.recurr) {
            return Template.parentData(1);
        }
        else {
            return null;
        }
    },

    type: function() {
        if(this.editing || this.recurr) {
            return 'method-update';
        }

        return 'method';
    }
});
