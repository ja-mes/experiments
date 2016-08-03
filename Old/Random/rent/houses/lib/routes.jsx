'use strict';

FlowRouter.route('/houses', {
    name: 'houses',

    action() {
        ReactLayout.render(C.Layout, {
            content: <C.Houses />,
        });
    },
});

FlowRouter.route('/houses/add', {
    name: 'housesAdd',

    action() {
        ReactLayout.render(C.Layout, {
            content: <C.HousesAdd />,
        });
    }
})

FlowRouter.route('/houses/:_id', {
    name: 'housesDetails',

    action(params) {
        ReactLayout.render(C.Layout, {
            content: <C.HousesDetails houseId={params._id} />
        });
    },
});

FlowRouter.route('/houses/:_id/settings', {
    name: 'housesSettings',

    action(params) {
        ReactLayout.render(C.Layout, {
            content: <C.HousesSettings houseId={params._id} />
        });
    },
});
