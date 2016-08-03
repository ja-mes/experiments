'use strict';

app.customersFormSchema = new SimpleSchema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    phone: {
        type: String,
    },
    rentDay: {
        label: 'Rent due on',
        type: Number,
        autoform: {
            options: function() {
                var days = [{ label: '1st', value: 1 }, { label: '2nd', value: 2 }, { label: '3rd', value: 3 }];
                for (var i = 4; i <= 28; i++) {
                    days.push({ label: i + 'th', value: i });
                }
                return days;
            },
            afFieldInput: {
                value: function() { return 1; },
            },
        }
    },
    house: {
        type: String,
        autoform: {
            options: function() {
                var houses = [];

                db.houses.find({ isRented: false }).fetch().forEach(function(house) {
                    houses.push({
                        label: house.address,
                        value: house.address,
                    });
                });

                return houses;
            }
        }
    },
    rent: {
        type: Number,
        autoform: {
            afFieldInput: {
                value: function() {
                    if(Meteor.isClient) { return Session.get('add-customers-rent'); }
                },
            },
        }
    },
    deposit: {
        type: Number,
        label: 'Security Deposit Amount',
        autoform: {
            afFieldInput: {
                value: function() {
                    if(Meteor.isClient) { return Session.get('add-customers-deposit'); }
                },
            },
        },
    },

    lateFee: { type: Object, optional: true, label: 'Late Fees' },
    'lateFee.amount': { type: Number },
    'lateFee.gracePeriod': {
        type: String,
        autoform: {
            options: function() {
                var arr = [];
                for(var i = 0; i < 60; i++) {
                    arr.push({ value: i + 1, label: (i + 1) + ' days' });
                }

                return arr;
            }
        },
     },

});

db.customers.attachSchema(new SimpleSchema([app.customersFormSchema, {
    user: { type: String },
    balance: { type: Number },
    active: { type: Boolean },

    notes: { type: Array },
    'notes.$': { type: Object },
    'notes.$.id': { type: String, optional: true },
    'notes.$.date': { type: String },
    'notes.$.note': { type: String },
}]));

app.schemas.addCustomerNoteForm = new SimpleSchema({
    date: {
        type: String,
        autoform: { afFieldInput: { class: 'pickdate' } },
    },
    note: { type: String },
});
