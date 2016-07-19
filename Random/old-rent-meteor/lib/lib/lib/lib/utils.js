'use strict';

String.prototype.capFirst = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

Date.prototype.format = function() {
    var month = this.getMonth() + 1 < 10 ? '0' + (this.getMonth() + 1) : this.getMonth() + 1;
    var day = this.getDate() < 10 ? '0' + this.getDate() : this.getDate();

	return month + '/' + day + '/' +  this.getFullYear();
};

// This only works for numbers with two decimal places
app.addCurrency = function(num1, num2) {
	return Math.round((num1 * 100 + num2 * 100)) / 100;
};
app.getDate = function() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd='0'+dd;
    }

    if(mm<10) {
        mm='0'+mm;
    }

    today = mm+'/'+dd+'/'+yyyy;
	// today = yyyy+'-'+mm+'-'+dd;

    return today;
};
