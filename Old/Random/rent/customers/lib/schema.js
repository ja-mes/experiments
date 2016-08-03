'use strict';

db.customers.attachSchema(new SimpleSchema({
    firstName: { type: String },
    lastName: { type: String },
    fullName: { type: String },

    phone: { type: String },
    rentDay: { type: Number },
    houseId: { type: String },
    address: { type: String },
    rent: { type: Number },
    deposit: { type: Number },

    user: { type: String },
    balance: { type: Number },
    active: { type: Boolean },
}));
