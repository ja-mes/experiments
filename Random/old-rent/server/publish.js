'use strict';

Meteor.publish('houses', function () {
	if(this.userId) {
		return db.houses.find({ user: this.userId });
	}
});

Meteor.publish('customers', function () {
	if(this.userId) {
		return db.customers.find({ user: this.userId });
	}
});

Meteor.publish('accounts', function () {
	if(this.userId) {
		return db.accounts.find({ user: this.userId });
	}
});

Meteor.publish('transactions', function(doc) {
	doc = doc || {};

	if(this.userId) {
		_.extend(doc, { user: this.userId });
		return db.transactions.find(doc);
	}
});

Meteor.publish('transaction', function(id) {
	check(id, String);

	if(this.userId) {
		return db.transactions.find({ user: this.userId, _id: id });
	}
});

Meteor.publish('customerDateRange', function(from, to, customer) {
	if(this.userId) {
		return db.transactions.find({
			user: this.userId,
			date: { '$gte': from, '$lte': to },
			customer: customer,
		});
	}
});

Meteor.publish('accountsDateRange', function(from, to, account) {
	check(to, String);
	check(from, String);

	if(this.userId) {
		return db.charges.find({
			user: this.userId,
			date: { '$gte': from, '$lte': to },
			account: account,
		});
	}
});

Meteor.publish('housesDateRange', function(from, to, house) {
	check(from, String);
	check(to, String);

	if(this.userId) {
		return db.charges.find({
			user: this.userId,
			date: { '$gte': from, '$lte': to },
			house: house,
		});
	}
});

Meteor.publish('vendorsDateRange', function(from, to, vendor) {
	check(from, String);
	check(to, String);
	check(vendor, String);

	if(this.userId) {
		return db.transactions.find({
			user: this.userId,
			date: { '$gte': from, '$lte': to },
			vendor: vendor,
		});
	}
});

Meteor.publish('transactionsDateRange', function(from, to, bankAccount) {
	check(from, String);
	check(to, String);
	check(bankAccount, String);

	if(this.userId) {
		return db.transactions.find({
			user: this.userId,
			date: { '$gte': from, '$lte': to },
			bankAccount: bankAccount,
		});
	}
});
Meteor.publish('vendors', function () {
	if(this.userId) {
		return db.vendors.find({ user: this.userId });
	}
});

Meteor.publish('banks', function() {
	if(this.userId) {
		return db.banks.find({ user: this.userId });
	}
});

Meteor.publish('memtxn', function() {
	if(this.userId) {
		return db.recurr.find({ user: this.userId });
	}
});
