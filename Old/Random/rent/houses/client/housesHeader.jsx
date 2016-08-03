'use strict';

C.HousesHeader = React.createClass({
    render() {
        return (
            <div>
                <h1 className="page-header">Houses</h1>

                <ul className='header-nav nav nav-tabs'>
                    <C.Nav route='houses'>Houses List</C.Nav>
                    <C.Nav route='housesAdd'>Add House</C.Nav>
                </ul>
            </div>
        );
    },
});
