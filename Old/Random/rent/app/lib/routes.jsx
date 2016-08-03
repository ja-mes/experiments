'use strict';

FlowRouter.route('/', {
    name: 'dashboard',

    action() {
        ReactLayout.render(C.Layout);
    },
});

FlowRouter.route('/login', {
    name: 'login',

    action() {
        ReactLayout.render(C.Layout, {
            content: <C.Login />,
            sidebar: false,
        });
    }
});

function verifyLogin(context, redirect) {
    if(!Meteor.userId()) {
        redirect('/login');
    }
}

FlowRouter.triggers.enter([verifyLogin], {except: ['login']});
