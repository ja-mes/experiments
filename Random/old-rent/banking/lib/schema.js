'use strict';

app.schemas.addBankForm = new SimpleSchema({
    name: {
        type: String,
    },
});

db.banks.attachSchema([app.schemas.addBankForm, {
    user: { type: String },
    balance: { type: Number },
}]);
