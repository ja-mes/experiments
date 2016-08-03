'use strict';

Template.housesTodos.events({
	'submit #addNewTodo': function (event) {
		var currentPostId = this._id,
			val = event.target.todoName.value;

		event.preventDefault();
		Meteor.call('addNewHouseTodo', currentPostId, val);
		event.target.todoName.value = '';
	},
});
