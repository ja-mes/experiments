'use strict';

db.houses.attachSchema(new SimpleSchema({
	user: {
		type: String,
		optional: true,
		autoform: { omit: true },
	},
	address: {
		type: String,
	},
	deposit: {
		type: Number,
		label: 'Deposit amount'
	},
	rent: {
		type: Number,
		label: 'Rent amount',
	},
	isRented: {
		type: Boolean,
		optional: true,
	},
}));
