'use strict';

C.CustomersDetails = React.createClass({
    mixins: [ReactMeteorData],

    getMeteorData() {
        console.log(this.state.fromDate, this.state.toDate);
        let trnsSub = Meteor.subscribe('customerTransactions', this.props.customerId, this.state.fromDate, this.state.toDate);

        return {
            customer: db.customers.findOne(this.props.customerId),
            transactions: db.transactions.find({}, {sort: {date: -1}}).fetch(),
            transactionsLoading: !trnsSub.ready(),
        }
    },

    getInitialState() {
        let date = new Date();

        return {
            toDate: new Date(date.getFullYear(), date.getMonth() + 1, 0).format(),
            fromDate: new Date().format(),
        };
    },

    goToTrns(id, type) {
        if(type === 'Invoice') {
            FlowRouter.go('editInvoice', {
                customerId: this.props.customerId,
                _id: id,
            });
        }
        else if(type === 'Payment') {
            FlowRouter.go('editPayment', {
                customerId: this.props.customerId,
                _id: id,
            });
        }
    },

    changeFrom(event) {
        console.log(event);
    },

    changeTo(event) {
        console.log(event);
    },

    renderTransactions() {
        return this.data.transactions.map(transaction => {
            return (
                <tr key={transaction._id} onClick={this.goToTrns.bind(this, transaction._id, transaction.type)}>
                    <td>{transaction.type}</td>
                    <td>{'$' + transaction.amount.toFixed(2)}</td>
                    <td>{transaction.memo}</td>
                    <td>{transaction.date}</td>
                </tr>
            );
        });
    },

    render() {
        if(!this.data.customer || this.data.transactionsLoading) {
            return <C.Loading />;
        }

        return (
            <div>
                <C.CustomersDetailsHeader customer={this.data.customer}/>

                <div className='panel panel-default'>
                    <div className='panel-heading'>
                        <C.DateRange from={this.state.fromDate} to={this.state.toDate} changeTo={this.changeTo} changeFrom={this.changeFrom }/>
                    </div>

                    <div className='panel-body'>
                        <table className='table table-hover'>
                            <thead>
                                <tr>
                                    <th>Type</th>
                                    <th>Amount</th>
                                    <th>Memo</th>
                                    <th>Date</th>
                                </tr>
                            </thead>

                            <tbody>
                                {this.renderTransactions()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
});
