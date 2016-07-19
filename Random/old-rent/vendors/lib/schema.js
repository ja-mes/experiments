'use strict';

app.schemas.vendorsAdd = new SimpleSchema({
    name: { type: String }
});

db.vendors.attachSchema([app.schemas.vendorsAdd, {
    user: { type: String },
}]);
