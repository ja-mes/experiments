'use strict';

app.setupDateRange = function() {
    Session.set('daterange.to', app.getDate());

    var date = new Date();
    Session.set('daterange.from', new Date(date.getFullYear(), date.getMonth(), 1).format());
};

Template.daterange.helpers({
    to: function() {
        return app.getDate();
    },

    from: function() {
        var date = new Date();
        return new Date(date.getFullYear(), date.getMonth(), 1).format();
    },
});

Template.daterange.events({
	'change #to': function(event) {
		Session.set('daterange.to', event.target.value);
	},

	'change #from': function(event) {
		Session.set('daterange.from', event.target.value);
	},
});
