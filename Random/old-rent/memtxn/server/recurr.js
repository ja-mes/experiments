'use strict';

function setNextDate(transaction) {
    var nextDate = SyncedCron.nextScheduledAtDate('MemTxn ' + transaction._id).toString().slice(0, -24);

    db.recurr.update(transaction._id, {
        $set: {
            nextDate: nextDate,
        }
    });
}

function createInvoice(doc) {
    delete doc._id;
    delete doc.name;
    delete doc.schedule;
    delete doc.nextDate;
    delete doc.date;

    _.extend(doc, { date: app.getDate() });
    var id = db.transactions.insert(doc);

    doc.charges.forEach(function(charge) {
        _.extend(charge, { type: 'Invoice', transaction: id, date: app.getDate(), user: doc.user });
        db.charges.insert(charge);
    });
}

function createCheck(doc) {
    delete doc._id;
    delete doc.name;
    delete doc.schedule;
    delete doc.nextDate;

    _.extend(doc, { date: app.getDate() });
    var id = db.transactions.insert(doc);

    doc.charges.forEach(function(charge) {
        _.extend(charge, { type: 'Check', transaction: id, user: doc.user, date: app.getDate() });
        db.charges.insert(charge);
    });
}

function addMemTxn(transaction) {
    SyncedCron.add({
        name: 'MemTxn ' + transaction._id,

        schedule: function(parser) {
            return parser.text(transaction.schedule);
        },

        job: function() {
            if(transaction.type === 'Invoice') {
                createInvoice(transaction);
            }
            else if(transaction.type === 'Check') {
                createCheck(transaction);
            }
        }
    });
}

db.recurr.find().observe({
    added: function(transaction) {
        addMemTxn(transaction);

        setNextDate(transaction);
    },

    changed: function(transaction, oldTransaction) {
        if(oldTransaction.schedule !== transaction.schedule){
            SyncedCron.remove('MemTxn ' + transaction._id);
            addMemTxn(transaction);

            setNextDate(transaction);
        }
    }
});
