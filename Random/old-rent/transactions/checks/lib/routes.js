'use strict';

Router.route('checks/add', {
    name: 'createChecks',

    action: function() {
        Session.set({
            'expenses-total': 0,
            'check-num': Meteor.user().profile.nextCheckNum || 1,
        });

        this.render();
    },
});

Router.route('checks/:_id', {
    template: 'editChecks',
    name: 'editCheck',

    action: function() {
        var data = this.data();
        if(data) {
            Session.set({
                'check-num': data.num,
                'expenses-total': data.amount,
            });
        }
        this.render();
    },

    waitOn: function() {
        return Meteor.subscribe('transactions');
    },

    data: function() {
        return db.transactions.findOne(this.params._id);
    },
});


Router.route('checks/recurr/:_id', {
    name: 'editRecurrCheck',
    template: 'recurrCheck',

    action: function() {
        Session.set('check-num', this.data().num);
        Session.set('expenses-total', this.data().amount);
        this.render();
    },

    waitOn: function() {
        return Meteor.subscribe('memtxn');
    },

    data: function() {
        return db.recurr.findOne(this.params._id);
    }
});
