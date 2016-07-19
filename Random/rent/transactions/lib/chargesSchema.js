'use strict';

db.charges.attachSchema(new SimpleSchema({
    user: {type: String},
    type: {type: String},
    transaction: {type: String},
    date: {type: String},

    account: {type: String},
    amount: {type: String},
    memo: {type: String},
    house: {type: String},
}));
