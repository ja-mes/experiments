'use strict';

Meteor.startup(function () {
    sAlert.config({
        effect: 'stackslide',
        position: 'top-right',
        timeout: 5000,
        html: true,
        onRouteClose: true,
        stack: true,
        offset: 20,
    });
});
