'use strict';

C.HousesDetailsHeader = React.createClass({
    propTypes: {
        house: React.PropTypes.object.isRequired,
    },

    render() {
        if(!this.props.house) {
            return <C.Loading />;
        }

        let id = { _id: this.props.house._id };

        return (
            <div>
                <h1 className="page-header">{this.props.house.address}</h1>

                <ul className="header-nav nav nav-tabs">
                    <li className={A.isActiveRoute('housesDetails')}>
                        <a href={FlowRouter.path('housesDetails', id)}>Houses List</a>
                    </li>

                    <li className={A.isActiveRoute('housesSettings')}>
                        <a href={FlowRouter.path('housesSettings', id)}>Property Setting</a>
                    </li>
                </ul>
            </div>
        );
    }
});
