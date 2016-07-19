'use strict';

C.CustomersAdd = React.createClass({
    mixins: [ReactMeteorData],

    getMeteorData() {
        return {
            houses: db.houses.find({ isRented: false }).fetch(),
        }
    },

    getInitialState() {
        return {rent: '', deposit: ''};
    },

    renderHouses() {
        return this.data.houses.map(house => {
            return <C.Option key={house._id} value={house._id} label={house.address}/>
        });
    },

    changeHouse(event) {
        let house = this.data.houses.filter(obj => {
            return obj._id === event.target.value;
        })[0];

        if(house) {
            this.setState({ rent: house.rent, deposit: house.deposit });
        }

    },

    submit(doc, clear) {
        Meteor.call('customer', doc, err => {
            if(err) {
                throw err.reason;
            }

            clear();
        });
    },

    render() {
        let rentDays = [];
        for(var i = 4; i < 28; i++) {
            rentDays.push(<C.Option value={i + 'th'} key={i}/>);
        }

        return (
            <div>
                <C.CustomersHeader />

                <div className='panel panel-default'>
                    <div className='panel-heading'>
                        <div className='panel-title'>Add Customer</div>
                    </div>

                    <div className='panel-body'>
                        <C.Form onSuccess={this.submit}>
                            <C.Input type='string' inputName='firstName' />
                            <C.Input type='string' inputName='lastName' />
                            <C.Input type='string' inputName='phone' />

                            <C.Select inputName='rentDay' type='number'>
                                <C.Option value='1st' />
                                <C.Option value='2nd' />
                                <C.Option value='3rd' />
                                {rentDays}
                            </C.Select>

                            <C.Select inputName='houseId' label='House' onChange={this.changeHouse}>
                                {this.renderHouses()}
                            </C.Select>

                            <C.Input inputName='rent' type='money' value={this.state.rent}/>
                            <C.Input inputName='deposit' type='money' value={this.state.deposit}/>

                            <C.SubmitButton />
                        </C.Form>
                    </div>
                </div>
            </div>
        );
    }
});
