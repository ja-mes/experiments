'use strict';

Template.memtxn.helpers({
    transaction: function() {
        return db.recurr.find();
    },

    amount: function() {
        if(this.amount) {
            return '$' + this.amount.toFixed(2);
        }
    },
});

Template.memtxn.events({
    'click #edit': function(event) {
        $('#recurr').modal('show');
        Session.set('recurr.editing', this);

        var form = $('#recurrDetails')[0];
        var schedule = this.schedule;

        form.recurrName.value = this.name;

        if(schedule.search(/month/) !== -1) {
            form.period.value = 'Monthly';
            $('select[name=period]').change();

            var days = schedule.match(/(\d+)/g);

            form.numMonths.value = days[0];
            form.dayOfMonth.value = days[1];
        }
        else if(schedule.search(/weeks/) !== -1) {
            form.period.value = 'Weekly';
            $('select[name=period]').change();

            var numWeeks = schedule.match(/(\d+)/g)[0];
            form.numWeeks.value = numWeeks;

            var weekDays = /Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday/;
            var dayOfWeek = schedule.match(weekDays)[0];
            form.dayOfWeek.value = dayOfWeek;
        }
        else if(schedule.search(/days/) !== -1) {
            form.period.value = 'Daily';
            $('select[name=period]').change();

            var day = schedule.match(/(\d+)/g)[0];
            form.numDays.value = day;
        }
        else {
            form.period.value = 'Yearly';
            $('select[name=period]').change();

            var monthsOfYear = /January|Febuary|March|April|May|June|July|August|September|October|November|December/;
            var monthOfYear = schedule.match(monthsOfYear)[0];
            form.yearMonth.value = monthOfYear;

            var yearMonthDay = schedule.match(/(\d+)/g)[0];
            yearMonthDay = 10;
            form.yearMonthDay.value = yearMonthDay;
        }
    },

    'click .use': function(event) {
        event.preventDefault();

        if(this.type === 'Invoice') {
            Router.go('editRecurrInvoice', { _id: this.customer, trnsId: this._id });
        }
        else if(this.type === 'Check') {
            Router.go('editRecurrCheck', { _id: this._id });
        }
    },

    'click .delete': function() {
        Meteor.call('deleteMemTxn', this._id);
    }
});
