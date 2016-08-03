'use strict';

Router.route('deposits', {
    name: 'createDeposits',

    action: function() {
        Session.set('deposit-total', 0);
        Session.set('deposit-diff', '');
        this.render();
    },
});

Router.route('deposits/:_id', {
    name: 'editDeposit',
    template: 'editDeposits',

    data: function() {
        return db.transactions.findOne(this.params._id);
    },

    action: function() {
        if(this.data()) {
            Session.set('deposit-total', this.data().amount);
            Session.set('deposit-diff', this.data().diff);
        }

        this.render();
    },
});
