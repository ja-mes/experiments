'use strict';

C.HousesDetails = React.createClass({
    mixins: [ReactMeteorData],

    propTypes: {
        houseId: React.PropTypes.string.isRequired,
    },

    getMeteorData() {
        return {
            house: db.houses.findOne(this.props.houseId),
        }
    },

    render() {
        return (
            <div>
                <C.HousesDetailsHeader house={this.data.house}/>

                <div className="panel panel-default">
                    <div className="panel-heading">
                        <C.DateRange />
                    </div>

                    <div className="panel-body">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Type</th>
                                    <th>Amount</th>
                                    <th>Memo</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>

            </div>
        );
    },
});
