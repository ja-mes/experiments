'use strict';

Router.configure({
	layoutTemplate: 'layout',
    notFoundTemplate: 'notFound',
	loadingTemplate: 'loading',
});

Router.route('/', {
	name: 'dashboard',
});
