'use strict';

C.CustomersDetailsHeader = React.createClass({
    propTypes: {
        customer: React.PropTypes.object.isRequired,
    },

    getColor() {
        return this.props.customer.balance > 0 ? 'red' : 'green';
    },

    getGlyphicon() {
        return this.props.customer.balance > 0 ? 'glyphicon glyphicon-exclamation-sign' : 'glyphicon glyphicon-ok';
    },

    render() {
        if(!this.props.customer) {
            return <C.Loading />
        }

        let params = {routeParams: {_id: this.props.customer._id}};

        let h1Style = {
            color: this.getColor(),
            display: 'inline',
            marginLeft: '30px',
        };

        return (
            <div>
                <div className='row'>
                    <div className='col-md-9'>
                        <h1 className='page-header' style={{borderBottom: 'none', display: 'inline'}}>
                            {this.props.customer.fullName + ' '}
                            <small> {this.props.customer.address}</small>
                        </h1>

                        <h3 style={h1Style}>
                            <span className={this.getGlyphicon()}></span> {'$'+this.props.customer.balance.toFixed(2)}
                        </h3>
                    </div>

                    <div className='col-md-3' style={{textAlign: 'right'}}>
                        <div className="btn-group">
                        <button type="button" className="btn btn-primary dropdown-toggle pull-right" data-toggle="dropdown">
                            New Transaction <span className="caret"></span>
                        </button>

                        <ul className="dropdown-menu pull-left dropdown-menu-left">
                            <li><a href={FlowRouter.path('payment', {customerId: this.props.customer._id})} className="trns">Payment</a></li>
                            <li>
                                <a href={FlowRouter.path('invoice', {customerId: this.props.customer._id})} className="trns">Invoice</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <hr />

            <ul className='header-nav nav nav-tabs'>
                <C.Nav {...params} route='customersDetails'>Transactions List</C.Nav>
                <C.Nav {...params} route='customersSettings'>Customer Settings</C.Nav>
            </ul>
        </div>
    );
}
});
