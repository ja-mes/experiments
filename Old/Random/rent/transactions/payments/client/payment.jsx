'use strict';

C.Payment = React.createClass({
    propTypes: {
        customerId: React.PropTypes.string,
        paymentId: React.PropTypes.string,
    },

    mixins: [ReactMeteorData],

    getMeteorData() {
        let doc = {
            customers: db.customers.find().fetch(),
            payment: {},
        };

        if(this.props.paymentId) {
            Meteor.subscribe('transaction', this.props.paymentId);
            doc.payment = db.transactions.findOne();
        }

        return doc;
    },

    renderCustomers() {
        return this.data.customers.map(customer => {
            return <C.Option key={customer._id} value={customer._id} label={customer.fullName} />
        });
    },

    handleSubmit(doc, clear) {
        let callback = (err) => {
            if(err) {
                throw err.reason;
            }

            if(!this.props.paymentId) {
                clear();
            }
        }

        if(this.props.paymentId) {
            Meteor.call('payment', doc, this.props.paymentId, callback);
        }
        else {
            Meteor.call('payment', doc, callback);
        }
    },

    handleDelete(event) {
        Meteor.call('deleteTransaction', this.data.payment, err => {
            if(err) {
                throw err.reason;
            }

            FlowRouter.go('customersDetails', {_id: this.props.customerId});
        });
    },

    render() {
        let editing = !!this.props.paymentId;

        if(editing && !this.data.payment) {
            return <C.Loading />
        }

        return (
            <div>
                <h1 className='page-heading'>Receive Payment</h1>

                <C.Form onSuccess={this.handleSubmit}>
                    <C.Select inputName='customer' value={this.props.customerId}>
                        {this.renderCustomers()}
                    </C.Select>

                    <C.Select inputName='method' value={this.data.payment.method || 'Cash'}>
                        <C.Option value='Cash' />
                        <C.Option value='Check' />
                        <C.Option value='Credit Card' />
                    </C.Select>

                    <C.Input inputName='date' value={this.data.payment.date}/>
                    <C.Input inputName='memo' value={this.data.payment.memo}/>
                    <C.Input inputName='amount' type='money' value={this.data.payment.amount} />

                    <C.BackButton />
                    <C.SubmitButton />
                    {editing ?
                        <C.DeleteButton onClick={this.handleDelete} />
                    : <div></div>}
                </C.Form>
            </div>
        );
    }
})
