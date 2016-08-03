'use strict';

Router.route('houses', {
	name: 'houses',
});

Router.route('houses/add', {
	name: 'housesAdd',
});

Router.route('houses/:_id', {
	name: 'housesHome',

	yieldTemplates: {
		'housesPageHeader': { to: 'header' },
	},

	data: function() {
		return db.houses.findOne(this.params._id);
	},

	subscriptions: function() {
		return Meteor.subscribe('housesDateRange', Session.get('daterange.from'), Session.get('daterange.to'), this.params._id);
	},
});

Router.route('houses/:_id/details', {
    name: 'housesDetails',
    yieldTemplates: {
        'housesPageHeader': { to: 'header' },
    },

    data: function() {
        return db.houses.findOne(this.params._id);
    }
});

Router.route('houses/:_id/todos', {
    name: 'housesTodos',
    yieldTemplates: {
        'housesPageHeader': { to: 'header' },
    },

    data: function() {
        return db.houses.findOne(this.params._id);
    }
});
