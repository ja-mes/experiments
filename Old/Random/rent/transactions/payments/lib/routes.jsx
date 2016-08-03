'use strict';

FlowRouter.route('/payment/:customerId', {
    name: 'payment',

    action(params) {
        ReactLayout.render(C.Layout, {
            content: <C.Payment customerId={params.customerId}/>,
        });
    },
});

FlowRouter.route('/payment/:customerId/:_id', {
    name: 'editPayment',

    action(params) {
        ReactLayout.render(C.Layout, {
            content: <C.Payment customerId={params.customerId} paymentId={params._id} />,
        });
    },
});
