'use strict';

Router.route('customers', {
    name: 'customersHome',
});

Router.route('customers/add', {
    name: 'addCustomers',
    yieldTemplates: {
        'customersHeader': { to: 'header' },
    },
});

Router.route('customers/:_id', {
    name: 'customersPageHome',
    yieldTemplates: {
        'customersPageHeader': { to: 'header' },
    },

    data: function () {
        return db.customers.findOne(this.params._id);
    },
});

Router.route('customers/:_id/settings', {
    name: 'customersSettings',

    yieldTemplates: {
        'customersPageHeader': { to: 'header' },
    },

    data: function() {
        return db.customers.findOne(this.params._id);
    }
});

Router.route('customers/:_id/notes', {
    name: 'customersNotes',

    data: function() {
        return db.customers.findOne(this.params._id);
    }
});
