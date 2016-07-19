'use strict';

function addPayment(customer, id) {
	SyncedCron.add({
		name: 'Charge rent to ' + id,

		schedule: function(parser) {
			return parser.recur().on(customer.rentDay).dayOfMonth();
		},

		job: function () {
			var doc = {
				customer: id,
				memo: 'Rent',
				date: app.getDate(),
				charges: [{
					account: db.accounts.findOne({ name: 'Rental Income' }, { fields: { _id : 1 } })._id,
					amount: customer.rent,
					memo: 'Rent',
					house: db.houses.findOne({ address: customer.house })._id,
				}],
			};

			Meteor.call('invoice', doc);
		}
	});
}

db.customers.find().observe({
	added: function (customer) {
		addPayment(customer, customer._id);
	}
});
