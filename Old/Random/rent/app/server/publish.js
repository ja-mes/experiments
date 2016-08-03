'use stict';

Meteor.publish('houses', function() {
    if(this.userId) {
        return db.houses.find({ user: this.userId });
    }
});

Meteor.publish('customers', function() {
    if(this.userId) {
        return db.customers.find({ user: this.userId });
    }
});

Meteor.publish('customerTransactions', function(customer, from, to) {
    if(this.userId) {
        return db.transactions.find({
            user: this.userId,
            customer: customer,
            date: { '$gte': from, '$lte': to },
        });
    }
});

Meteor.publish('transaction', function(id) {
	check(id, String);

	if(this.userId) {
		return db.transactions.find({ user: this.userId, _id: id });
	}
});
