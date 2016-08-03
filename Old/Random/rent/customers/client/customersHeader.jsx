'use strict';

C.CustomersHeader = React.createClass({
    render() {
        return (
            <div>
                <h1 className='page-header'>Customers</h1>

                <ul className='header-nav nav nav-tabs'>
                    <C.Nav route='customers'>Customers List</C.Nav>
                    <C.Nav route='customersAdd'>Customers Add</C.Nav>
                </ul>
            </div>
        );
    }
});
