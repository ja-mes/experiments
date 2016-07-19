'use strict';

function createSchedule(form) {
    var schedule;
    var period = form.period.value;

    if(period === 'Monthly') {
        var numMonths = form.numMonths.value;
        var dayOfMonth = form.dayOfMonth.value;

        if(dayOfMonth !== 'Last') {
            dayOfMonth = parseInt(dayOfMonth);
        }

        schedule = 'every ' + numMonths + ' months on the ' + dayOfMonth + ' day of the month';
        // schedule = 'every 3 seconds';
    }
    else if(period === 'Daily') {
        var numDays = form.numDays.value;

        schedule = 'every ' + numDays + ' days';
    }
    else if(period === 'Weekly') {
        var numWeeks = form.numWeeks.value;
        var dayOfWeek = form.dayOfWeek.value;

        schedule = 'every ' + numWeeks + ' weeks on ' + dayOfWeek;
    }
    else if(period === 'Yearly') {
        var yearMonth = form.yearMonth.value;
        var yearMonthDay = form.yearMonthDay.value;

        if(yearMonthDay !== 'Last') {
            yearMonthDay = parseInt(yearMonthDay);
        }

        schedule = 'on the ' + yearMonthDay + ' day of ' + yearMonth;
    }

    return schedule;
}

function saveRecurrInvoice(data) {
    var form = $('#createInvoice')[0];

    var parentData = Template.parentData(2);

    var doc = {
        customer: parentData.type === 'Invoice' ? parentData.customer : parentData._id,
        memo: form.memo.value,
        date: form.date.value,
        schedule: createSchedule(event.target),
        name: event.target.recurrName.value,
        charges: [],
    };

    $('.account').each(function(i) {
        doc.charges.push({
            account: $(this).val(),
            amount: +$('.amount')[i].value,
            memo: $('.memo')[i].value,
            house: $('.house')[i].value,
        });
    });

    Meteor.call('addMemInvoice', doc, function(error) {
        if(error) {
            throw error.reason;
        }

        $('#recurr').modal('hide');
    });
}

function saveRecurrCheck() {
    var form = $('#createCheck')[0];

    var doc = {
        vendor: form.vendor.value,
        memo: form.memo.value,
        num: +form.num.value,
        bankAccount: form.bankAccount.value,
        schedule: createSchedule(event.target),
        name: event.target.recurrName.value,
        date: form.date.value,
        charges: [],
    };

    $('.account').each(function(i) {
        doc.charges.push({
            account: $(this).val(),
            amount: +$('.amount')[i].value,
            memo: $('.memo')[i].value,
            house: $('.house')[i].value,
        });
    });

    Meteor.call('addMemCheck', doc, function(error) {
        if(error) {
            throw error.reason;
        }

        $('#recurr').modal('hide');
    });
}

Template.recurrModal.rendered = function() {
    $('.daily').hide();
    $('.weekly').hide();
    $('.yearly').hide();
};

Template.recurrModal.events({
    'submit #recurrDetails': function(event) {
        event.preventDefault();

        if(this.type === 'invoice') {
            var invoiceData = Template.parentData(1);
            saveRecurrInvoice(invoiceData);
        }
        else if(this.type === 'check') {
            saveRecurrCheck();
        }
        else if(this.editing) {
            var data = Session.get('recurr.editing');
            var schedule = createSchedule(event.target);
            var name = event.target.recurrName.value;

            Meteor.call('updateMemTxn', data._id, schedule, name, function(error) {
                if(error) {
                    return console.log(error.reason);
                }

                $('#recurr').modal('hide');
            });
        }
    },

    'change form select[name="period"]': function(event) {
        var period = event.target.value;

        if(period === 'Daily') {
            $('.monthly, .weekly, .yearly').hide();
            $('.daily').show();
        }
        else if(period === 'Monthly') {
            $('.daily, .weekly, .yearly').hide();
            $('.monthly').show();
        }
        else if(period === 'Weekly') {
            $('.daily, .monthly, .yearly').hide();
            $('.weekly').show();
        }
        else if(period === 'Yearly') {
            $('.daily, .weekly, .monthly').hide();
            $('.yearly').show();
        }
    },
});
