'use strict';

db.charges.attachSchema(new SimpleSchema({
    user: { type: String },
    type: { type: String },
    transaction: { type: String },

    account: { type: String },
    amount: { type: Number },
    memo: { type: String },

    house: { type: String, optional: true },
    date: { type: String, optional: true },
    dateObj: { type: Date, optional: true },
}));
