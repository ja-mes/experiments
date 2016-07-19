'use strict';

C.Houses = React.createClass({
    mixins: [ReactMeteorData],

    getMeteorData() {
        return {
            houses: db.houses.find({
                address: { $regex: this.state.searchTerm, $options: 'i' },
            }).fetch(),
        }
    },

    getInitialState() {
        return {
            searchTerm: '',
        }
    },

    renderHouses() {
        return this.data.houses.map(house => {
            let labelAttr = `pull-right label label-${house.isRented ? 'primary' : 'success'}`;
            let labelName = house.isRented ? 'Rented' : 'Vacant';

            return (
                <tr key={house._id} onClick={this.go.bind(this, house._id)}>
                    <td>{house.address}</td>

                    <td>
                        <span className={labelAttr}>{labelName}</span>
                    </td>
                </tr>
            );
        });
    },

    go(id) {
        FlowRouter.go('housesDetails', { _id: id });
    },

    search(event) {
        this.setState({ searchTerm: event.target.value });
    },

    render() {
        return (
            <div>
                <C.HousesHeader />

                <div className='panel panel-default'>
                    <div className='panel-heading'>
                        <form className='form-inline'>
                            <div className='form-group'>
                                <input className='form-control' type='text' placeholder='Search...' value={this.state.searchTerm} onChange={this.search}/>
                            </div>
                        </form>
                    </div>

                    <div className='panel-body'>
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>Address</th>
                                </tr>
                            </thead>

                            <tbody>
                                {this.renderHouses()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
});
