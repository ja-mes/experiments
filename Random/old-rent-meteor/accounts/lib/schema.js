'use strict';

app.schemas.addAccountForm = new SimpleSchema({
    name: { type: String },
});

db.accounts.attachSchema([app.schemas.addAccountForm, {
    user: { type: String },
}]);
