'use strict';

FlowRouter.route('/customers', {
    name: 'customers',

    action() {
        ReactLayout.render(C.Layout, {
            content: <C.Customers />,
        });
    },
});

FlowRouter.route('/customers/add', {
    name: 'customersAdd',

    action() {
        ReactLayout.render(C.Layout, {
            content: <C.CustomersAdd />
        });
    },
});

FlowRouter.route('/customers/:_id', {
    name: 'customersDetails',

    action(params) {
        ReactLayout.render(C.Layout, {
            content: <C.CustomersDetails customerId={params._id}/>
        });
    },
});

FlowRouter.route('/customers/:_id/settings', {
    name: 'customersSettings',

    action(params) {
        ReactLayout.render(C.Layout, {
            content: <C.CustomersSettings customerId={params._id}/>,
        });
    },
});
