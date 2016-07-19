'use strict';

C.HousesSettings = React.createClass({
    mixins: [ReactMeteorData],

    getMeteorData() {
        return {
            house: db.houses.findOne(this.props.houseId),
        }
    },

    submit(doc, clear) {
        Meteor.call('housesUpdate', doc, this.data.house, err => {
            if(err) {
                throw err.reason;
            }
        });
    },

    render() {
        if(!this.data.house) {
            return <C.Loading />
        }

        return (
            <div>
                <C.HousesDetailsHeader house={this.data.house} />

                <C.Form onSuccess={this.submit}>
                    <C.Input type="string" inputName="address" value={this.data.house.address} />
                    <C.Input type="money" inputName="deposit" value={this.data.house.deposit} />
                    <C.Input type="money" inputName="rent" value={this.data.house.rent} />
                    <C.SubmitButton />
                </C.Form>
            </div>
        );
    }
});
