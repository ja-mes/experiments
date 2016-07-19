'use strict';

db.houses.attachSchema(new SimpleSchema({
    // _id: {type: String},
    user: {type: String},
    address: {type: String},
    rent: {type: String},
    deposit: {type: String},
    isRented: {type: Boolean},

    customerId: {type: String, optional: true},
}));
