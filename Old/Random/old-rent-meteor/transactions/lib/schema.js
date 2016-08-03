'use strict';

db.transactions.attachSchema(new SimpleSchema({
    // required fields
    type: { type: String },
    user: { type: String },


    // used by multiple transaction types
    _id: { type: String,  optional: true },
    customer: { type: String, optional: true },
    num: { type: Number, optional: true },
    memo: { type: String, optional: true },
    date: { type: String, optional: true },
    dateObj: { type: Date, optional: true },
    amount: { type: Number, optional: true },
    bankAccount: { type: String, optional: true },
    account: { type: String, optional: true },

    charges: { type: Array, minCount: 1, optional: true },
    'charges.$': { type: Object },
    'charges.$.account': { type: String },
    'charges.$.amount': { type: Number },
    'charges.$.memo': { type: String },
    'charges.$.house': { type: String },


    // payment specific
    method: { type: String, allowedValues: ['Cash', 'Check', 'Credit Card'], optional: true },
    deposited: { type: Boolean, optional: true },


    // check specific
    vendor: { type: String, optional: true },


    // deposit specific
    diff: { type: Number, optional: true },
    transactions: { type: [String], optional: true },
}));

var transactionsForm = new SimpleSchema({
    user: { type: String, optional: true },
    memo: { type: String },

    date: {
        type: String,
        defaultValue: app.getDate(),
        autoform: {
            afFieldInput: { class: 'pickdate' },
         },
    },

    customer: {
        type: String,
        autoform: {
            options: function() {
                var customers = [];

                db.customers.find({}, { fields: { firstName: 1, lastName: 1 } }).fetch().forEach(function(customer) {
                    customers.push({ value: customer._id, label: customer.firstName + ' ' + customer.lastName });
                });

                return customers;
            },
        },
    },

    num: {
        label: 'Number',
        type: Number,
        optional: true,
    },

    charges: {
        type: Array,
        minCount: 0,
    },

    'charges.$': {
        type: Object,
    },

    'charges.$.account': {
        type: String,
        autoform: {
            options: function() {
                var accounts = [];

                db.accounts.find({}, { fields: { name: 1 } }).fetch().forEach(function(account) {
                    accounts.push({ value: account._id, label: account.name, });
                });

                return accounts;
            },
            afFieldInput: { class: 'account' },
        },
    },

    'charges.$.amount': {
        type: Number,
        autoform: { afFieldInput: { class: 'amount' } },
    },

    'charges.$.memo': {
        type: String,
        autoform: { afFieldInput: { class: 'memo' } },
    },

    'charges.$.house': {
        type: String,

        autoform: {
            options: function() {
                var houses = [];

                db.houses.find({}, { fields: { address: 1 } }).fetch().forEach(function(house) {
                    houses.push({ value: house._id, label: house.address });
                });

                return houses;
            },
            afFieldInput: { class: 'house' },
        },
    },

    // payment specific
    method: {
        type: String,
        allowedValues: ['Cash', 'Check', 'Credit Card'],
        defaultValue: 'Cash',
    },

    amount: {
        type: Number,
    },

    // check specific
    bankAccount: {
        type: String,
        autoform: {
            options: function() {
                var banks = [];

                db.banks.find({}, { fields: { name: 1 } }).fetch().forEach(function(bank) {
                    banks.push({ value: bank._id, label: bank.name });
                });

                return banks;
            },
        },
    },

    vendor: {
        type: String,
        autoform: {
            options: function() {
                var vendors = [];

                db.vendors.find({}, { fields: { name: 1 } }).fetch().forEach(function(vendor) {
                    vendors.push({ value: vendor._id, label: vendor.name });
                });

                return vendors;
            }
        }
    },
});

app.paymentSchema = transactionsForm.pick([
    'customer', 'method', 'date', 'memo', 'amount',
]);

app.invoiceSchema = transactionsForm.pick([
    'customer', 'memo', 'date', 'num',
    'charges', 'charges.$', 'charges.$.account',
    'charges.$.amount', 'charges.$.memo', 'charges.$.house',
]);

app.checkSchema = transactionsForm.pick([
    'date', 'num', 'bankAccount', 'vendor', 'memo',
    'charges', 'charges.$', 'charges.$.account',
    'charges.$.amount', 'charges.$.memo', 'charges.$.house',
]);
