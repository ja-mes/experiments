'use strict';

FlowRouter.route('/invoice/:customerId', {
    name: 'invoice',

    action(params) {
        ReactLayout.render(C.Layout, {
            content: <C.Invoice customerId={params.customerId} />,
        });
    },
});

FlowRouter.route('/invoice/:customerId/:_id', {
    name: 'editInvoice',

    action(params) {
        ReactLayout.render(C.Layout, {
            content: <C.Invoice customerId={params.customerId} invoiceId={params._id} />
        });
    }
});
