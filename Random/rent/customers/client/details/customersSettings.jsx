'use strict';

C.CustomersSettings = React.createClass({
    mixins: [ReactMeteorData],

    getMeteorData() {
        return {
            customer: db.customers.findOne(this.props.customerId),
            houses: db.houses.find({
                $or: [{isRented: false}, {customerId: this.props.customerId}]
            }).fetch(),
        }
    },

    submit(doc, clear) {
        doc.currentHouse = this.data.customer.houseId;
        Meteor.call('customer', doc, this.data.customer._id, err => {
            if(err) {
                throw err;
            }
        });
    },

    renderHouses() {
        return this.data.houses.map(house => {
            return <C.Option key={house._id} value={house._id} label={house.address}/>
        });
    },

    render() {
        if(!this.data.customer) {
            return <C.Loading />;
        }

        let rentDays = [];
        for(var i = 4; i < 28; i++) {
            rentDays.push(<C.Option value={i} label={i + 'th'} key={i}/>);
        }

        return (
            <div>
                <C.CustomersDetailsHeader customer={this.data.customer} />

                <C.Form onSuccess={this.submit}>
                    <div className='row'>
                        <div className='col-md-6'>
                            <C.Input type='string' inputName='firstName' value={this.data.customer.firstName} />

                            <C.Select inputName='houseId' label='House' value={this.data.customer.houseId}>
                                {this.renderHouses()}
                            </C.Select>

                            <C.Input type='string' inputName='phone' value={this.data.customer.phone} />
                        </div>

                        <div className='col-md-6'>
                            <C.Input type='string' inputName='lastName' value={this.data.customer.lastName} />
                            <C.Select inputName='rentDay' type='number' value={this.data.customer.rentDay}>
                                <C.Option value='1' label='1st'/>
                                <C.Option value='2' label='2nd'/>
                                <C.Option value='3' label='3rd'/>
                                {rentDays}
                            </C.Select>

                            <C.Input type='money' inputName='rent' label='Rent Amount' value={this.data.customer.rent} />
                        </div>
                    </div>

                    <C.SubmitButton />
                </C.Form>
            </div>
        );
    },
});
