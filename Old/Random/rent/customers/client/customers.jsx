'use strict';

C.Customers = React.createClass({
    mixins: [ReactMeteorData],

    getMeteorData() {
        return {
            customers: db.customers.find().fetch(),
        }
    },

    getInitialState() {
        return {
            searchTerm: '',
        }
    },

    go(id) {
        FlowRouter.go('customersDetails', {_id: id});
    },

    renderCustomers() {
        return this.data.customers.map(customer => {
            return (
                <tr key={customer._id} onClick={this.go.bind(this, customer._id)}>
                    <td>{customer.fullName}</td>
                    <td>{customer.address}</td>
                    <td>{'$' + customer.balance}</td>
                    <td>{'$' + customer.rent}</td>
                </tr>
            );
        });
    },

    render() {
        return (
            <div>
                <C.CustomersHeader />

                <div className='panel panel-default'>
                    <div className='panel-heading'>
                        <form className='form-inline'>
                            <div className='form-group'>
                                <input className='form-control' type='text' placeholder='Search...' />
                            </div>

                            <div className='form-group pull-right'>
                                <select className='form-control input-sm'>
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                    <option value="All">All</option>
                                </select>
                            </div>
                        </form>
                    </div>

                    <div className='panel-body'>
                        <table className='table table-hover'>
                            <thead>
                    			<tr>
                    				<th>Name</th>
                    				<th>Address</th>
                    				<th>Balance</th>
                    				<th>Rent Amount</th>
                    			</tr>
                            </thead>

                            <tbody>
                                {this.renderCustomers()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
});
