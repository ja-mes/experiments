'use strict';

C.Invoice = React.createClass({
    mixins: [ReactMeteorData],

    propTypes: {
        customerId: React.PropTypes.string,
        invoiceId: React.PropTypes.string,
    },

    getMeteorData() {
        let doc = {
            customers: db.customers.find().fetch(),
            customer: this.props.customerId ? db.customers.findOne(this.props.customerId, {fields: {fullName: 1}}) : {},
            invoice: {},
        };

        if(this.props.invoiceId) {
            Meteor.subscribe('transaction', this.props.invoiceId);
            doc.invoice = db.transactions.findOne();
        }

        return doc;
    },

    renderCustomers() {
        return this.data.customers.map(customer => {
            return <C.Option key={customer._id} value={customer._id} label={customer.fullName} />
        });
    },

    handleDelete(event)  {
        Meteor.call('deleteTransaction', this.data.invoice, err => {
            if(err) {
                throw err.reason;
            }

            FlowRouter.go('customersDetails', {_id: this.props.customerId});
        });
    },

    submit(doc, clear) {
        console.log(doc);
        let callBack = err => {
            if(err) {
                throw err;
            }

            !this.props.invoiceId && clear();
        }

        if(this.props.invoiceId) {
            Meteor.call('invoice', doc, this.props.invoiceId, callBack);
        }
        else {
            Meteor.call('invoice', doc, callBack);
        }
    },

    render() {
        if(!this.data.customer || !this.data.invoice) {
            return <C.Loading />
        }

        let editing = !!this.props.invoiceId;

        return (
            <div>
                <h1 className='page-header'>Create Invoice</h1>

                <C.Form onSuccess={this.submit}>
                    <div className='row'>
                        <div className='col-md-6'>
                            <C.Select inputName='customer' value={this.data.customer._id}>
                                {this.renderCustomers()}
                            </C.Select>

                            <C.Input inputName='memo' type='string' value={this.data.invoice.memo}/>
                        </div>

                        <div className='col-md-6'>
                            <C.Input inputName='date' type='string' value={this.data.invoice.date}/>
                            <C.Input inputName='num' label='Number' type='number' value={this.data.invoice.num}/>
                        </div>
                    </div>

                    <C.FormObject inputName='charges' label='Charges' initialData={this.data.invoice.charges}>
                        <C.Select inputName='account'>
                            <C.Option value='foo' />
                            <C.Option value='bar' />
                            <C.Option value='qux' />
                        </C.Select>

                        <C.Input inputName='amount' type='money' />
                        <C.Input inputName='memo' />

                        <C.Select inputName='house'>
                            <C.Option value='foo' />
                            <C.Option value='bar' />
                            <C.Option value='qux' />
                        </C.Select>

                    </C.FormObject>

                    <h4></h4>
                    {/*<h4 style={{display: 'inline'}}><small>Total: </small></h4>*/}

                    {editing ?
                        <C.DeleteButton align='right' onClick={this.handleDelete} />
                    : <div></div>}
                    <C.SubmitButton align='right' />
                    <C.BackButton align='right' />
                </C.Form>
            </div>
        );
    }
})
